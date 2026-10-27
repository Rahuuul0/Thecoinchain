import Contact from "@/views/Contact";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with The Coin Chain team.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <Contact />;
}
