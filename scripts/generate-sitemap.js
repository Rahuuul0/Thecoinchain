const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.thecoinchain.com';
const API_BASE = 'https://api.thecoinchain.com';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/latest-news', priority: '0.9', changefreq: 'daily' },
  { path: '/trending-news', priority: '0.9', changefreq: 'daily' },
  { path: '/price-analysis', priority: '0.9', changefreq: 'daily' },
  { path: '/price-prediction', priority: '0.9', changefreq: 'daily' },
  { path: '/market-news', priority: '0.9', changefreq: 'daily' },
  { path: '/stock-price-prediction', priority: '0.8', changefreq: 'weekly' },
  { path: '/crypto-stock-price-prediction', priority: '0.8', changefreq: 'weekly' },
  { path: '/research-report', priority: '0.8', changefreq: 'weekly' },
  { path: '/press-release', priority: '0.8', changefreq: 'weekly' },
  { path: '/guest-post', priority: '0.8', changefreq: 'weekly' },
  { path: '/sponsored', priority: '0.8', changefreq: 'weekly' },
  { path: '/crypto-regulation', priority: '0.8', changefreq: 'weekly' },
  { path: '/finance', priority: '0.8', changefreq: 'weekly' },
  { path: '/policy', priority: '0.8', changefreq: 'weekly' },
  { path: '/tech', priority: '0.8', changefreq: 'weekly' },
  { path: '/information', priority: '0.8', changefreq: 'weekly' },
  { path: '/market', priority: '0.8', changefreq: 'weekly' },
  { path: '/predict-market', priority: '0.8', changefreq: 'weekly' },
  { path: '/learn-cypto', priority: '0.8', changefreq: 'weekly' },
  { path: '/guides-analysis', priority: '0.8', changefreq: 'weekly' },
  { path: '/news-promotions', priority: '0.8', changefreq: 'weekly' },
  { path: '/academy', priority: '0.8', changefreq: 'weekly' },
  { path: '/academy-about-crypto', priority: '0.8', changefreq: 'weekly' },
  { path: '/master-course', priority: '0.8', changefreq: 'weekly' },
  { path: '/community', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/subscription', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms-of-use', priority: '0.3', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'monthly' },
];

const CONTENT_TYPES = [
  'latest_news',
  'trending_news',
  'press_release',
  'price_prediction',
  'research_report',
  'guest_post',
  'market',
  'finance',
  'policy',
  'tech',
];

function slugify(text = '', isTitle = false) {
  if (!text) return '';
  const clean = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '');
  if (isTitle) {
    return clean.split(/\s+/).slice(0, 6).join('-');
  }
  return clean.replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
}

function getBlogSlug(item) {
  if (item?.slug && String(item.slug).trim()) {
    return slugify(String(item.slug), false);
  }
  return slugify(item?.title || '', true);
}

function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
    return d.toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

function formatIso(dateStr) {
  if (!dateStr) return new Date().toISOString();
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
}

async function fetchDynamicPosts() {
  const postsMap = new Map();
  for (const cType of CONTENT_TYPES) {
    try {
      const url = `${API_BASE}/all-content-list/${cType}`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const items = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
        ? data.data.data
        : [];

      for (const item of items) {
        const slug = getBlogSlug(item);
        if (slug && !postsMap.has(slug)) {
          postsMap.set(slug, {
            loc: `${DOMAIN}/blog/${slug}/`,
            lastmod: formatDate(item.updated_at || item.created_at),
            rawDate: item.updated_at || item.created_at,
            changefreq: 'weekly',
            priority: '0.8',
          });
        }
      }
    } catch (err) {
      console.warn(`[sitemap] Warning: could not fetch ${cType} from API:`, err.message);
    }
  }
  return Array.from(postsMap.values());
}

function generateUrlsetXml(entries) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const entry of entries) {
    xml += '  <url>\n';
    xml += `    <loc>${entry.loc}</loc>\n`;
    if (entry.lastmod) {
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    }
    if (entry.changefreq) {
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    }
    if (entry.priority) {
      xml += `    <priority>${entry.priority}</priority>\n`;
    }
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';
  return xml;
}

function generateIndexXml(sitemaps) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const sm of sitemaps) {
    xml += '  <sitemap>\n';
    xml += `    <loc>${sm.loc}</loc>\n`;
    if (sm.lastmod) {
      xml += `    <lastmod>${sm.lastmod}</lastmod>\n`;
    }
    xml += '  </sitemap>\n';
  }
  xml += '</sitemapindex>\n';
  return xml;
}

async function main() {
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const today = new Date().toISOString().split('T')[0];

  // 1. Build Static Pages XML entries
  const pagesEntries = STATIC_ROUTES.map((route) => ({
    loc: `${DOMAIN}${route.path}`,
    lastmod: today,
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  // 2. Fetch Dynamic Blog entries
  console.log('[sitemap] Fetching dynamic blog posts from production API...');
  let postsEntries = [];
  try {
    postsEntries = await fetchDynamicPosts();
    console.log(`[sitemap] Retrieved ${postsEntries.length} unique blog posts.`);
  } catch (err) {
    console.error('[sitemap] Error fetching posts:', err);
  }

  // If fetch failed or returned 0, try reading existing posts if available
  const existingPostsPath = path.join(publicDir, 'sitemap-posts.xml');
  if (postsEntries.length === 0 && fs.existsSync(existingPostsPath)) {
    console.log('[sitemap] Preserving existing sitemap-posts.xml as fallback.');
  } else {
    const postsXml = generateUrlsetXml(postsEntries);
    fs.writeFileSync(existingPostsPath, postsXml, 'utf-8');
    console.log(`[sitemap] Wrote ${existingPostsPath}`);
  }

  // 3. Write sitemap-pages.xml
  const pagesXml = generateUrlsetXml(pagesEntries);
  const pagesPath = path.join(publicDir, 'sitemap-pages.xml');
  fs.writeFileSync(pagesPath, pagesXml, 'utf-8');
  console.log(`[sitemap] Wrote ${pagesPath}`);

  // 4. Write combined sitemap.xml
  const combinedEntries = [...pagesEntries, ...postsEntries];
  const combinedXml = generateUrlsetXml(combinedEntries);
  const combinedPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(combinedPath, combinedXml, 'utf-8');
  console.log(`[sitemap] Wrote ${combinedPath}`);

  // 5. Write sitemap_index.xml
  let latestPostMod = today;
  if (postsEntries.length > 0) {
    const dates = postsEntries.map((p) => p.lastmod).filter(Boolean).sort();
    if (dates.length > 0) {
      latestPostMod = dates[dates.length - 1];
    }
  }

  const sitemaps = [
    { loc: `${DOMAIN}/sitemap-pages.xml`, lastmod: today },
    { loc: `${DOMAIN}/sitemap-posts.xml`, lastmod: latestPostMod },
  ];

  const indexXml = generateIndexXml(sitemaps);
  const indexPath = path.join(publicDir, 'sitemap_index.xml');
  fs.writeFileSync(indexPath, indexXml, 'utf-8');
  console.log(`[sitemap] Wrote ${indexPath}`);

  console.log('[sitemap] Sitemap generation completed successfully.');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[sitemap] Fatal error during sitemap generation:', err);
    process.exit(1);
  });
}

module.exports = { main };
