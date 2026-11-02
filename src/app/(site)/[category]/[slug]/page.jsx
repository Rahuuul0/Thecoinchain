import { notFound, permanentRedirect } from "next/navigation";
import { getBlogBySlug } from "@/lib/api.server";
import { getBlogSlug, getBlogTypeSlug } from "@/lib/content";
import { sanitizeArticleHtml } from "@/lib/sanitize.server";
import { blogJsonLd, blogMetadata } from "@/lib/seo";
import LatestNewsBlogDetail from "@/views/LatestNewsBlogDetail";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  return blog ? blogMetadata(blog) : { title: "Blog not found", robots: { index: false } };
}

export default async function CategoryBlogPage({ params }) {
  const { category, slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  // Canonical type/category and slug
  const canonicalSlug = getBlogSlug(blog);
  const canonicalType = getBlogTypeSlug(blog);

  if (
    (canonicalSlug && decodeURIComponent(slug) !== canonicalSlug) ||
    (canonicalType && decodeURIComponent(category) !== canonicalType)
  ) {
    permanentRedirect(`/${canonicalType}/${canonicalSlug}/`);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd(blog)).replace(/</g, "\\u003c") }}
      />
      <LatestNewsBlogDetail blog={blog} html={sanitizeArticleHtml(blog.description)} />
    </>
  );
}
