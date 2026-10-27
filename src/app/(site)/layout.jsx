import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

export default function SiteLayout({ children }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
