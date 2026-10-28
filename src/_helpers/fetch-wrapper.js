import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { authAtom } from "../_state";
import { useAlertActions } from "../_actions/alert.actions";

export { useFetchWrapper, clearFetchCache };

// Concurrency queue to prevent burst of parallel requests from exhausting backend MySQL connections
const MAX_CONCURRENT = 4;
let activeRequests = 0;
const requestQueue = [];

// In-flight deduplication & short-lived response cache for GET requests
const inFlightRequests = new Map();
const responseCache = new Map();
const CACHE_TTL_MS = 20000; // 20s TTL to prevent duplicate requests across components

function clearFetchCache() {
  responseCache.clear();
  inFlightRequests.clear();
}

function enqueueRequest(fn) {
  return new Promise((resolve, reject) => {
    const execute = () => {
      activeRequests++;
      fn()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          activeRequests--;
          if (requestQueue.length > 0) {
            const next = requestQueue.shift();
            next();
          }
        });
    };

    if (activeRequests < MAX_CONCURRENT) {
      execute();
    } else {
      requestQueue.push(execute);
    }
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function useFetchWrapper() {
  const router = useRouter();
  const [auth, setAuth] = useAtom(authAtom);
  const alertActions = useAlertActions();

  return {
    get: request("GET"),
    post: request("POST"),
    patch: request("PATCH"),
    put: request("PATCH"),
    delete: request("DELETE"),
  };

  function request(method) {
    return (url, body, file = false) => {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
      const cleanPath = String(url || "").replace(/^\/+/, "");
      const fullUrl = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;

      // In-flight deduplication & cache check for GET requests
      if (method === "GET") {
        const cached = responseCache.get(fullUrl);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
          return Promise.resolve(cached.data);
        }
        if (inFlightRequests.has(fullUrl)) {
          return inFlightRequests.get(fullUrl);
        }
      } else {
        // Mutations invalidate the read cache
        responseCache.clear();
      }

      const requestOptions = {
        method,
        headers: authHeader(fullUrl),
      };
      if (body && file === false) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      } else if (body) {
        requestOptions.body = body;
      }

      // Max 2 silent retries for transient 5xx / database connection drops on idempotent (GET) requests
      const maxRetries = method === "GET" ? 2 : 0;

      const executeFetch = async (retryCount = 0) => {
        try {
          const response = await fetch(fullUrl, requestOptions);
          const text = await response.text();
          let data = null;
          if (text) {
            try {
              data = JSON.parse(text);
            } catch {
              data = null;
            }
          }

          if (!response.ok) {
            const rawError =
              (data && (data.message || data.error || data.error_info || data.msg)) ||
              response.statusText ||
              (text && text.length < 200 ? text : `Request failed with status ${response.status}`);

            const isSqlError = typeof rawError === "string" && /SQLSTATE|SQL syntax|database/i.test(rawError);

            // If backend returned transient database connection error or 5xx, retry with short backoff
            if (retryCount < maxRetries && (response.status >= 500 || isSqlError)) {
              await delay(350 * (retryCount + 1));
              return executeFetch(retryCount + 1);
            }

            if ([401, 403].includes(response.status) && auth?.access_token) {
              clearFetchCache();
              localStorage.removeItem("user");
              setAuth(null);
              router.push(`/login`);
            }

            const userFacingError = isSqlError
              ? "Server temporarily unavailable. Please try again later."
              : rawError;

            if (![402, 404].includes(response.status)) {
              alertActions.error(userFacingError);
            }
            return Promise.reject(rawError);
          } else {
            if (data && [403].includes(data.statusCode) && data.status === "unauthorized") {
              clearFetchCache();
              localStorage.removeItem("user");
              setAuth(null);
              router.push(`/login`);
            }
            return data ?? text;
          }
        } catch (networkErr) {
          if (retryCount < maxRetries) {
            await delay(350 * (retryCount + 1));
            return executeFetch(retryCount + 1);
          }
          throw networkErr;
        }
      };

      if (method === "GET") {
        const promise = enqueueRequest(() => executeFetch(0))
          .then((result) => {
            responseCache.set(fullUrl, { data: result, timestamp: Date.now() });
            inFlightRequests.delete(fullUrl);
            return result;
          })
          .catch((err) => {
            inFlightRequests.delete(fullUrl);
            throw err;
          });

        inFlightRequests.set(fullUrl, promise);
        return promise;
      }

      return enqueueRequest(() => executeFetch(0));
    };
  }

  // helper functions
  function authHeader(url) {
    const token = auth?.access_token;
    const isLoggedIn = !!token;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const isApiUrl = apiUrl && url.startsWith(apiUrl);
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `${token}` };
    } else {
      return {};
    }
  }
}
