import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { authAtom } from "../_state";
import { useAlertActions } from "../_actions/alert.actions";

export { useFetchWrapper };

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
      const requestOptions = {
        method,
        headers: authHeader(fullUrl),
      };
      if (body && file == false) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      } else {
        requestOptions.body = body;
      }
      return fetch(fullUrl, requestOptions).then(handleResponse);
    };
  }

  // helper functions
  function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
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

  function handleResponse(response) {
    return response.text().then((text) => {
      let data = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          // Response is not JSON (e.g. HTML 404/500 error page from server)
          data = null;
        }
      }

      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth?.access_token) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          localStorage.removeItem("user");
          setAuth(null);
          router.push(`/login`);
        }

        const rawError =
          (data && (data.message || data.error || data.error_info || data.msg)) ||
          response.statusText ||
          (text && text.length < 200 ? text : `Request failed with status ${response.status}`);

        // Sanitize database internal errors for user-facing snackbars
        const isSqlError = typeof rawError === "string" && /SQLSTATE|SQL syntax|database/i.test(rawError);
        const userFacingError = isSqlError
          ? "Server temporarily unavailable. Please try again later."
          : rawError;

        if (![402, 404].includes(response.status)) {
          alertActions.error(userFacingError);
        }
        return Promise.reject(rawError);
      } else {
        if (data && [403].includes(data.statusCode) && data.status === "unauthorized") {
          localStorage.removeItem("user");
          setAuth(null);
          router.push(`/login`);
        }
      }
      return data ?? text;
    });
  }
}
