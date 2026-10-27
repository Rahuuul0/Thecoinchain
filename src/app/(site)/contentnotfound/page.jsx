import ContentNotFound from "@/views/ContentNotFound";

export const metadata = {
  title: "Content Not Found",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ContentNotFound />;
}
