// Server-side data access for routes that render content on the server
// (metadata, article bodies). Client views keep using useFetchWrapper().

import { cache } from "react";
import { BLOG_CONTENT_TYPES, listFrom, slugify } from "./content";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const SLUG_INDEX_TTL = 5 * 60 * 1000;

async function apiGet(path, { revalidate = 300 } = {}) {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`[api] GET ${path} failed:`, err.message);
    return null;
  }
}

// The content lists embed full article HTML and are too large for Next's
// fetch cache, so keep a compact slug index in memory instead.
let slugIndex = { builtAt: 0, entries: null, pending: null };

async function buildSlugIndex() {
  const lists = await Promise.all(
    BLOG_CONTENT_TYPES.map(async (type) => {
      if (!API_URL) return [];
      try {
        const res = await fetch(`${API_URL}/all-content-list/${type}`, { cache: "no-store" });
        return res.ok ? listFrom(await res.json()) : [];
      } catch {
        return [];
      }
    })
  );
  const entries = lists.flat().map((item) => ({
    id: item.id,
    customSlug: item?.slug && String(item.slug).trim() ? slugify(String(item.slug), false) : "",
    titleSlug: slugify(item?.title || "", true),
  }));
  slugIndex = { builtAt: Date.now(), entries, pending: null };
  return entries;
}

async function getSlugIndex() {
  if (slugIndex.entries && Date.now() - slugIndex.builtAt < SLUG_INDEX_TTL) return slugIndex.entries;
  slugIndex.pending ??= buildSlugIndex().catch(() => {
    slugIndex.pending = null;
    return slugIndex.entries || [];
  });
  return slugIndex.pending;
}

/** Same matching rules the client used: exact or prefix match on either slug form. */
async function resolveBlogId(param) {
  const clean = decodeURIComponent(param).trim().replace(/\/$/, "");
  if (/^\d+$/.test(clean)) return clean;

  const target = slugify(clean, false);
  const targetTitle = slugify(clean, true);
  const prefixMatch = (a, b) => !!a && !!b && (a === b || a.startsWith(b) || b.startsWith(a));

  const entries = await getSlugIndex();
  const match = entries.find(
    ({ customSlug, titleSlug }) =>
      prefixMatch(customSlug, target) || prefixMatch(titleSlug, targetTitle) || prefixMatch(titleSlug, target)
  );
  return match?.id ?? null;
}

export const getBlogById = cache(async (id) => {
  const res = await apiGet(`content-detail/${id}`);
  return res?.data || null;
});

/** Resolves a /blog/:slug param (slug or numeric id) to the article. */
export const getBlogBySlug = cache(async (param) => {
  const id = await resolveBlogId(param);
  return id ? getBlogById(id) : null;
});
