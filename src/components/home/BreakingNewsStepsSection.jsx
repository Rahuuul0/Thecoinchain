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
import { blogPath, getBlogSlug, getMediaUrl, listFrom, rememberBlogId, stripHtml } from "@/lib/content";

const IMG = "/assets/images/coinchain-img";

const FILTERS = ["All", "Bitcoin", "Altcoin", "Ethereum", "Global"];

const TAB_TO_KEY = {
  All: "all",
  Bitcoin: "bitcoin",
  Altcoin: "altcoin",
  Ethereum: "ethereum",
  Global: "global_news",
};

const VIEW_ALL_ROUTES = {
  All: RoutesName.News || "/news",
  Bitcoin: RoutesName.Bitcoin || "/bitcoin",
  Altcoin: RoutesName.Altcoin || "/altcoin",
  Ethereum: RoutesName.Ethereum || "/ethereum",
  Global: RoutesName.Global_News || "/global_news",
};


const ALLOWED_TYPES = new Set(["bitcoin", "ethereum", "altcoin", "global_news"]);

// Tag chip colors (same as hero)
const TAG_STYLES = {
  Tether: { bg: "#DFFFF2", color: "#16A66A", border: "#BFF4DE" },
  Solana: { bg: "#FFDDDE", color: "#E5484D", border: "#FFC4C6" },
  XRP: { bg: "#E9E9E9", color: "#353942", border: "#DADADA" },
  Bitcoin: { bg: "#FFF6D9", color: "#F7931A", border: "#FFE8A2" },
  Ethereum: { bg: "#D9E1FF", color: "#3A57C9", border: "#9FB3FF" },
  Altcoin: { bg: "#F3E8FF", color: "#7E22CE", border: "#E9D5FF" },
  Global: { bg: "#EBF3FE", color: "#2563EB", border: "#BFDBFE" },
};
const DEFAULT_TAG = { bg: "#F3F4F6", color: "#353942", border: "#E5E7EB" };

function getTag(item, defaultCategory) {
  // If a specific tab is selected (not "All"), strictly show that tab's type!
  if (defaultCategory && defaultCategory !== "All") {
    return defaultCategory;
  }

  if (item?.tag && typeof item.tag === "string") return item.tag;
  if (item?.coin && typeof item.coin === "string") return item.coin;

  const title = item?.title || "";
  if (/tether|usdt/i.test(title)) return "Tether";
  if (/\bsolana\b|\bsol\b/i.test(title)) return "Solana";
  if (/\bxrp\b|\bripple\b/i.test(title)) return "XRP";
  if (/\bbitcoin\b|\bbtc\b/i.test(title)) return "Bitcoin";
  if (/\bethereum\b|\beth\b/i.test(title)) return "Ethereum";

  if (item?.type) {
    const t = String(item.type).toLowerCase();
    if (t === "global_news" || t === "global-news") return "Global";
    return String(item.type)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return defaultCategory || "News";
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

function Meta({ item }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-[Manrope] text-[12px] xl:text-[14px] font-medium text-[#667085] dark:text-white/70">
      <Tag label={item.tag} />
      <span className="h-4 w-px bg-[#353942]/25 dark:bg-white/20" />
      <span className="inline-block max-w-[10ch] truncate whitespace-nowrap" title={item.author}>By {item.author}</span>
      <span className="h-4 w-px bg-[#353942]/25 dark:bg-white/20" />
      <span>{item.time}</span>
    </div>
  );
}

function SmallCard({ item, onCardClick }) {
  return (
    <Link
      href={item.href}
      onClick={() => onCardClick?.(item)}
      id={item.id !== undefined && item.id !== null ? `news-card-${item.id}` : undefined}
      className="group flex flex-col gap-4 no-underline"
    >
      <div className="aspect-[15/8] w-full overflow-hidden rounded-lg">
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
      <Meta item={item} />
      <h3 className="m-0 line-clamp-2 font-[Manrope] text-[16px] font-semibold leading-snug text-[#111318] transition-colors group-hover:text-[#B8860B] dark:text-white">
        {item.title}
      </h3>
    </Link>
  );
}

function formatArticleForCard(item, defaultCategory, index = 0) {
  if (!item) return null;
  const id = item.id ?? index;
  const title = item.title || "Latest crypto market update";
  const slug = getBlogSlug(item);
  const fallbackType =
    item._normalizedType ||
    (item.type ? String(item.type).toLowerCase().replace(/_/g, "-") : "") ||
    (defaultCategory === "Global" ? "global_news" : String(defaultCategory).toLowerCase());
  const href = blogPath(item, fallbackType);
  const time = formatNewsDate(item.created_at || item.published_at);
  const author =
    item.profile?.profile_name?.trim() ||
    item.author?.trim() ||
    item.author_name?.trim() ||
    "TheCoinChain";
  const rawMedia = item.get_media_display || item.image || item.image_link;
  const mediaUrl = rawMedia ? getMediaUrl(rawMedia) : "";
  const fallbackImage = `${IMG}/News-${(index % 5) + 1}.png`;
  const tag = getTag(item, defaultCategory);
  const excerpt = stripHtml(item.description || item.meta_description || "").slice(0, 160);

  return {
    id,
    category: defaultCategory,
    tag,
    title,
    excerpt,
    author,
    time,
    image: mediaUrl || fallbackImage,
    fallbackImage,
    href,
    slug,
    raw: item,
  };
}

function combineAndSortNews(categoriesMap) {
  const seenIds = new Set();
  const allArticles = [];

  const addArticle = (art, defaultCat) => {
    if (!art || art.id === undefined || art.id === null || seenIds.has(art.id)) return;
    const rawType = (art.type || defaultCat || "").toLowerCase().trim();
    const normalizedType = rawType === "global-news" ? "global_news" : rawType;
    if (!ALLOWED_TYPES.has(normalizedType)) return;

    seenIds.add(art.id);
    allArticles.push({
      ...art,
      _normalizedType: normalizedType,
      _defaultCat: defaultCat,
    });
  };

  const cats = [
    { key: "bitcoin", label: "Bitcoin" },
    { key: "ethereum", label: "Ethereum" },
    { key: "altcoin", label: "Altcoin" },
    { key: "global_news", label: "Global" },
  ];

  cats.forEach(({ key, label }) => {
    const list = categoriesMap?.[key];
    if (Array.isArray(list)) {
      list.forEach((item) => addArticle(item, label));
    }
  });

  allArticles.sort((a, b) => {
    const timeA = a.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
    const timeB = b.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
    return timeB - timeA;
  });

  return allArticles;
}

export default function BreakingNewsStepsSection({
  news,
  initialCategoriesData,
  viewAllHref,
}) {
  const [filter, setFilter] = useState("All");
  const [categoriesData, setCategoriesData] = useState(
    initialCategoriesData || { bitcoin: [], ethereum: [], altcoin: [], global_news: [] }
  );
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const trendingNewsAtom = useAtomValue(TrendingNewsAtom);
  const fetchWrapper = useFetchWrapper();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, filter]);

  // If initial server data is not provided or empty, fetch all 4 category APIs in parallel once
  useEffect(() => {
    const hasInitialData =
      categoriesData &&
      (categoriesData.bitcoin?.length > 0 ||
        categoriesData.ethereum?.length > 0 ||
        categoriesData.altcoin?.length > 0 ||
        categoriesData.global_news?.length > 0);

    if (hasInitialData) return;

    let cancelled = false;

    const endpoints = [
      { key: "bitcoin", path: Apis.All_Content("bitcoin") },
      { key: "ethereum", path: Apis.All_Content("ethereum") },
      { key: "altcoin", path: Apis.All_Content("altcoin") },
      { key: "global_news", path: Apis.All_Content("global_news") },
    ];

    Promise.allSettled(endpoints.map((ep) => fetchWrapper.get(ep.path)))
      .then((results) => {
        if (cancelled) return;
        const nextData = { bitcoin: [], ethereum: [], altcoin: [], global_news: [] };
        results.forEach((res, index) => {
          const key = endpoints[index].key;
          if (res.status === "fulfilled") {
            nextData[key] = listFrom(res.value);
          } else {
            console.warn(`Failed to fetch ${key} news:`, res.reason);
          }
        });
        setCategoriesData(nextData);
      })
      .catch((err) => {
        console.warn("Parallel news fetch error:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCardClick = (item) => {
    if (!item) return;
    sessionStorage.setItem("home_scroll_section", "breaking-news-section");
    if (item.id !== undefined && item.id !== null) {
      sessionStorage.setItem("home_scroll_card_id", String(item.id));
    }
    const targetSlug = item.slug || getBlogSlug(item.raw || item);
    rememberBlogId(targetSlug, item.id);
  };

  const filtered = useMemo(() => {
    const hasCategoryData =
      categoriesData &&
      (categoriesData.bitcoin?.length > 0 ||
        categoriesData.ethereum?.length > 0 ||
        categoriesData.altcoin?.length > 0 ||
        categoriesData.global_news?.length > 0);

    // If explicit news prop was passed and no API data, use news prop
    if (!hasCategoryData && Array.isArray(news) && news.length > 0) {
      return filter === "All" ? news : news.filter((n) => n.category === filter);
    }

    if (!hasCategoryData) {
      // If trendingNewsAtom has data, fallback can be extracted safely
      if (Array.isArray(trendingNewsAtom) && trendingNewsAtom.length > 0) {
        const atomList = trendingNewsAtom.filter((item) => {
          const t = (item?.type || "").toLowerCase().trim();
          return ALLOWED_TYPES.has(t);
        });
        if (atomList.length > 0) {
          const sorted = [...atomList].sort((a, b) => {
            const timeA = a.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
            const timeB = b.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
            return timeB - timeA;
          });
          return sorted.map((art, idx) => formatArticleForCard(art, filter, idx));
        }
      }
      return [];
    }

    if (filter === "All") {
      const combined = combineAndSortNews(categoriesData);
      if (combined.length === 0) return [];
      return combined.map((art, idx) => formatArticleForCard(art, art._defaultCat || "News", idx));
    }

    const key = TAB_TO_KEY[filter];
    const list = categoriesData[key] || [];
    const sorted = [...list].sort((a, b) => {
      const timeA = a.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
      const timeB = b.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
      return timeB - timeA;
    });

    return sorted.map((art, idx) => formatArticleForCard(art, filter, idx));
  }, [categoriesData, filter, news, trendingNewsAtom]);

  const featured = filtered[0];
  const rest = filtered.slice(1, 5);
  const currentViewAllHref = VIEW_ALL_ROUTES[filter] || RoutesName.News || viewAllHref || "/news";

  return (
    <section id="breaking-news-section" className="bg-white py-[35px] transition-colors sm:py-[40px] lg:py-[50px] dark:bg-[#141416]">
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

        {/* ---------- Tabing Filters ---------- */}
        <div className="mx-0 md:-mx-4 mt-6 flex gap-3 overflow-x-auto px-3 md:px-4 pb-1 sm:mx-0 flex-wrap sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((name) => {
            const isActive = filter === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                className={`shrink-0 rounded-md border px-4 py-1.5 font-[Inter] text-[14px] font-medium transition-colors ${isActive
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
            <Link
              href={featured.href}
              onClick={() => handleCardClick(featured)}
              id={featured.id !== undefined && featured.id !== null ? `news-card-${featured.id}` : undefined}
              className="group flex flex-col gap-4 no-underline"
            >
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={featured.image}
                  alt={featured.title}
                  onError={(e) => {
                    if (featured.fallbackImage && e.currentTarget.src !== featured.fallbackImage) {
                      e.currentTarget.src = featured.fallbackImage;
                    }
                  }}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <Meta item={featured} />
              <h3 className="m-0 font-[Manrope] text-[16px] md:text-[18px] font-semibold leading-snug text-[#111318] transition-colors group-hover:text-[#B8860B] sm:text-[20px] dark:text-white">
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
                  <SmallCard key={item.id} item={item} onCardClick={handleCardClick} />
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
