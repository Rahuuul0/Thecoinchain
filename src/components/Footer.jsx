"use client";

import Link from "next/link";
import { RoutesName } from "@/_common/app.constants";
import SiteLogo from "./SiteLogo";

const IMG = "/assets/images/coinchain-img";

// SVG icons (public/assets/images/coinchain-img) — file names/extension check kar lena
const MailIcon = `${IMG}/Mailicon.svg`;
const LocationIcon = `${IMG}/Locationicon.svg`;
const TwitterIcon = `${IMG}/Twittericon.svg`;
const InstagramIcon = `${IMG}/Instagramicon.svg`;
const LinkedinIcon = `${IMG}/Linkedinicon.svg`;

const CONTACT_EMAIL = "contact@thecoinchain.com";
const ADDRESS = "Dubai Digital Park - Nadd Hessa - Dubai Silicon Oasis - Dubai - United Arab Emirates";

const FOOTER_COLUMNS = [
  {
    title: "News",
    links: [
      { label: "Latest News", href: RoutesName.Latest_News },
      { label: "Bitcoin", href: RoutesName.Bitcoin },
      { label: "Ethereum", href: RoutesName.Ethereum },
      { label: "Altcoin", href: RoutesName.Altcoin },
      { label: "Global News", href: RoutesName.Global_News },
    ],
  },
  {
    title: "Analysis",
    links: [
      { label: "Price Analysis", href: RoutesName.Price_Prediction },
      { label: "Stock Price Analysis", href: RoutesName.Crypto_Stock_Price_Prediction },
      { label: "Bitcoin Analysis", href: RoutesName.Bitcoin_Analysis },
      { label: "Ethereum Analysis", href: RoutesName.Ethereum_Analysis },
      { label: "Memecoin Analysis", href: RoutesName.Memecoin_Analysis },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Explain", href: RoutesName.Explain },
      { label: "Finance", href: RoutesName.Finance },
      { label: "Press Release", href: RoutesName.Press_Release },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact US", href: RoutesName.Contact_Us },
      { label: "Privacy Policy", href: RoutesName.Privacy_Policy },
      { label: "Terms Of Use", href: RoutesName.Terms_of_Use },
      { label: "Disclaimers", href: RoutesName.Disclaimer },
    ],
  },
];

// ⚠️ Apne asli social links lagao
const SOCIALS = [
  { label: "Twitter", href: "https://x.com/", icon: TwitterIcon },
  { label: "Instagram", href: "https://instagram.com/", icon: InstagramIcon },
  { label: "Linkedin", href: "https://linkedin.com/", icon: LinkedinIcon },
];

const headingClass = "m-0 mb-4 font-[Inter] text-[16px] font-semibold leading-tight text-[#111318] dark:text-white";
const linkClass =
  "font-[Inter] text-[14px] font-normal leading-snug text-[#667085] no-underline transition-colors hover:text-[#B8860B] dark:text-white/60 dark:hover:text-[#F0D667]";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white transition-colors dark:bg-[#141416] px-3 md:px-0">
      <div className="mx-auto container">
        <div className="flex flex-col gap-y-9 xl:flex-row xl:justify-between">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <SiteLogo className="w-[150px] shrink-0 lg:w-[170px]" />

          <ul className="m-0 mt-7 flex list-none flex-col gap-4 p-0">
            <li className="flex items-center gap-3">
              <img src={MailIcon} alt="mail" className="size-[20px] shrink-0" />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-[Inter] text-[14px] font-normal text-[#111318] no-underline hover:text-[#B8860B] dark:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <img src={LocationIcon} alt="location" className="mt-0.5 size-[20px] shrink-0" />
              <address className="max-w-[270px] font-[Inter] text-[14px] font-normal not-italic leading-[1.55] text-[#111318] dark:text-white">
                {ADDRESS}
              </address>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 xl:grid-cols-5 xl:gap-x-[60px]">
          {/* ---------- Brand + contact ---------- */}

          {/* ---------- Link columns ---------- */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className={headingClass}>{col.title}</h4>
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ---------- Social ---------- */}
          <div>
            <h4 className={headingClass}>Follow us at</h4>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex items-center gap-3 no-underline"
                  >
                    <img src={s.icon} alt="" className="size-9 shrink-0 transition-transform group-hover:scale-110" />
                    <span className={linkClass}>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </div>

      {/* ---------- Copyright bar ---------- */}
      <div className="border-t border-[#D0D5DD] dark:border-white/10">
        <p className="m-0 px-4 py-3 text-center font-[Inter] text-[11px] font-normal text-[#667085] sm:text-[12px] dark:text-white/50">
          Copyright © {year} | thecoinchain All rights reserved
        </p>
      </div>
    </footer>
  );
}