"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAtom, useAtomValue } from "jotai";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Apis, RoutesName } from "@/_common/app.constants";
import { useFetchWrapper } from "@/_helpers";
import { TrendingNewsAtom } from "@/_state";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import { blogPath, getBlogSlug, rememberBlogId, slugify } from "@/lib/content";

dayjs.extend(relativeTime);

const IMG = "/assets/images/coinchain-img";
const FEATURED_IMAGE = `${IMG}/near-price-analysis.png`;
const PowerIcon = `${IMG}/power-icon.svg`;

// Tag chip colors
const TAG_STYLES = {
  Tether: { bg: "#DFFFF2", color: "#16A66A", border: "#BFF4DE" },
  Solana: { bg: "#FFE3E6", color: "#E5484D", border: "#FFC9CE" },
  XRP: { bg: "#EEEEEE", color: "#353942", border: "#DDDDDD" },
  Bitcoin: { bg: "#FFF1DE", color: "#F7931A", border: "#FFDDAE" },
  Ethereum: { bg: "#E6ECFF", color: "#4C6FFF", border: "#CCD8FF" },
  "Global News": { bg: "#EBF3FE", color: "#2563EB", border: "#BFDBFE" },
  "Market News": { bg: "#FEF3C7", color: "#D97706", border: "#FDE68A" },
  "Trending News": { bg: "#FEE2E2", color: "#DC2626", border: "#FECACA" },
  "Price Analysis": { bg: "#F3E8FF", color: "#7C3AED", border: "#DDD6FE" },
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
const highlight = (text) => {
  if (!text || typeof text !== "string") return text || "";
  return text.split(/(\$\d+(?:[.,]\d+)?)/g).map((part, i) =>
    /^\$\d/.test(part) ? (
      <span key={i} className="text-[#854D0E]">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const getNewsItems = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.results)) return response.results;
  if (Array.isArray(response)) return response;
  return [];
};

const getMediaUrl = (mediaPath) => {
  if (!mediaPath) return "";
  const path = String(mediaPath).trim();
  if (/^(?:https?:|data:|blob:)/i.test(path) || path.startsWith("//")) {
    return path;
  }
  const baseUrl = (
    process.env.NEXT_PUBLIC_IMAGE_URL ||
    process.env.REACT_APP_IMAGE_URL ||
    "https://api.thecoinchain.com"
  ).replace(/\/+$/, "");
  return baseUrl ? `${baseUrl}/${path.replace(/^\/+/, "")}` : path;
};

const formatTimeAgo = (item) => {
  const publishedAt = item?.created_at || item?.published_at || item?.date;
  if (!publishedAt) return "Just now";
  const localPublishedAt =
    typeof publishedAt === "string" ? publishedAt.replace(/Z$/i, "") : publishedAt;
  const parsedDate =
    localPublishedAt && dayjs(localPublishedAt).isValid() ? dayjs(localPublishedAt) : null;
  if (!parsedDate) return "Just now";
  const diffMs = dayjs().diff(parsedDate);
  if (diffMs < 60000) return "Just now";
  const fromNow = parsedDate.fromNow();
  return fromNow.startsWith("in ") ? "Just now" : fromNow;
};

const getTag = (item) => {
  if (item?.tag) return item.tag;
  if (item?.category) return item.category;
  if (item?.coin) return item.coin;

  const title = item?.title || "";
  if (/bitcoin|btc/i.test(title)) return "Bitcoin";
  if (/ethereum|eth/i.test(title)) return "Ethereum";
  if (/solana|sol/i.test(title)) return "Solana";
  if (/tether|usdt/i.test(title)) return "Tether";
  if (/xrp|ripple/i.test(title)) return "XRP";

  if (item?.type) {
    return String(item.type)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return "Trending";
};

const mapNewsItem = (item, index) => {
  if (!item) return null;
  if (item.href && item.time && !item.created_at) {
    return item;
  }

  const id = item.id ?? index;
  const title = item.title || "Latest crypto market update";
  const slug = getBlogSlug(item);
  const href = blogPath(item, "trending-news");
  const time = formatTimeAgo(item);
  const author =
    item.profile?.profile_name?.trim() ||
    item.author?.trim() ||
    item.author_name?.trim() ||
    "TheCoinChain";
  const rawMedia = item.get_media_display || item.image || item.image_link;
  const mediaUrl = rawMedia ? getMediaUrl(rawMedia) : "";
  const fallbackThumb = `${IMG}/Trending-Now-${(index % 4) + 1}.png`;

  return {
    id,
    tag: getTag(item),
    badge: "Breaking News",
    title,
    author,
    time,
    image: mediaUrl || FEATURED_IMAGE,
    thumb: mediaUrl || fallbackThumb,
    href,
    slug,
    raw: item,
  };
};

export default function BreakingNewsHero({ news, initialNews = [] }) {
  const pathname = usePathname();
  const fetchWrapper = useFetchWrapper();
  const [trendingNewsAtom, setTrendingNewsAtom] = useAtom(TrendingNewsAtom);

  const initialList = useMemo(() => {
    if (Array.isArray(initialNews) && initialNews.length > 0) return initialNews;
    if (Array.isArray(news) && news.length > 0) return news;
    if (Array.isArray(trendingNewsAtom) && trendingNewsAtom.length > 0) return trendingNewsAtom;
    return [];
  }, [initialNews, news, trendingNewsAtom]);

  const [apiNews, setApiNews] = useState(() => initialList);
  const [loading, setLoading] = useState(() => initialList.length === 0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    if (Array.isArray(initialNews) && initialNews.length > 0) {
      setApiNews(initialNews);
      setLoading(false);
      if (!trendingNewsAtom || trendingNewsAtom.length === 0) {
        setTrendingNewsAtom(initialNews);
      }
      return;
    }

    if (Array.isArray(news) && news.length > 0) {
      setApiNews(news);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchTrendingNews = async () => {
      try {
        const response = await fetchWrapper.get(Apis.All_Content("trending_news"));
        if (cancelled) return;
        const list = getNewsItems(response);
        if (Array.isArray(list) && list.length > 0) {
          setApiNews(list);
          setTrendingNewsAtom(list);
        }
      } catch (error) {
        console.warn("Unable to fetch trending news:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTrendingNews();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNews, news]);

  const openDetail = (item) => {
    if (!item?.id) return;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("home_scroll_position", String(window.scrollY));
      sessionStorage.setItem("home_scroll_section", "trending-news-section");
      sessionStorage.setItem("restore_scroll_on_home", "true");
      sessionStorage.setItem("home_scroll_card_id", String(item.id));
      const targetSlug =
        item.slug && String(item.slug).trim()
          ? slugify(String(item.slug), false)
          : slugify(item.title || "", true);
      rememberBlogId(targetSlug, item.id);
    }
  };

  const rawStories =
    apiNews && apiNews.length > 0
      ? apiNews
      : Array.isArray(initialNews) && initialNews.length > 0
        ? initialNews
        : Array.isArray(news) && news.length > 0
          ? news
          : trendingNewsAtom && trendingNewsAtom.length > 0
            ? trendingNewsAtom
            : [];

  const formattedStories = rawStories.map(mapNewsItem).filter(Boolean);
  const active = formattedStories[0];

  // Right side: take up to 8 stories for smooth marquee loop
  const rightStories = formattedStories.slice(0, 8);
  const loopItems = rightStories.length > 1 ? [...rightStories, ...rightStories] : rightStories;
  const duration = Math.max(rightStories.length * 6, 25);

  if (!active && !loading) {
    return null;
  }

  return (
    <section
      id="trending-news-section"
      className="bg-[url(/assets/images/coinchain-img/Main.png)] dark:bg-[url(/assets/images/coinchain-img/Black_Background.png)] bg-cover bg-center bg-no-repeat pb-6 pt-[78px] transition-colors sm:pb-8 lg:pb-10 sm:pt-[78px] lg:pt-[78px]"
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
          {loading && !active ? (
            <div className="min-h-[360px] animate-pulse rounded-xl bg-gray-100 sm:min-h-[400px] lg:h-full lg:min-h-[420px] dark:bg-white/5" />
          ) : (
            <Link
              key={active.id}
              href={active.href}
              onClick={() => openDetail(active)}
              className="hero-fade group relative block min-h-[360px] overflow-hidden rounded-xl no-underline sm:min-h-[400px] lg:h-full lg:min-h-[420px]"
            >
              <img
                src={active.image}
                alt={active.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FEATURED_IMAGE;
                }}
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="relative flex h-full min-h-[360px] flex-col justify-end gap-3 p-4 sm:min-h-[380px] sm:p-6 lg:min-h-[400px] bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_20%,rgba(255,255,255,0.85)_25%,transparent_68%)]">

                <div className="absolute top-4 left-4 z-10 sm:top-6 sm:left-6">
                  <img
                    src="https://api.thecoinchain.com/uploads/TCC%20final%20logo%20light%20theme.svg"
                    alt="The Coin Chain Logo"
                    className="h-[22px] w-auto object-contain sm:h-[26px]"
                  />
                </div>

                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E5484D] px-2 py-1 font-[Manrope] text-[14px] font-medium text-white leading-[1.49]">
                  <img src={PowerIcon} alt="The Coin Chain Logo" className="relative object-contain w-[8px] h-[18px]" />
                  {active.badge || "Breaking News"}
                </span>

                <h2 className="max-w-full font-[Manrope] text-[20px] font-extrabold leading-snug text-[#111318] sm:max-w-[60%] sm:text-[24px] lg:max-w-[48%] mt-1">
                  {highlight(active.title)}
                </h2>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-[Manrope] text-[14px] font-semibold text-[#323232] dark:text-[#00000]/80 mt-1">
                  <Tag label={active.tag} />
                  <span className="hidden h-4 w-px bg-[#353942]/30 sm:block" />
                  <span>By {active.author}</span>
                  <span className="hidden h-4 w-px bg-[#353942]/30 sm:block" />
                  <span suppressHydrationWarning>{active.time}</span>
                </div>

                <span className="mt-[12px] inline-flex w-fit items-center gap-2 rounded-md bg-[linear-gradient(270deg,#D7AE42_0%,#F0D667_33%,#F0D667_65.7%,#D7AE42_100%)] px-4 py-2 font-[Manrope] text-[14px] font-semibold text-[#111318] transition-opacity group-hover:opacity-90">
                  Read Full Blog
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          )}
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
                href={RoutesName.Trending_News || "/trending-news"}
                onClick={() => setIsNavigating(true)}
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[linear-gradient(270deg,#D7AE42_0%,#F0D667_33%,#F0D667_65.7%,#D7AE42_100%)] px-4 py-2.5 font-[Manrope] text-[14px] font-semibold text-[#111318] no-underline transition-opacity hover:opacity-90 border border-transparent hover:border-[#010101] dark:hover:border-white"
              >
                View All
                {isNavigating ? (
                  <Loader2 className="size-4 animate-spin text-[#111318]" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
              </Link>
            </div>

            <div className="trend-viewport relative min-h-0 flex-1 overflow-hidden">
              {loading && loopItems.length === 0 ? (
                <div className="flex flex-col gap-3 py-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex animate-pulse items-center gap-3 py-3">
                      <div className="h-[58px] w-[88px] shrink-0 rounded-md bg-gray-200 sm:h-[68px] sm:w-[120px] dark:bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-white/10" />
                        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-white/10" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="trend-scroll m-0 list-none p-0" style={{ "--trend-duration": `${duration}s` }}>
                  {loopItems.map((item, index) => {
                    return (
                      <li key={`${item.id}-${index}`} className="border-b border-[#EDEDED] last:border-0 dark:border-white/10 focus:outline-none focus:ring-0">
                        <Link
                          href={item.href}
                          onClick={() => openDetail(item)}
                          aria-label={`Read: ${item.title}`}
                          className="flex w-full items-center gap-3 rounded-lg px-1 py-4 text-left no-underline transition-colors hover:bg-[#FFF8E5] dark:hover:bg-white/5"
                        >
                          <img
                            src={item.thumb || item.image}
                            alt=""
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = `${IMG}/Trending-Now-1.png`;
                            }}
                            className="h-[58px] w-[88px] shrink-0 rounded-md object-cover sm:h-[68px] sm:w-[120px]"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 font-[Manrope] text-[14px] font-medium leading-snug text-[#111318] dark:text-white">
                              {item.title}
                            </p>
                            <div className="mb-1.5 flex items-center justify-end gap-2 relative bottom-[-20px]">
                              {/* <Tag label={item.tag} /> */}
                              <span suppressHydrationWarning className="shrink-0 font-[Manrope] text-[12px] font-medium text-[#667085] dark:text-white/60">
                                {item.tag} | {item.time}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
