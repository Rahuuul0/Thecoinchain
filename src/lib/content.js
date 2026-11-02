import { RoutesName } from "@/_common/app.constants";
import { NEWS_CATEGORIES } from "./newsCategories";

// Content helpers shared by server routes and client views.

export const IMAGE_URL = (process.env.NEXT_PUBLIC_IMAGE_URL || "").replace(/\/$/, "");

// Content types searched when resolving a blog slug to an id.
export const BLOG_CONTENT_TYPES = [
  "latest_news",
  "trending_news",
  "press_release",
  "crypto_regulation",
  "price_prediction",
  "stock_price_prediction",
  "market",
  "finance",
  "bitcoin",
  "ethereum",
  "altcoin",
  "global_news",
  "memecoin_analysis",
  "ethereum_analysis",
  "bitcoin_analysis",
  "explain",
  "research_report",
  // "guest_post",
  // "policy",
  // "tech",
];

/**
 * Slug used in URLs. Titles are truncated to their first six words;
 * CMS-provided slugs are used whole.
 */
export function slugify(text = "", isTitle = false) {
  if (!text) return "";
  const clean = String(text).toLowerCase().trim().replace(/[^\w\s-]/g, "");
  if (isTitle) return clean.split(/\s+/).slice(0, 6).join("-");
  return clean.replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}

export function getBlogSlug(item) {
  if (item?.slug && String(item.slug).trim()) return slugify(String(item.slug), false);
  return slugify(item?.title || "", true);
}

export function getBlogTypeSlug(item, defaultType = "") {
  const raw = item?.type || item?.category || defaultType || "";
  if (!raw) return "latest-news";
  const clean = String(raw).toLowerCase().trim();

  // If already a recognized category slug (e.g. latest-news, market-news)
  if (NEWS_CATEGORIES[clean]) return clean;

  // If matches a category's backend type (e.g. latest_news -> latest-news, market -> market-news)
  const entry = Object.entries(NEWS_CATEGORIES).find(
    ([slug, conf]) => conf.type && conf.type.toLowerCase() === clean
  );
  if (entry) return entry[0];

  return clean.replace(/[\s_]+/g, "-");
}

export function blogPath(item, defaultType = "") {
  const type = getBlogTypeSlug(item, defaultType);
  const slug = getBlogSlug(item);
  return (RoutesName.Blog_Detail || "/:type/:slug/")
    .replace(":type", type)
    .replace(":slug", slug);
}

/** Remembers slug → id so the detail page can skip the slug lookup. */
export function rememberBlogId(slug, id) {
  if (id === undefined || id === null || typeof window === "undefined") return;
  sessionStorage.setItem(`blog_id_${slug}`, String(id));
  localStorage.setItem(`blog_id_${slug}`, String(id));
}

/** Absolute URL for a CMS media path (leaves absolute/data/blob URLs alone). */
export function getMediaUrl(mediaPath) {
  if (!mediaPath) return "";
  const path = String(mediaPath).trim();
  if (/^(?:https?:|data:|blob:)/i.test(path) || path.startsWith("//")) return path;
  if (!IMAGE_URL) return path;
  return `${IMAGE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Image for list items that have either an uploaded `image` or an `image_link`. */
export function itemImage(item) {
  return item?.image ? `${IMAGE_URL}/${item.image}` : item?.image_link;
}

export function getYouTubeVideoId(url) {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const fromParam = new URLSearchParams(url.split("?")[1] || "").get("v");
  if (fromParam) return fromParam;
  const pathMatch = url.match(/(?:\/|%3D|v=|youtu\.be\/|embed\/|shorts\/|v\/|watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (pathMatch?.[1]) return pathMatch[1];
  const fallback = url.match(/([a-zA-Z0-9_-]{11})/);
  return fallback?.[1] || url;
}

/** Strips HTML tags for meta descriptions and excerpts. */
export function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Top-10 coins by rank, shaped for <CryptoTickerMarquee />. */
export function toTickerData(coins = []) {
  return [...coins]
    .filter((coin) => coin?.id)
    .sort((a, b) => (Number(a.cmc_rank) || 999) - (Number(b.cmc_rank) || 999))
    .slice(0, 10)
    .map((coin) => {
      const change = coin.percent_change_24h ?? 0;
      return {
        id: coin.id,
        image: coin.image,
        symbol: coin.symbol?.toUpperCase(),
        price: `$${Number(coin.price || 0).toLocaleString("en-US", { maximumFractionDigits: 6 })}`,
        change: `${Math.abs(change).toFixed(2)}%`,
        direction: change >= 0 ? "up" : "down",
      };
    });
}

/** Extracts an array from the API's inconsistent list envelopes. */
export function listFrom(res) {
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res)) return res;
  return [];
}
