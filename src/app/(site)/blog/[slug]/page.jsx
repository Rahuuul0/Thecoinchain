import { notFound, permanentRedirect } from "next/navigation";
import { getBlogBySlug } from "@/lib/api.server";
import { blogPath } from "@/lib/content";

export default async function LegacyBlogPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  // Redirect legacy /blog/:slug/ to canonical /:type/:slug/
  permanentRedirect(blogPath(blog));
}
