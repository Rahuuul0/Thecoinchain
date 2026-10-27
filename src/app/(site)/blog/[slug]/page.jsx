import { notFound, permanentRedirect } from "next/navigation";
import { getBlogBySlug } from "@/lib/api.server";
import { getBlogSlug } from "@/lib/content";
import { sanitizeArticleHtml } from "@/lib/sanitize.server";
import { blogJsonLd, blogMetadata } from "@/lib/seo";
import LatestNewsBlogDetail from "@/views/LatestNewsBlogDetail";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  return blog ? blogMetadata(blog) : { title: "Blog not found", robots: { index: false } };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  // Old/partial slugs resolve too; send them to the canonical URL.
  const canonicalSlug = getBlogSlug(blog);
  if (canonicalSlug && decodeURIComponent(slug) !== canonicalSlug) {
    permanentRedirect(`/blog/${canonicalSlug}/`);
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
