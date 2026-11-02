"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const IMG = "/assets/images/coinchain-img";

// ⚠️ Image file names apne folder ke hisaab se badal lena
const DEFAULT_NEWS = [
  {
    id: 1,
    category: "Bitcoin",
    tag: "Tether",
    title: "Crypto Market Reclaims $3 Trillion as Institutional Demand Broadens",
    excerpt:
      "Bitcoin leads a market-wide advance while Ethereum and major altcoins attract fresh institutional capital.",
    author: "Arnold R",
    time: "30 mins ago",
    image: `${IMG}/trendingNew.png`,
    href: "/blog/crypto-market-reclaims-3-trillion",
  },
  {
    id: 2,
    category: "Altcoin",
    tag: "Solana",
    title: "Crypto Market Reclaims $3 Trillion as Institutional Demand Broadens",
    excerpt: "Solana's network upgrade pulls fresh capital into the wider altcoin market.",
    author: "Arnold R",
    time: "30 mins ago",
    image: `${IMG}/News-2.png`,
    href: "/blog/solana-network-upgrade",
  },
  {
    id: 3,
    category: "Ethereum",
    tag: "Ethereum",
    title: "Crypto Market Reclaims $3 Trillion as Institutional Demand Broadens",
    excerpt: "Ethereum staking inflows keep climbing as institutions increase exposure.",
    author: "Shubham K",
    time: "30 mins ago",
    image: `${IMG}/News-3.png`,
    href: "/blog/ethereum-staking-inflows",
  },
  {
    id: 4,
    category: "Global",
    tag: "XRP",
    title: "Crypto Market Reclaims $3 Trillion as Institutional Demand Broadens",
    excerpt: "Global regulators move toward clearer rules for digital asset markets.",
    author: "Shubham K",
    time: "30 mins ago",
    image: `${IMG}/News-4.png`,
    href: "/blog/global-crypto-rules",
  },
  {
    id: 5,
    category: "Bitcoin",
    tag: "Bitcoin",
    title: "Crypto Market Reclaims $3 Trillion as Institutional Demand Broadens",
    excerpt: "Bitcoin ETF inflows keep climbing as price pushes toward new highs.",
    author: "Arnold R",
    time: "30 mins ago",
    image: `${IMG}/News-5.png`,
    href: "/blog/bitcoin-etf-inflows",
  },
];

const FILTERS = ["All", "Bitcoin", "Altcoin", "Ethereum", "Global"];

// Tag chip colors (same as hero)
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

function SmallCard({ item }) {
  return (
    <Link href={item.href} className="group flex flex-col gap-4 no-underline">
      <div className="aspect-[15/8] w-full overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <Meta item={item} />
      <h3 className="m-0 line-clamp-2 font-[Manrope] text-[16px] font-semibold leading-snug text-[#111318] transition-colors group-hover:text-[#B8860B] dark:text-white">
        {item.title}
      </h3>
    </Link>
  );
}

export default function NewsSection({ news = DEFAULT_NEWS, viewAllHref = "/blog" }) {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? news : news.filter((n) => n.category === filter)),
    [news, filter]
  );
  const featured = filtered[0];
  const rest = filtered.slice(1, 5);

  return (
    <section className="bg-white py-[35px] transition-colors sm:py-[40px] lg:py-[50px] dark:bg-[#141416]">
      <div className="mx-auto container px-3 md:px-0">
        {/* ---------- Heading ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="min-w-0 flex-1">
            <h2 className="m-0 font-[Manrope] text-[26px] font-extrabold leading-tight text-[#111318] sm:text-[32px] dark:text-white">
              News
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

        {/* ---------- Tabing Filters ---------- */}
        <div className="-mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 flex-wrap sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((name) => {
            const isActive = filter === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                className={`shrink-0 rounded-md border px-4 py-1.5 font-[Inter] text-[14px] font-medium transition-colors ${
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

        {/* ---------- Content ---------- */}
        {featured ? (
          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-8">
            {/* Featured */}
            <Link href={featured.href} className="group flex flex-col gap-4 no-underline">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <Meta item={featured} />
              <h3 className="m-0 font-[Manrope] text-[18px] font-semibold leading-snug text-[#111318] transition-colors group-hover:text-[#B8860B] sm:text-[20px] dark:text-white">
                {featured.title}
              </h3>
              <p className="m-0 font-[Inter] text-[16px] font-normal leading-relaxed text-[#667085] dark:text-white/60">
                {featured.excerpt}{" "}
                <span className="font-medium italic bg-[linear-gradient(180deg,#BC7400_0%,#C5984F_100%)] bg-clip-text text-transparent">Read more...</span>
              </p>
            </Link>

            {/* 2 x 2 grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[480px]:grid-cols-2">
                {rest.map((item) => (
                  <SmallCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="mt-10 text-center font-[Inter] text-[14px] text-[#667085]">No news found in this category.</p>
        )}
      </div>
    </section>
  );
}