import { BLOG_CONTENT_TYPES, blogPath, getBlogSlug, listFrom } from "./content";
import { SITE_URL } from "./seo";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://api.thecoinchain.com"
).replace(/\/$/, "");

const SITEMAP_REVALIDATE_SECONDS = 300;

function validDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Escapes text that is inserted into a sitemap XML element. */
export function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getContentTypePosts(type) {
  try {
    const response = await fetch(`${API_URL}/all-content-list/${type}`, {
      next: { revalidate: SITEMAP_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return [];
    return listFrom(await response.json());
  } catch (error) {
    console.warn(`[sitemap] Could not fetch ${type}:`, error.message);
    return [];
  }
}

/**
 * Gets every CMS post directly from the API and de-duplicates content that is
 * returned in more than one category endpoint.
 */
export async function getSitemapPosts() {
  const lists = await Promise.all(BLOG_CONTENT_TYPES.map(getContentTypePosts));
  const postsByPath = new Map();

  for (const [index, posts] of lists.entries()) {
    const fallbackType = BLOG_CONTENT_TYPES[index];
    for (const post of posts) {
      if (!getBlogSlug(post)) continue;

      const path = blogPath(post, fallbackType);
      const date = validDate(post.updated_at || post.created_at);
      const existing = postsByPath.get(path);

      // A post can occur in multiple API lists. Retain its most recent date.
      if (!existing || (date && (!existing.lastModified || date > existing.lastModified))) {
        postsByPath.set(path, {
          url: `${SITE_URL}${path}`,
          lastModified: date,
        });
      }
    }
  }

  return [...postsByPath.values()].sort((a, b) =>
    a.url.localeCompare(b.url)
  );
}

export function latestPostModified(posts) {
  return posts.reduce((latest, post) => {
    if (!post.lastModified) return latest;
    return !latest || post.lastModified > latest ? post.lastModified : latest;
  }, null);
}

export function xmlResponse(xml) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Browsers and crawlers always validate; upstream API data is cached for
      // five minutes above, so this stays fresh without repeated API requests.
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
