import { SITE_URL } from "@/lib/seo";
import { escapeXml, getSitemapPosts, latestPostModified, xmlResponse } from "@/lib/sitemap.server";

export const dynamic = "force-dynamic";

export async function GET() {
  const latestPostDate = latestPostModified(await getSitemapPosts());
  const postsLastmod = latestPostDate
    ? `\n    <lastmod>${latestPostDate.toISOString()}</lastmod>`
    : "";

  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${escapeXml(`${SITE_URL}/sitemap-pages.xml`)}</loc>\n  </sitemap>\n  <sitemap>\n    <loc>${escapeXml(`${SITE_URL}/sitemap-posts.xml`)}</loc>${postsLastmod}\n  </sitemap>\n</sitemapindex>\n`);
}
