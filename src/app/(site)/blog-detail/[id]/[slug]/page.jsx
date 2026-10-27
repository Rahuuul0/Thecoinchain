import { notFound, permanentRedirect } from "next/navigation";
import { getBlogById } from "@/lib/api.server";
import { blogPath } from "@/lib/content";

// Legacy /blog-detail/:id/:slug links → canonical /blog/:slug/
export default async function LegacyBlogDetail({ params }) {
  const { id } = await params;
  const blog = /^\d+$/.test(id) ? await getBlogById(id) : null;
  if (!blog) notFound();
  permanentRedirect(blogPath(blog));
}
