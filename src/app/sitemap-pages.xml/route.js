import { SITE_URL } from "@/lib/seo";
import { escapeXml, xmlResponse } from "@/lib/sitemap.server";

export const dynamic = "force-dynamic";

const PAGES = [
  ["/", "daily", "1.0"],
  ["/latest-news", "daily", "0.9"],
  ["/trending-news", "daily", "0.9"],
  ["/price-analysis", "daily", "0.9"],
  ["/price-prediction", "daily", "0.9"],
  ["/market-news", "daily", "0.9"],
  ["/stock-price-prediction", "weekly", "0.8"],
  ["/crypto-stock-price-prediction", "weekly", "0.8"],
  ["/research-report", "weekly", "0.8"],
  ["/press-release", "weekly", "0.8"],
  ["/crypto-regulation", "weekly", "0.8"],
  ["/finance", "weekly", "0.8"],
  ["/market", "weekly", "0.8"],
  ["/predict-market", "weekly", "0.8"],
  ["/learn-cypto", "weekly", "0.8"],
  ["/guides-analysis", "weekly", "0.8"],
  ["/news-promotions", "weekly", "0.8"],
  ["/academy", "weekly", "0.8"],
  ["/academy-about-crypto", "weekly", "0.8"],
  ["/master-course", "weekly", "0.8"],
  ["/community", "weekly", "0.7"],
  ["/contact", "monthly", "0.6"],
  ["/subscription", "monthly", "0.6"],
  ["/privacy-policy", "monthly", "0.3"],
  ["/terms-of-use", "monthly", "0.3"],
  ["/disclaimer", "monthly", "0.3"],
];

export async function GET() {
  const urls = PAGES.map(([path, changefreq, priority]) => `  <url>\n    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n");

  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
