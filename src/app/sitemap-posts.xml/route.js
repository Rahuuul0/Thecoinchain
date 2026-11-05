import { escapeXml, getSitemapPosts, xmlResponse } from "@/lib/sitemap.server";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getSitemapPosts();
  const urls = posts
    .map(({ url, lastModified }) => `  <url>\n    <loc>${escapeXml(url)}</loc>${lastModified ? `\n    <lastmod>${lastModified.toISOString()}</lastmod>` : ""}\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
    .join("\n");

  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
