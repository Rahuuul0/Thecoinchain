"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const IMG = "/assets/images/coinchain-img";


const DEFAULT_ANALYSIS = [
  {
    id: 1,
    category: "Global",
    title: "Tesla Tests Key Trendline as Volatility Returns to EV Stocks",
    author: "Arnold R",
    time: "1 hour ago",
    image: `${IMG}/Analysis-1.png`,
    href: "/analysis/tesla-key-trendline",
  },
  {
    id: 2,
    category: "Altcoin",
    title: "Solana's Alpenglow Goes Live in Biggest Network Overhaul Since Launch",
    author: "Arnold R",
    time: "1 hour ago",
    image: `${IMG}/Analysis-2.png`,
    href: "/analysis/solana-alpenglow",
  },
  {
    id: 3,
    category: "Bitcoin",
    title: "Bitcoin Price Rebounds Above $82,000 After Brief Drop Below $80,000",
    author: "Arnold R",
    time: "1 hour ago",
    image: `${IMG}/Analysis-3.png`,
    href: "/analysis/bitcoin-rebounds-82000",
  },
  {
    id: 4,
    category: "Ethereum",
    title: "Qubic Freezes Network After Attacker Drains 1,404 Wallets Overnight",
    author: "Arnold R",
    time: "1 hour ago",
    image: `${IMG}/Analysis-4.png`,
    href: "/analysis/qubic-freezes-network",
  },
  {
    id: 5,
    category: "Altcoin",
    title: "Solana's Alpenglow Goes Live in Biggest Network Overhaul Since Launch",
    author: "Arnold R",
    time: "1 hour ago",
    image: `${IMG}/Analysis-2.png`,
    href: "/analysis/solana-alpenglow-live",
  },
  {
    id: 6,
    category: "Bitcoin",
    title: "Bitcoin Price Rebounds Above $82,000 After Brief Drop Below $80,000",
    author: "Arnold R",
    time: "1 hour ago",
    image: `${IMG}/Analysis-3.png`,
    href: "/analysis/bitcoin-price-rebound",
  },
  {
    id: 7,
    category: "Global",
    title: "Qubic Freezes Network After Attacker Drains 1,404 Wallets Overnight",
    author: "Arnold R",
    time: "1 hour ago",
    image: `${IMG}/Analysis-4.png`,
    href: "/analysis/qubic-wallet-drain",
  },
  {
    id: 8,
    category: "Ethereum",
    title: "Tesla Tests Key Trendline as Volatility Returns to EV Stocks",
    author: "Arnold R",
    time: "1 hour ago",
    image: `${IMG}/Analysis-1.png`,
    href: "/analysis/tesla-ev-volatility",
  },
];

const FILTERS = ["All", "Bitcoin", "Altcoin", "Ethereum", "Global"];

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


function AnalysisCard({ item }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col gap-3 rounded-lg border border-[#EAECF0] bg-white p-3 no-underline shadow-[0px_1px_2px_0px_#1018280D] transition-shadow hover:shadow-[0px_4px_14px_0px_#0000001A] dark:border-white/10 dark:bg-[#1c1c1f]"
    >
      <div className="aspect-video w-full overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex items-center gap-2 px-0.5 font-[Inter] text-[11px] font-normal text-[#98A2B3] dark:text-white/50 mt-1">
        <span>{item.time}</span>
        <span className="h-3 w-px bg-[#98A2B3]/50" />
        <span>By {item.author}</span>
      </div>

      <h3 className="m-0 line-clamp-2 px-0.5 font-[Manrope] text-[16px] font-medium leading-[1.5] text-[#111318] dark:text-white">
        {item.title}
      </h3>

      <span className="mt-auto inline-flex items-center gap-1 px-0.5 font-[Manrope] text-[12px] font-medium bg-[linear-gradient(180deg,#BC7400_0%,#C5984F_100%)] bg-clip-text text-transparent transition-all group-hover:gap-1.5">
        Read Analysis
        <ArrowRight className="size-3" />
      </span>
    </Link>
  );
}

export default function AnalysisSection({ items = DEFAULT_ANALYSIS, viewAllHref = "/analysis" }) {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((n) => n.category === filter)),
    [items, filter]
  );

  return (
    <section className="bg-[#F8F9FB] py-[35px] transition-colors sm:py-[40px] lg:py-[50px] dark:bg-[#141416]">
      <div className="container mx-auto px-3 md:px-0">
        {/* ---------- Heading ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="min-w-0 flex-1">
            <h2 className="m-0 font-[Manrope] text-[26px] font-extrabold leading-tight text-[#111318] sm:text-[32px] dark:text-white">
              Analysis
            </h2>
            <p className="mb-0 mt-3 max-w-[640px] font-[Inter] text-[14px] font-normal leading-normal text-[#667085] sm:text-[16px] dark:text-white/60">
              Technical analysis, market outlooks and key price levels for trending stocks.
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

        {/* ---------- Filters ---------- */}
        <div className="-mx-4 mt-9 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 flex-wrap sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((name) => {
            const isActive = filter === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                className={`shrink-0 whitespace-nowrap rounded-md border px-4 py-1.5 font-[Inter] text-[14px] font-medium transition-colors ${
                  isActive
                    ? "border-[#C9A13B] bg-[#FFFBF0] text-[#B8860B] dark:bg-[#C9A13B]/10"
                    : "border-[#E4E7EC] bg-white text-[#667085] hover:border-[#C9A13B] hover:text-[#B8860B] dark:border-white/15 dark:bg-transparent dark:text-white/70"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* ---------- Cards: 1 / 2 / 4 columns ---------- */}
        <div className="mt-6 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item) => (
            <AnalysisCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}