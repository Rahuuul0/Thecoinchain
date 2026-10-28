import { blogPath, getMediaUrl, stripHtml } from "./content";

export const SITE_URL = "https://www.thecoinchain.com";
export const SITE_NAME = "The Coin Chain";

function blogDescription(blog) {
  return blog?.meta_description || stripHtml(blog?.description).slice(0, 159) || SITE_NAME;
}

/** Metadata for a CMS article. */
export function blogMetadata(blog) {
  const title = blog.meta_title || blog.title || SITE_NAME;
  const description = blogDescription(blog);
  const url = blogPath(blog);
  const image = getMediaUrl(blog.get_media_display);

  return {
    // Article titles are already complete; skip the "| The Coin Chain" template.
    title: { absolute: title },
    description,
    keywords: blog.meta_keywords || undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: SITE_NAME,
      publishedTime: blog.created_at || undefined,
      authors: blog.profile?.profile_name ? [blog.profile.profile_name] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/** schema.org NewsArticle for rich results. */
export function blogJsonLd(blog) {
  const image = getMediaUrl(blog.get_media_display);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: (blog.meta_title || blog.title || "").slice(0, 110),
    description: blogDescription(blog),
    image: image ? [image] : undefined,
    datePublished: blog.created_at || undefined,
    dateModified: blog.updated_at || blog.created_at || undefined,
    mainEntityOfPage: `${SITE_URL}${blogPath(blog)}`,
    author: blog.profile?.profile_name ? { "@type": "Person", name: blog.profile.profile_name } : { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}
