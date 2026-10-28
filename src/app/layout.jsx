import { DM_Sans, Inter, Poppins } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/lib/seo";
import Providers from "./providers";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-poppins" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const GTM_ID = "GTM-563D2Z64";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Coin Chain | Latest Crypto News, Bitcoin & Market Analysis",
    template: "%s | The Coin Chain",
  },
  description:
    "Stay updated with the latest cryptocurrency news, Bitcoin and Ethereum updates, crypto market analysis, price predictions, blockchain technology and regulation.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico", apple: "/logo192.png" },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "The Coin Chain",
    title: "The Coin Chain | Latest Crypto News & Market Analysis",
    description: "Get the latest crypto news, Bitcoin updates, market analysis, price predictions and blockchain insights on The Coin Chain.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Coin Chain | Latest Crypto News",
    description: "Latest cryptocurrency news, Bitcoin updates, market analysis and blockchain insights.",
  },
};

export const viewport = {
  themeColor: "#000000",
};

// Applies the saved theme before first paint so dark mode doesn't flash.
const themeScript = `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
