import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RoutesName } from "@/_common/app.constants";
import { Container } from "@/components/ui";

export default function BlogNotFound() {
  return (
    <Container maxWidth="md" className="py-32 text-center">
      <h4 className="mb-4 font-bold">Blog not found</h4>
      <p className="mb-6 text-[#4B5563]!">The news article you are trying to open is not available.</p>
      <Link
        href={RoutesName.Latest_News}
        aria-label="Back to latest news"
        className="inline-flex rounded-full border border-gray-300 px-4 py-2 text-fg!"
      >
        <ArrowLeft className="size-6" />
      </Link>
    </Container>
  );
}
