"use client";

import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";

const IMG = "/assets/images/coinchain-img";
const BANNER_BACKGROUND = `${IMG}/Main.png`;
const FEATURED_IMAGE = `${IMG}/near-price-analysis.png`;
const PowerIcon = `${IMG}/power-icon.svg`;
const DEFAULT_NEWS = [
  {
    id: 1,
    tag: "Tether",
    badge: "Breaking News",
    title: "Near Price Analysis Can Near Hold $5 After Sharp Rejection Near $6",
    author: "Shubham K",
    time: "30 mins ago",
    image: FEATURED_IMAGE,
    thumb: `${IMG}/Trending-Now-1.png`,
    href: "/blog/near-price-analysis",
  },
  {
    id: 2,
    tag: "Solana",
    badge: "Breaking News",
    title: "Solana's Alpenglow Goes Live in Biggest Network Overhaul Yet",
    author: "Shubham K",
    time: "30 mins ago",
    image: FEATURED_IMAGE,
    thumb: `${IMG}/Trending-Now-2.png`,
    href: "/blog/solana-alpenglow",
  },
  {
    id: 3,
    tag: "Tether",
    badge: "Breaking News",
    title: "Tether Expands Reserves With New Gold Backed Strategy Announcement",
    author: "Shubham K",
    time: "1 hour ago",
    image: FEATURED_IMAGE,
    thumb: `${IMG}/Trending-Now-3.png`,
    href: "/blog/tether-reserves",
  },
  {
    id: 4,
    tag: "XRP",
    badge: "Breaking News",
    title: "XRP Faces Heavy Selling Pressure As Support Level Is Tested Again",
    author: "Shubham K",
    time: "2 hours ago",
    image: FEATURED_IMAGE,
    thumb: `${IMG}/Trending-Now-4.png`,
    href: "/blog/xrp-support",
  },
  {
    id: 5,
    tag: "Bitcoin",
    badge: "Breaking News",
    title: "Bitcoin Pushes Toward New Highs As ETF Inflows Keep Climbing",
    author: "Shubham K",
    time: "5 hours ago",
    image: FEATURED_IMAGE,
    thumb: `${IMG}/Trending-Now-1.png`,
    href: "/blog/bitcoin-etf-inflows",
  },
];

// Tag chip colors
const TAG_STYLES = {
  Tether: { bg: "#DFFFF2", color: "#16A66A", border: "#BFF4DE" },
  Solana: { bg: "#FFE3E6", color: "#E5484D", border: "#FFC9CE" },
  XRP: { bg: "#EEEEEE", color: "#353942", border: "#DDDDDD" },
  Bitcoin: { bg: "#FFF1DE", color: "#F7931A", border: "#FFDDAE" },
  Ethereum: { bg: "#E6ECFF", color: "#4C6FFF", border: "#CCD8FF" },
};
const DEFAULT_TAG = { bg: "#F3F4F6", color: "#353942", border: "#E5E7EB" };

function Tag({ label, className = "" }) {
  const s = TAG_STYLES[label] || DEFAULT_TAG;
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-[Manrope] text-[12px] font-semibold leading-4 ${className}`}
      style={{ backgroundColor: s.bg, color: s.color, borderColor: s.border }}
    >
      {label}
    </span>
  );
}

// $5, $6 jaise amounts gold me highlight hote hain
const highlight = (text) =>
  text.split(/(\$\d+(?:[.,]\d+)?)/g).map((part, i) =>
    /^\$\d/.test(part) ? (
      <span key={i} className="text-[#C59400]">
        {part}
      </span>
    ) : (
      part
    )
  );

export default function BreakingNewsHero({ news = DEFAULT_NEWS }) {
  const active = news[0];
  if (!active) return null;

  // Duplicate list => seamless infinite scroll
  const loopItems = [...news, ...news];
  const duration = Math.max(news.length * 5, 20);

  return (
    <section
      className="bg-cover bg-center bg-no-repeat pb-6 pt-[78px] transition-colors sm:pb-8 lg:pb-10 sm:pt-[78px] lg:pt-[78px]"
      style={{ backgroundImage: `url("${BANNER_BACKGROUND}")` }}
    >

    <CryptoTickerMarquee />
     
      <style>{`
        @keyframes trendScroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes heroFade { from { opacity: 0; transform: scale(1.01); } to { opacity: 1; transform: scale(1); } }
        .trend-scroll { animation: trendScroll var(--trend-duration, 30s) linear infinite; will-change: transform; }
        .trend-viewport:hover .trend-scroll,
        .trend-viewport:focus-within .trend-scroll { animation-play-state: paused; }
        .hero-fade { animation: heroFade .4s ease; }
        @media (prefers-reduced-motion: reduce) {
          .trend-scroll { animation: none; }
          .trend-viewport { overflow-y: auto; }
        }
      `}</style>

      <div className="mx-auto grid container gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] pt-[14px] px-3 md:px-0">
        {/* ---------- LEFT: featured news ---------- */}
        <div className="rounded-2xl bg-white p-3 shadow-[0px_0px_10px_0px_#0000001A] sm:p-4 dark:bg-[#1c1c1f]">
          <Link
            key={active.id}
            href={active.href}
            className="hero-fade group relative block min-h-[360px] overflow-hidden rounded-xl no-underline sm:min-h-[400px] lg:h-full lg:min-h-[420px]"
          >
            <img
              src={active.image}
              alt={active.title}
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* readability overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent sm:bg-gradient-to-r sm:from-white/90 sm:via-white/50 sm:to-transparent dark:from-black dark:via-black/70 dark:sm:from-black/85 dark:sm:via-black/50" /> */}
             {/* <img src={COIN_CHAIN_LOGO} alt="The Coin Chain Logo" className="relative w-32 object-contain sm:w-40" /> */}
            <div className="relative flex h-full min-h-[360px] flex-col justify-end gap-3 p-4 sm:min-h-[380px] sm:p-6 lg:min-h-[400px]">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E5484D] px-2 py-1 font-[Manrope] text-[14px] font-medium text-white leading-[1.49]">
                <img src={PowerIcon} alt="The Coin Chain Logo" className="relative object-contain w-[8px] h-[18px]" />
                {active.badge || "Breaking News"}
              </span>

              <h2 className="max-w-full font-[Manrope] text-[20px] font-extrabold leading-snug text-[#111318] sm:max-w-[60%] sm:text-[24px] lg:max-w-[48%] mt-1">
                {highlight(active.title)}
              </h2>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-[Manrope] text-[14px] font-semibold text-[#323232] dark:text-white/80 mt-1">
                <Tag label={active.tag} />
                <span className="hidden h-4 w-px bg-[#353942]/30 sm:block" />
                <span>By {active.author}</span>
                <span className="hidden h-4 w-px bg-[#353942]/30 sm:block" />
                <span>{active.time}</span>
              </div>

              <span className="mt-[12px] inline-flex w-fit items-center gap-2 rounded-md bg-[linear-gradient(270deg,#D7AE42_0%,#F0D667_33%,#F0D667_65.7%,#D7AE42_100%)] px-4 py-2 font-[Manrope] text-[14px] font-semibold text-[#111318] transition-opacity group-hover:opacity-90">
                Read Full Blog
                <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </div>

        {/* ---------- RIGHT: Trending Now (auto scroll) ---------- */}
        <div className="relative h-[440px] lg:h-auto">
          <div className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-[0px_0px_10px_0px_#0000001A] lg:absolute lg:inset-0 dark:bg-[#1c1c1f]">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-3">
              <h3 className="font-[Manrope] text-[16px] font-extrabold text-[#111318] dark:text-white">Trending Now</h3>
              <span className="flex items-center gap-1 font-[Manrope] text-[12px] font-bold text-[#E5484D]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#E5484D]" />
                LIVE
              </span>
              </div>
               <Link
                  href={"/breaking-news"}
                  className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[linear-gradient(270deg,#D7AE42_0%,#F0D667_33%,#F0D667_65.7%,#D7AE42_100%)] px-4 py-2.5 font-[Manrope] text-[14px] font-semibold text-[#111318] no-underline transition-opacity hover:opacity-90 border border-transparent hover:border-[#010101] dark:hover:border-white"
                >
                  View All
                  <ArrowRight className="size-4" />
                </Link>
            </div>

            <div className="trend-viewport relative min-h-0 flex-1 overflow-hidden">
              <ul className="trend-scroll m-0 list-none p-0" style={{ "--trend-duration": `${duration}s` }}>
                {loopItems.map((item, index) => {
                  return (
                    <li key={`${item.id}-${index}`} className="border-b border-[#EDEDED] last:border-0 dark:border-white/10 focus:outline-none focus:ring-0">
                      <Link
                        href={item.href}
                        aria-label={`Read: ${item.title}`}
                        className="flex w-full items-center gap-3 rounded-lg px-1 py-4 text-left no-underline transition-colors hover:bg-[#FFF8E5] dark:hover:bg-white/5"
                      >
                        <img
                          src={item.thumb || item.image}
                          alt=""
                          loading="lazy"
                          className="h-[58px] w-[88px] shrink-0 rounded-md object-cover sm:h-[68px] sm:w-[120px]"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex items-center justify-between gap-2">
                            <Tag label={item.tag} />
                            <span className="shrink-0 font-[Manrope] text-[12px] font-medium text-[#667085] dark:text-white/60">
                              {item.time}
                            </span>
                          </div>
                          <p className="line-clamp-2 font-[Manrope] text-[14px] font-medium leading-snug text-[#111318] dark:text-white">
                            {item.title}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}