/**
 * ============================================================
 * Shared CoinGecko API Utility with Automatic Key Rotation
 * ============================================================
 *
 * Automatically rotates demo API keys when receiving:
 * - 401: Unauthorized (Invalid / expired key)
 * - 403: Forbidden (Unauthorized endpoint / blocked key)
 * - 429: Rate limit exceeded (Quota exhausted)
 *
 * Retries up to the total number of configured keys before failing.
 * Non-auth HTTP errors (e.g. 404, 500) and network disconnects
 * do NOT trigger key rotation.
 */

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Read API keys from environment configuration
 */
const loadApiKeys = () => {
  const envKeys = [
    process.env.NEXT_PUBLIC_COINGECKO_API_KEY_1,
    process.env.NEXT_PUBLIC_COINGECKO_API_KEY_2,
    process.env.NEXT_PUBLIC_COINGECKO_API_KEY_3,
    process.env.NEXT_PUBLIC_COINGECKO_API_KEY_4,
    process.env.NEXT_PUBLIC_COINGECKO_API_KEYS,
  ]
    .flatMap((val) => (val ? val.split(",") : []))
    .map((k) => k?.trim())
    .filter(Boolean);

  // Remove duplicates if any
  return Array.from(new Set(envKeys));
};

const COINGECKO_API_KEYS = loadApiKeys();

// Shared module-level state for rotation across all components
let currentApiKeyIndex = 0;

/**
 * Get currently active API key
 */
export const getCurrentApiKey = () => {
  if (COINGECKO_API_KEYS.length === 0) return "";
  return COINGECKO_API_KEYS[currentApiKeyIndex];
};

/**
 * Rotate to the next available API key in the list
 */
export const rotateApiKey = () => {
  if (COINGECKO_API_KEYS.length === 0) return "";
  currentApiKeyIndex = (currentApiKeyIndex + 1) % COINGECKO_API_KEYS.length;
  console.warn(
    `CoinGecko API key rotated. Using key #${currentApiKeyIndex + 1} of ${COINGECKO_API_KEYS.length}`
  );
  return getCurrentApiKey();
};

/**
 * Utility helper to get current key index (0-indexed)
 */
export const getCurrentApiKeyIndex = () => currentApiKeyIndex;

/**
 * Utility helper to get total count of configured keys
 */
export const getApiKeyCount = () => COINGECKO_API_KEYS.length;

/**
 * Utility helper to reset rotation index (primarily for tests)
 */
export const resetApiKeyRotation = () => {
  currentApiKeyIndex = 0;
};

/**
 * Construct full CoinGecko URL with the given API key
 */
const buildRequestUrl = (endpoint, apiKey) => {
  // Strip any preexisting x_cg_demo_api_key query param to avoid collision
  const cleanEndpoint = endpoint
    .replace(/([?&])x_cg_demo_api_key=[^&]*(&|$)/g, "$1")
    .replace(/[?&]$/, "");

  const fullUrl = cleanEndpoint.startsWith("http")
    ? cleanEndpoint
    : `${COINGECKO_BASE_URL}${cleanEndpoint.startsWith("/") ? "" : "/"}${cleanEndpoint}`;

  if (!apiKey) return fullUrl;

  const separator = fullUrl.includes("?") ? "&" : "?";
  return `${fullUrl}${separator}x_cg_demo_api_key=${apiKey}`;
};

/**
 * Fetch data from CoinGecko with automatic key rotation on 401, 403, and 429 errors.
 *
 * @param {string} endpoint - Relative path (e.g. "/coins/markets?vs_currency=usd") or full URL
 * @param {RequestInit} [options={}] - Standard fetch options
 * @returns {Promise<Response>} - Fetch Response object
 */
export const fetchCoinGecko = async (endpoint, options = {}) => {
  const totalKeys = COINGECKO_API_KEYS.length;

  // If no keys configured, attempt once without demo key
  if (totalKeys === 0) {
    const requestUrl = buildRequestUrl(endpoint, "");
    const response = await fetch(requestUrl, options);
    if (response.ok) return response;
    throw new Error(`CoinGecko request failed (${response.status})`);
  }

  let attempts = 0;

  while (attempts < totalKeys) {
    const apiKey = getCurrentApiKey();
    const requestUrl = buildRequestUrl(endpoint, apiKey);

    try {
      const response = await fetch(requestUrl, options);

      // Successful response
      if (response.ok) {
        return response;
      }

      // API key / rate-limit / quota related errors: rotate and retry
      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 429
      ) {
        console.warn(
          `CoinGecko API key #${currentApiKeyIndex + 1} failed with status ${response.status}`
        );

        rotateApiKey();
        attempts++;
        continue;
      }

      // Other HTTP errors (400, 404, 500, etc.) - do not rotate key
      throw new Error(`CoinGecko request failed (${response.status})`);
    } catch (error) {
      // Re-throw HTTP errors without rotating keys
      if (error?.message?.includes("CoinGecko request failed")) {
        throw error;
      }

      // Normal network errors (offline, DNS, timeout) - do not rotate key
      console.warn("CoinGecko network error:", error);
      throw error;
    }
  }

  throw new Error("All CoinGecko API keys are unavailable");
};

export default fetchCoinGecko;
