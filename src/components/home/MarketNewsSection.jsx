"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

const IMG = "/assets/images/coinchain-img";

const DEFAULT_MARKET = [
  {
    id: 1,
    category: "AI",
    tag: "Tether",
    title: "Tesla Begins Optimus Robot Production in Fremont as Musk Targets 20,000 Units a Week",
    author: "Arnold R",
    time: "30 mins ago",
    image: `${IMG}/Market-3.png`,
    href: "/market/tesla-optimus-production",
  },
  {
    id: 2,
    category: "AI",
    tag: "Tether",
    title: "Tesla Begins Optimus Robot Production in Fremont as Musk Targets 20,000 Units a Week",
    author: "Arnold R",
    time: "30 mins ago",
    image: `${IMG}/Market-1.png`,
    href: "/market/meta-ai-data-centers",
  },
  {
    id: 3,
    category: "Blockchain",
    tag: "Tether",
    title: "Tesla Begins Optimus Robot Production in Fremont as Musk Targets 20,000 Units a Week",
    author: "Arnold R",
    time: "30 mins ago",
    image: `${IMG}/Market-2.png`,
    href: "/market/bitcoin-etf-flows",
  },
  {
    id: 4,
    category: "Crypto Regulation",
    tag: "Tether",
    title: "Tesla Begins Optimus Robot Production in Fremont as Musk Targets 20,000 Units a Week",
    author: "Arnold R",
    time: "30 mins ago",
    image: `${IMG}/Market-2.png`,
    href: "/market/regulation-update",
  },
];

// Tag chip colors (same as other sections)
const TAG_STYLES = {
  Tether: { bg: "#DFFFF2", color: "#16A66A", border: "#BFF4DE" },
  Solana: { bg: "#FFDDDE", color: "#E5484D", border: "#FFC4C6" },
  XRP: { bg: "#E9E9E9", color: "#353942", border: "#DADADA" },
  Bitcoin: { bg: "#FFF6D9", color: "#F7931A", border: "#FFE8A2" },
  Ethereum: { bg: "#D9E1FF", color: "#3A57C9", border: "#9FB3FF" },
};
const DEFAULT_TAG = { bg: "#F3F4F6", color: "#353942", border: "#E5E7EB" };

function Tag({ label }) {
  const s = TAG_STYLES[label] || DEFAULT_TAG;
  return (
    <span
      className="inline-flex items-center rounded border px-2 py-0.5 font-[Manrope] text-[12px] font-medium leading-4"
      style={{ backgroundColor: s.bg, color: s.color, borderColor: s.border }}
    >
      {label}
    </span>
  );
}

function Meta({ item }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-[Manrope] text-[14px] font-medium text-[#667085] dark:text-white/70">
      <Tag label={item.tag} />
      <span className="h-4 w-px bg-[#353942]/25 dark:bg-white/20" />
     <span className="inline-block max-w-[10ch] truncate whitespace-nowrap" title={item.author}>By {item.author}</span>
      <span className="h-4 w-px bg-[#353942]/25 dark:bg-white/20" />
      <span>{item.time}</span>
    </div>
  );
}

/** Horizontal card: text left, image right (stacks on small screens) */
function SideCard({ item }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col-reverse overflow-hidden rounded-lg bg-[#F7F8FA] no-underline transition-shadow hover:shadow-[0px_4px_14px_0px_#0000001A] min-[480px]:min-h-[212px] min-[480px]:flex-row dark:bg-[#1c1c1f]"
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 p-4">
        <Meta item={item} />
        <h3 className="m-0 line-clamp-3 font-[Manrope] text-[16px] font-semibold leading-snug text-[#111318] transition-colors group-hover:text-[#B8860B] sm:text-[20px] dark:text-white">
          {item.title}
        </h3>
      </div>

      <div className="relative aspect-video w-full shrink-0 overflow-hidden min-[480px]:aspect-auto min-[480px]:w-[45%] rounded-lg">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    </Link>
  );
}

/** Big card: image top, text below */
function FeaturedCard({ item }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-[#F7F8FA] no-underline transition-shadow hover:shadow-[0px_4px_14px_0px_#0000001A] dark:bg-[#1c1c1f]"
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden sm:h-[280px] md:h-[350px] lg:h-[400px] rounded-lg">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col gap-3 p-6">
        <Meta item={item} />
        <h3 className="m-0 font-[Manrope] text-[18px] font-semibold leading-snug text-[#111318] transition-colors group-hover:text-[#B8860B] sm:text-[20px] dark:text-white">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

export default function MarketSection({ news = DEFAULT_MARKET, viewAllHref = "/market" }) {
  const featured = news[0];
  const sideItems = news.slice(1, 3);

  return (
    <section className="bg-white py-[35px] transition-colors sm:py-[40px] lg:py-[50px] dark:bg-[#141416]">
      <div className="mx-auto container px-3 md:px-0">
        {/* ---------- Heading ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="min-w-0 flex-1">
            <h2 className="m-0 font-[Manrope] text-[26px] font-extrabold leading-tight text-[#111318] sm:text-[32px] dark:text-white">
              Market
            </h2>
            <p className="mb-0 mt-3 max-w-[640px] font-[Inter] text-[14px] font-normal leading-normal text-[#667085] sm:text-[16px] dark:text-white/60">
              Breaking stories and developments from across the cryptocurrency ecosystem.
            </p>
          </div>

          <Link
            href={viewAllHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[linear-gradient(270deg,#D7AE42_0%,#F0D667_33%,#F0D667_65.7%,#D7AE42_100%)] px-4 py-2.5 font-[Manrope] text-[14px] font-semibold text-[#111318] no-underline transition-opacity hover:opacity-90 border border-transparent hover:border-[#010101] dark:hover:border-white"
          >
            View All
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* ---------- Content ---------- */}
        {featured ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Mobile: big card first. Desktop: small cards left, big card right */}
            <div className="order-2 grid gap-10 lg:order-1 lg:grid-rows-2">
              {sideItems.map((item) => (
                <SideCard key={item.id} item={item} />
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <FeaturedCard item={featured} />
            </div>
          </div>
        ) : (
          <p className="mt-10 text-center font-[Inter] text-[14px] text-[#667085]">No news found.</p>
        )}
      </div>
    </section>
  );
}