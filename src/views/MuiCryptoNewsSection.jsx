"use client";

import { useAtom } from "jotai";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Apis } from "@/_common/app.constants";
import { useFetchWrapper } from "@/_helpers";
import { TrendingNewsAtom } from "@/_state";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import {
  BackButton,
  formatNewsDate,
  getAuthorInfo,
  NewsMedia,
  ProfileBadge,
  ScrollToTopButton,
  useOpenBlog,
  useOpenProfile,
} from "@/components/news/NewsParts";
import { Container, LoadingOverlay } from "@/components/ui";
import { contentConfigFor, labelForType } from "@/lib/newsCategories";

const clearScrollRestore = () => {
  sessionStorage.removeItem("crypto_news_card_id");
  sessionStorage.removeItem("crypto_news_scroll_y");
  sessionStorage.removeItem("restore_scroll_on_news");
};

const ALLOWED_NEWS_TYPES = new Set(["bitcoin", "ethereum", "altcoin", "global_news"]);
const ALLOWED_ANALYSIS_TYPES = new Set([
  "price_prediction",
  "stock_price_prediction",
  "bitcoin_analysis",
  "ethereum_analysis",
  "memecoin_analysis",
]);

function filterAndSortArticles(rawList, allowedTypes) {
  if (!Array.isArray(rawList)) return [];
  const filtered = rawList.filter((item) => {
    const t = (item?.type || "").toLowerCase().trim();
    const normalized = t === "global-news" ? "global_news" : t;
    return allowedTypes.has(normalized);
  });
  return filtered.sort((a, b) => {
    const timeA = a?.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
    const timeB = b?.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
    return timeB - timeA;
  });
}

function useRestoreNewsScroll(items) {
  useEffect(() => {
    const savedCardId = sessionStorage.getItem("crypto_news_card_id");
    const savedY = parseFloat(sessionStorage.getItem("crypto_news_scroll_y")) || null;
    const shouldRestore = sessionStorage.getItem("restore_scroll_on_news") === "true" && (savedCardId || savedY);

    if (!shouldRestore) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      clearScrollRestore();
      return;
    }
    if (!items.length) return;

    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      const card = savedCardId && document.getElementById(`news-card-${savedCardId}`);
      if (card) {
        window.scrollTo({ top: Math.max(0, card.getBoundingClientRect().top + window.scrollY - 90), behavior: "smooth" });
      } else if (savedY > 0 && (document.documentElement.scrollHeight >= savedY || attempts >= 15)) {
        window.scrollTo({ top: savedY, behavior: "smooth" });
      } else if (attempts < 20) {
        return;
      }
      clearInterval(timer);
      clearScrollRestore();
    }, 100);

    return () => clearInterval(timer);
  }, [items]);
}

export default function MuiCryptoNewsSection({
  contentKey,
  initialItems = [],
  initialSearchQuery = "",
  customHeading,
  isAllNews: forceAllNews = false,
  isAllAnalysis: forceAllAnalysis = false,
}) {
  const router = useRouter();
  const fetchWrapper = useFetchWrapper();
  const [trendingNewsAtom, setTrendingNewsAtom] = useAtom(TrendingNewsAtom);
  const isSearch = contentKey === "search";
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
  const isAllNews = forceAllNews || contentKey === "news";
  const isAllAnalysis = forceAllAnalysis || contentKey === "analysis";
  const isCombinedFeed = isAllNews || isAllAnalysis;
  const allowedTypes = isAllAnalysis ? ALLOWED_ANALYSIS_TYPES : ALLOWED_NEWS_TYPES;
  const config = contentConfigFor(contentKey);
  const openBlog = useOpenBlog(isCombinedFeed || isSearch ? "latest-news" : config.type);
  const [openProfile, profileLoading] = useOpenProfile();

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const [items, setItems] = useState(() => {
    if (isCombinedFeed && Array.isArray(initialItems) && initialItems.length > 0) {
      return filterAndSortArticles(initialItems, allowedTypes);
    }
    return Array.isArray(initialItems) ? initialItems : [];
  });
  const [loading, setLoading] = useState(() => !items.length);

  const isTrendingNews = contentKey === "trending-news";

  const typeLabel = (item) => {
    if (isCombinedFeed || isTrendingNews || isSearch) {
      const rawType = item?.type ? String(item.type).toLowerCase().trim() : "";
      const normalizedType = rawType.replace(/-/g, "_");

      if (normalizedType && normalizedType !== "search" && normalizedType !== "trending_news") {
        const mapped = labelForType(normalizedType);
        if (mapped) return mapped;
        return normalizedType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      }

      if (item?.category && String(item.category).toLowerCase().trim() !== "search") {
        return item.category;
      }

      if (item?.tag && String(item.tag).toLowerCase().trim() !== "search") {
        return item.tag;
      }

      if (item?.coin && String(item.coin).toLowerCase().trim() !== "search") {
        return item.coin;
      }

      const title = item?.title || "";
      if (/\bbitcoin\b|\bbtc\b/i.test(title)) return "Bitcoin";
      if (/\bethereum\b|\beth\b/i.test(title)) return "Ethereum";
      if (/\bsolana\b|\bsol\b/i.test(title)) return "Solana";
      if (/\bxrp\b|\bripple\b/i.test(title)) return "XRP";
      if (/tether|usdt/i.test(title)) return "Tether";
      if (/zcash|\bzec\b/i.test(title)) return "Altcoin";

      if (normalizedType === "trending_news") {
        return "Trending News";
      }

      return isSearch ? "News" : config.label;
    }

    if (item?.category && String(item.category).toLowerCase().trim() !== "search") {
      return item.category;
    }
    return config.label === "Search" ? "News" : config.label;
  };

  useEffect(() => {
    let cancelled = false;

    if (isCombinedFeed) {
      // If we already have items from SSR, sync with trending atom if needed
      if (items.length > 0) {
        if (!trendingNewsAtom || trendingNewsAtom.length === 0) {
          setTrendingNewsAtom(items);
        }
        setLoading(false);
        return;
      }

      // Check atom first
      if (Array.isArray(trendingNewsAtom) && trendingNewsAtom.length > 0) {
        const filtered = filterAndSortArticles(trendingNewsAtom, allowedTypes);
        setItems(filtered);
        setLoading(false);
        return;
      }

      // Fetch trending news from API and filter
      setLoading(true);
      fetchWrapper
        .get(Apis.All_Content("trending_news"))
        .then((res) => {
          if (cancelled) return;
          const raw = Array.isArray(res?.data) ? res.data : [];
          setTrendingNewsAtom(raw);
          setItems(filterAndSortArticles(raw, allowedTypes));
        })
        .catch((err) => console.warn("Error fetching data:", err))
        .finally(() => !cancelled && setLoading(false));
      return () => {
        cancelled = true;
      };
    }

    // Category routes
    if (items.length > 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchWrapper
      .get(Apis.All_Content(config.type))
      .then((res) => !cancelled && setItems(Array.isArray(res?.data) ? res.data : []))
      .catch((err) => console.warn("Error fetching data:", err))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.type, isCombinedFeed]);

  useRestoreNewsScroll(items);

  const handleBack = () => {
    sessionStorage.setItem("restore_scroll_on_home", "true");
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const displayedItems = useMemo(() => {
    if (!isSearch || !searchQuery.trim()) {
      return items;
    }
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const title = (item?.title || "").toLowerCase();
      const type = (item?.type || "").toLowerCase().replace(/_/g, " ");
      const rawType = (item?.type || "").toLowerCase();
      const category = (item?.category || "").toLowerCase();
      const label = (typeLabel(item) || "").toLowerCase();
      return (
        title.includes(q) ||
        type.includes(q) ||
        rawType.includes(q) ||
        category.includes(q) ||
        label.includes(q)
      );
    });
  }, [items, isSearch, searchQuery]);

  const featured = displayedItems[0];
  const featuredAuthor = getAuthorInfo(featured, 0);
  const topItems = displayedItems.slice(1, 5);
  const remainingItems = displayedItems.slice(5);
  const headingText = customHeading || (isAllAnalysis ? "All Analysis" : isAllNews ? "All News" : config.heading);

  return (
    <div>
      <BackButton onClick={handleBack} className="top-[105px]" />
      <LoadingOverlay open={loading || profileLoading} />

      <div className="relative z-[1] mt-14 sm:mt-16">
        <CryptoTickerMarquee />
      </div>

      <Container className="mt-10">
        <div className="flex flex-col gap-8 md:flex-row md:gap-0">
          {/* Featured item (sticky on desktop) */}
          <div className="relative flex flex-1 flex-col self-start md:sticky md:top-0 md:pr-8">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h4 className="m-0 font-bold text-black dark:text-white">{headingText}</h4>
              {isSearch && (
                <div className="relative w-full sm:w-64 md:w-80">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or type..."
                    className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2 pl-9 pr-8 text-sm text-black placeholder:text-gray-400 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-[#1c1c1f] dark:text-white dark:placeholder:text-white/40"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
                      aria-label="Clear search"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {displayedItems.length === 0 && !loading ? (
              <div className="my-6 rounded-2xl border border-dashed border-gray-200 p-8 text-center dark:border-white/10">
                <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                  No articles found matching &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                  Try searching by another title or crypto type (e.g. Bitcoin, Market, News).
                </p>
              </div>
            ) : (
              featured && (
                <div id={featured?.id ? `news-card-${featured.id}` : undefined} className="mb-6 overflow-hidden rounded-[18px]">
                  <div className="flex cursor-pointer items-center justify-center" onClick={() => openBlog(featured)}>
                    <NewsMedia item={featured} height={featured.media_type === "youtube-link" ? 400 : undefined} />
                  </div>

                  {featuredAuthor.hasProfile && <ProfileBadge author={featuredAuthor} size={64} onProfileClick={openProfile} />}

                  <div className="cursor-pointer py-4 pr-4" onClick={() => openBlog(featured)}>
                    <h4 className="mb-[0.35em] font-bold text-black dark:text-white">{featured?.title || "Latest Crypto Title"}</h4>
                    <p className="text-gray-500!">{featured?.created_at ? `${typeLabel(featured)} · ${formatNewsDate(featured.created_at)}` : typeLabel(featured)}</p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Next four items */}
          {topItems.length > 0 && (
            <div className="w-full overflow-y-auto pr-2 md:mt-[55px] md:max-h-[37vh] md:w-[290px] lg:max-h-[80vh] [&::-webkit-scrollbar]:w-[7px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[#E5E7EB] [&::-webkit-scrollbar-thumb]:bg-[#969696] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-[#E5E7EB]">
              {topItems.map((item, index) => {
                const author = getAuthorInfo(item, index + 1);
                return (
                  <div
                    key={item.id || index}
                    id={`news-card-${item.id}`}
                    onClick={() => openBlog(item)}
                    className="mb-4 cursor-pointer overflow-hidden rounded-2xl border border-[#e2e2e2] bg-white text-black/87 shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)]"
                  >
                    <NewsMedia item={item} height={150} rounded="rounded-none" />
                    {author.hasProfile && <ProfileBadge author={author} size={48} onProfileClick={openProfile} />}
                    <div className="px-4 pb-4">
                      <h6 className="line-clamp-3 font-semibold">{item.title || "Untitled"}</h6>
                      <p className="mt-1 text-black/60!">
                        {typeLabel(item)} · {formatNewsDate(item.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Everything else */}
        {remainingItems.length > 0 && (
          <div id="news-bottom-cards-section" className="mt-6 bg-white pb-4 dark:bg-n1">
            <Container>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {remainingItems.map((item, index) => {
                  const author = getAuthorInfo(item, index + 5);
                  return (
                    <div
                      key={item.id || index}
                      id={`news-card-${item.id}`}
                      onClick={() => openBlog(item)}
                      className="relative h-[370px] cursor-pointer overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#ffffff00_49%,#ffffff_0%)] shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)] transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                    >
                      <NewsMedia item={item} height={200} rounded="rounded-xl" />
                      {author.hasProfile && <ProfileBadge author={author} size={48} onProfileClick={openProfile} />}
                      <div className="px-4 pb-4">
                        <h6 className="mb-2 line-clamp-2 font-semibold text-black">{item.title || "Untitled"}</h6>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-black/90!">{typeLabel(item)}</p>
                          <span className="size-1 rounded-full bg-black/60" />
                          <p className="text-black/70!">{formatNewsDate(item.created_at)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          </div>
        )}
      </Container>

      <ScrollToTopButton />
    </div>
  );
}
