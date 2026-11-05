"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { Apis, RoutesName } from "@/_common/app.constants";
import { useFetchWrapper } from "@/_helpers";
import { TrendingNewsAtom } from "@/_state";
import { formatNewsDate } from "@/components/news/NewsParts";
import { blogPath, getBlogSlug, getMediaUrl, listFrom, rememberBlogId } from "@/lib/content";

const IMG = "/assets/images/coinchain-img";

const FILTERS = [
  "All",
  "Price Analysis",
  "Stock Price Analysis",
  "Bitcoin Analysis",
  "Ethereum Analysis",
  "Memecoin Analysis",
];

const TAB_TO_KEY = {
  All: "all",
  "Price Analysis": "price_prediction",
  "Stock Price Analysis": "stock_price_prediction",
  "Bitcoin Analysis": "bitcoin_analysis",
  "Ethereum Analysis": "ethereum_analysis",
  "Memecoin Analysis": "memecoin_analysis",
};

const ALLOWED_ANALYSIS_TYPES = new Set([
  "price_prediction",
  "stock_price_prediction",
  "bitcoin_analysis",
  "ethereum_analysis",
  "memecoin_analysis",
]);

// Tag chip colors (same style as News and Hero)
const TAG_STYLES = {
  "Price Analysis": { bg: "#FFFBEB", color: "#B45309", border: "#FDE68A" },
  "Stock Price Analysis": { bg: "#EBF3FE", color: "#2563EB", border: "#BFDBFE" },
  "Stock Analysis": { bg: "#EBF3FE", color: "#2563EB", border: "#BFDBFE" },
  "Bitcoin Analysis": { bg: "#FFF6D9", color: "#F7931A", border: "#FFE8A2" },
  "Ethereum Analysis": { bg: "#D9E1FF", color: "#3A57C9", border: "#9FB3FF" },
  "Memecoin Analysis": { bg: "#FFF1F2", color: "#BE123C", border: "#FECDD3" },
  Analysis: { bg: "#FFFBEB", color: "#B45309", border: "#FDE68A" },
};
const DEFAULT_TAG = { bg: "#F3F4F6", color: "#353942", border: "#E5E7EB" };

const TYPE_TO_LABEL = {
  price_prediction: "Price Analysis",
  stock_price_prediction: "Stock Price Analysis",
  bitcoin_analysis: "Bitcoin Analysis",
  ethereum_analysis: "Ethereum Analysis",
  memecoin_analysis: "Memecoin Analysis",
};

function getTag(item, defaultCategory) {
  // 1. If inside a specific category tab (not "All"), strictly show that tab's type!
  if (defaultCategory && defaultCategory !== "All") {
    return defaultCategory;
  }

  // 2. In "All" tab: determine strictly by item type or _defaultCat
  const rawType = (item?.type || "").toLowerCase().trim();
  if (TYPE_TO_LABEL[rawType]) {
    return TYPE_TO_LABEL[rawType];
  }

  if (item?._defaultCat && item._defaultCat !== "All") {
    return item._defaultCat;
  }

  return "Price Analysis";
}

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

function formatArticleForCard(item, defaultCategory, index = 0) {
  if (!item) return null;
  const id = item.id ?? index;
  const title = item.title || "Latest analysis update";
  const slug = getBlogSlug(item);
  const fallbackType = (item.type || "price_prediction").toLowerCase().replace(/_/g, "-");
  const href = blogPath(item, fallbackType);
  const time = formatNewsDate(item.created_at || item.published_at);
  const author =
    item.profile?.profile_name?.trim() ||
    item.author?.trim() ||
    item.author_name?.trim() ||
    "TheCoinChain";
  const tag = getTag(item, defaultCategory);
  const rawMedia = item.get_media_display || item.image || item.image_link;
  const mediaUrl = rawMedia ? getMediaUrl(rawMedia) : "";
  const fallbackImage = `${IMG}/Analysis-${(index % 4) + 1}.png`;

  return {
    id,
    category: defaultCategory,
    tag,
    title,
    author,
    time,
    image: mediaUrl || fallbackImage,
    fallbackImage,
    href,
    slug,
    raw: item,
  };
}

function combineAndSortAnalysis(categoriesMap, trendingList) {
  const seenIds = new Set();
  const allArticles = [];

  const addArticle = (art, defaultCat) => {
    if (!art || art.id === undefined || art.id === null || seenIds.has(art.id)) return;
    const rawType = (art.type || "").toLowerCase().trim();
    if (rawType && !ALLOWED_ANALYSIS_TYPES.has(rawType)) return;

    seenIds.add(art.id);
    allArticles.push({
      ...art,
      _defaultCat: defaultCat,
    });
  };

  // 1. Add from category APIs
  const cats = [
    { key: "price_prediction", label: "Price Analysis" },
    { key: "stock_price_prediction", label: "Stock Price Analysis" },
    { key: "bitcoin_analysis", label: "Bitcoin Analysis" },
    { key: "ethereum_analysis", label: "Ethereum Analysis" },
    { key: "memecoin_analysis", label: "Memecoin Analysis" },
  ];

  cats.forEach(({ key, label }) => {
    const list = categoriesMap?.[key];
    if (Array.isArray(list)) {
      list.forEach((item) => addArticle(item, label));
    }
  });

  // 2. Add from Trending News Atom filtered by allowed analysis types
  if (Array.isArray(trendingList)) {
    trendingList.forEach((item) => {
      const t = (item?.type || "").toLowerCase().trim();
      if (ALLOWED_ANALYSIS_TYPES.has(t)) {
        let label = "Analysis";
        if (t === "bitcoin_analysis") label = "Bitcoin Analysis";
        else if (t === "ethereum_analysis") label = "Ethereum Analysis";
        else if (t === "memecoin_analysis") label = "Memecoin Analysis";
        else if (t === "stock_price_prediction") label = "Stock Price Analysis";
        else if (t === "price_prediction") label = "Price Analysis";
        addArticle(item, label);
      }
    });
  }

  allArticles.sort((a, b) => {
    const timeA = a.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
    const timeB = b.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
    return timeB - timeA;
  });

  return allArticles;
}

function AnalysisCard({ item, onCardClick }) {
  return (
    <Link
      href={item.href}
      onClick={() => onCardClick?.(item)}
      id={item.id !== undefined && item.id !== null ? `analysis-card-${item.id}` : undefined}
      className="group flex h-full flex-col gap-3 rounded-lg border border-[#EAECF0] bg-white p-3 no-underline shadow-[0px_1px_2px_0px_#1018280D] transition-shadow hover:shadow-[0px_4px_14px_0px_#0000001A] dark:border-white/10 dark:bg-[#1c1c1f]"
    >
      <div className="aspect-video w-full overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
              e.currentTarget.src = item.fallbackImage;
            }
          }}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 px-0.5 font-[Manrope] text-[12px] font-medium text-[#667085] dark:text-white/70 mt-1">
        <Tag label={item.tag} />
        <span className="h-3.5 w-px bg-[#353942]/25 dark:bg-white/20" />
        <span className="inline-block max-w-[11ch] truncate whitespace-nowrap" title={item.author}>
          By {item.author}
        </span>
        <span className="h-3.5 w-px bg-[#353942]/25 dark:bg-white/20" />
        <span className="whitespace-nowrap">{item.time}</span>
      </div>

      <h3 className="m-0 line-clamp-2 px-0.5 font-[Manrope] text-[16px] font-medium leading-[1.5] text-[#111318] dark:text-white">
        {item.title}
      </h3>

      {/* <span className="mt-auto inline-flex items-center gap-1 px-0.5 font-[Manrope] text-[12px] font-medium bg-[linear-gradient(180deg,#BC7400_0%,#C5984F_100%)] bg-clip-text text-transparent transition-all group-hover:gap-1.5">
        Read Analysis
        <ArrowRight className="size-3" />
      </span> */}
    </Link>
  );
}

export default function AnalysisSection({
  items,
  initialCategoriesData,
  viewAllHref,
}) {
  const [filter, setFilter] = useState("All");
  const [categoriesData, setCategoriesData] = useState(
    initialCategoriesData || {
      price_prediction: [],
      stock_price_prediction: [],
      bitcoin_analysis: [],
      ethereum_analysis: [],
      memecoin_analysis: [],
    }
  );
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const trendingNewsAtom = useAtomValue(TrendingNewsAtom);
  const fetchWrapper = useFetchWrapper();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, filter]);

  // Fetch all 5 endpoints in parallel on client if not provided via SSR
  useEffect(() => {
    const hasInitialData =
      categoriesData &&
      (categoriesData.price_prediction?.length > 0 ||
        categoriesData.stock_price_prediction?.length > 0 ||
        categoriesData.bitcoin_analysis?.length > 0 ||
        categoriesData.ethereum_analysis?.length > 0 ||
        categoriesData.memecoin_analysis?.length > 0);

    if (hasInitialData) return;

    let cancelled = false;

    const endpoints = [
      { key: "price_prediction", path: Apis.All_Content("price_prediction") },
      { key: "stock_price_prediction", path: Apis.All_Content("stock_price_prediction") },
      { key: "bitcoin_analysis", path: Apis.All_Content("bitcoin_analysis") },
      { key: "ethereum_analysis", path: Apis.All_Content("ethereum_analysis") },
      { key: "memecoin_analysis", path: Apis.All_Content("memecoin_analysis") },
    ];

    Promise.allSettled(endpoints.map((ep) => fetchWrapper.get(ep.path)))
      .then((results) => {
        if (cancelled) return;
        const nextData = {
          price_prediction: [],
          stock_price_prediction: [],
          bitcoin_analysis: [],
          ethereum_analysis: [],
          memecoin_analysis: [],
        };
        results.forEach((res, index) => {
          const key = endpoints[index].key;
          if (res.status === "fulfilled") {
            nextData[key] = listFrom(res.value);
          } else {
            console.warn(`Failed to fetch ${key}:`, res.reason);
          }
        });
        setCategoriesData(nextData);
      })
      .catch((err) => {
        console.warn("Parallel analysis fetch error:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCardClick = (item) => {
    if (!item) return;
    sessionStorage.setItem("home_scroll_section", "analysis-section");
    if (item.id !== undefined && item.id !== null) {
      sessionStorage.setItem("home_scroll_card_id", String(item.id));
    }
    const targetSlug = item.slug || getBlogSlug(item.raw || item);
    rememberBlogId(targetSlug, item.id);
  };

  const filtered = useMemo(() => {
    const hasCategoryData =
      categoriesData &&
      (categoriesData.price_prediction?.length > 0 ||
        categoriesData.stock_price_prediction?.length > 0 ||
        categoriesData.bitcoin_analysis?.length > 0 ||
        categoriesData.ethereum_analysis?.length > 0 ||
        categoriesData.memecoin_analysis?.length > 0);

    if (filter === "All") {
      const combined = combineAndSortAnalysis(categoriesData, trendingNewsAtom);
      if (combined.length > 0) {
        return combined.map((art, idx) => formatArticleForCard(art, art._defaultCat || "Analysis", idx));
      }
      if (Array.isArray(items) && items.length > 0) {
        return items;
      }
      return [];
    }

    const key = TAB_TO_KEY[filter];
    let list = categoriesData?.[key] || [];

    // Fallback to trending news atom if category list is empty
    if ((!list || list.length === 0) && Array.isArray(trendingNewsAtom)) {
      list = trendingNewsAtom.filter((item) => (item?.type || "").toLowerCase().trim() === key);
    }

    const sorted = [...list].sort((a, b) => {
      const timeA = a.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
      const timeB = b.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
      return timeB - timeA;
    });

    return sorted.map((art, idx) => formatArticleForCard(art, filter, idx));
  }, [categoriesData, filter, items, trendingNewsAtom]);

  const currentViewAllHref = RoutesName.Analysis;

  return (
    <section id="analysis-section" className="bg-[#F8F9FB] py-[35px] transition-colors sm:py-[40px] lg:py-[50px] dark:bg-[#141416]">
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
            href={currentViewAllHref}
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

        {/* ---------- Filters ---------- */}
        <div className="mx-0 md:-mx-4 mt-9 flex gap-3 overflow-x-auto px-3 md:px-4 pb-1 sm:mx-0 flex-wrap sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((name) => {
            const isActive = filter === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                className={`shrink-0 whitespace-nowrap rounded-md border px-4 py-1.5 font-[Inter] text-[14px] font-medium transition-colors ${isActive
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
        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-4">
            {filtered.slice(0, 8).map((item) => (
              <AnalysisCard key={item.id} item={item} onCardClick={handleCardClick} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center font-[Inter] text-[14px] text-[#667085]">
            No analysis found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
