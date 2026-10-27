import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import PageNotFound from "@/views/PageNotFound";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageNotFound />
      </main>
      <Footer />
    </>
  );
}
