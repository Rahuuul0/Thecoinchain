"use client";

import Link from "next/link";
import { RoutesName } from "@/_common/app.constants";
import SiteLogo from "./SiteLogo";

const IMG = "/assets/images/coinchain-img";

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

const SOCIALS = [
  { label: "Twitter", href: "https://x.com/", icon: TwitterIcon },
  { label: "Instagram", href: "https://instagram.com/", icon: InstagramIcon },
  { label: "Linkedin", href: "https://linkedin.com/", icon: LinkedinIcon },
];

const headingClass =
  "m-0 mb-3.5 text-[14px] sm:text-[15px] font-semibold tracking-wide text-[#111318] dark:text-white";
const linkClass =
  "text-[13px] sm:text-[14px] font-normal leading-relaxed text-[#667085] no-underline transition-colors duration-200 hover:text-[#B8860B] dark:text-white/60 dark:hover:text-[#F0D667]";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-100 bg-white transition-colors duration-300 dark:border-white/5 dark:bg-[#141416]">
      <div className="mx-auto container px-2 pt-10 pb-10 sm:px-2 sm:pt-14 sm:pb-12 md:px-0 lg:px-0 lg:pt-16 lg:pb-14">
        {/* Main responsive grid / flex container */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8 xl:gap-14">
          {/* Brand & contact info */}
          <div className="w-full shrink-0 lg:w-[280px] xl:w-[320px]">
            <SiteLogo className="h-[36px] w-[150px] shrink-0 sm:w-[170px]" />

            <ul className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
              <li className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 dark:border-white/10 dark:bg-white/5">
                  <img src={MailIcon} alt="mail" className="size-4 shrink-0" />
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="break-all text-[13.5px] font-normal text-[#111318] no-underline transition-colors hover:text-[#B8860B] sm:text-[14px] dark:text-white dark:hover:text-[#F0D667]"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 dark:border-white/10 dark:bg-white/5">
                  <img src={LocationIcon} alt="location" className="size-4 shrink-0" />
                </span>
                <address className="max-w-[300px] text-[13px] font-normal not-italic leading-[1.6] text-[#667085] sm:text-[14px] dark:text-white/70">
                  {ADDRESS}
                </address>
              </li>
            </ul>
          </div>

          {/* Navigation links & Social columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 md:grid-cols-5 md:gap-x-8 xl:gap-x-10">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col">
                <h4 className={headingClass}>{col.title}</h4>
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0 sm:gap-3">
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

            {/* Social Column: spans full width on mobile/tablet, single column on desktop */}
            <div className="col-span-2 flex flex-col sm:col-span-4 md:col-span-1">
              <h4 className={headingClass}>Follow us at</h4>
              <ul className="m-0 flex list-none flex-wrap gap-3 p-0 md:flex-col md:flex-nowrap md:gap-3.5">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group inline-flex items-center gap-3 rounded-lg border border-transparent p-1 transition-all duration-200 hover:bg-gray-50 md:p-0 md:hover:bg-transparent dark:hover:bg-white/5"
                    >
                      <img
                        src={s.icon}
                        alt=""
                        className="size-8 shrink-0 transition-transform duration-200 group-hover:scale-110 sm:size-9"
                      />
                      <span className={linkClass}>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-[#D0D5DD]/60 dark:border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-4 py-4 text-center sm:flex-row sm:px-6 sm:py-4 sm:text-left md:px-8 lg:px-10">
          <p className="m-0 text-[12px] font-normal text-[#667085] sm:text-[13px] dark:text-white/50">
            Copyright © {year} | thecoinchain. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-[#667085] sm:text-[13px] dark:text-white/50">
            <Link href={RoutesName.Privacy_Policy} className="transition-colors text-[#667085] hover:text-[#B8860B] dark:hover:text-[#F0D667]">
              Privacy Policy
            </Link>
            <span className="opacity-40">•</span>
            <Link href={RoutesName.Terms_of_Use} className="transition-colors text-[#667085] hover:text-[#B8860B] dark:hover:text-[#F0D667]">
              Terms of Use
            </Link>
            <span className="opacity-40">•</span>
            <Link href={RoutesName.Disclaimer} className="transition-colors text-[#667085] hover:text-[#B8860B] dark:hover:text-[#F0D667]">
              Disclaimers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}