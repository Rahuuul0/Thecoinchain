// Existing .env files use CRA-style REACT_APP_* names. Accept them as a
// fallback so deployments keep working while they move to NEXT_PUBLIC_*.
const PUBLIC_ENV = [
  "API_URL",
  "IMAGE_URL",
  "GOOGLE_AUTH_CLIENT_ID",
  "reCAPTCHA_SITE_KEY",
  "COINGECKO_API_KEY_1",
  "COINGECKO_API_KEY_2",
  "COINGECKO_API_KEY_3",
  "COINGECKO_API_KEY_4",
  "COINGECKO_API_KEYS",
];

const env = Object.fromEntries(
  PUBLIC_ENV.map((name) => [
    `NEXT_PUBLIC_${name}`,
    process.env[`NEXT_PUBLIC_${name}`] ?? process.env[`REACT_APP_${name}`] ?? "",
  ])
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env,
  // Self-contained server bundle in .next/standalone (see deploy workflow).
  output: "standalone",
  // Blog URLs are indexed with a trailing slash (/blog/:slug/) while other
  // pages aren't; serve both forms as-is instead of redirecting.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      // Blog sitemap is generated live by the backend.
      { source: "/sitemap-posts.xml", destination: "https://api.thecoinchain.com/sitemap.xml" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:file(sitemap.*\\.xml|sitemap_index\\.xml)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
