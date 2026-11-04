"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Apis, RoutesName } from "@/_common/app.constants";
import { useFetchWrapper } from "@/_helpers";
import { formatNewsDate } from "@/components/news/NewsParts";
import { blogPath, getBlogSlug, getMediaUrl, listFrom, rememberBlogId } from "@/lib/content";

const IMG = "/assets/images/coinchain-img";

// Tag chip colors (same as other sections)
const TAG_STYLES = {
  Market: { bg: "#FFF6D9", color: "#F7931A", border: "#FFE8A2" },
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
      <span className="inline-block max-w-[12ch] truncate whitespace-nowrap" title={item.author}>
        By {item.author}
      </span>
      <span className="h-4 w-px bg-[#353942]/25 dark:bg-white/20" />
      <span>{item.time}</span>
    </div>
  );
}

function formatArticleForCard(item, index = 0) {
  if (!item) return null;
  const id = item.id ?? index;
  const title = item.title || "Latest market update";
  const slug = getBlogSlug(item);
  const href = blogPath(item, "market");
  const time = formatNewsDate(item.created_at || item.published_at);
  const author =
    item.profile?.profile_name?.trim() ||
    item.author?.trim() ||
    item.author_name?.trim() ||
    "TheCoinChain";
  const rawMedia = item.get_media_display || item.image || item.image_link;
  const mediaUrl = rawMedia ? getMediaUrl(rawMedia) : "";
  const fallbackImage = `${IMG}/Market-${(index % 3) + 1}.png`;

  return {
    id,
    tag: "Market",
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

/** Horizontal card: text left, image right (stacks on small screens) */
function SideCard({ item, onCardClick }) {
  return (
    <Link
      href={item.href}
      onClick={() => onCardClick?.(item)}
      id={item.id !== undefined && item.id !== null ? `market-card-${item.id}` : undefined}
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
          onError={(e) => {
            if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
              e.currentTarget.src = item.fallbackImage;
            }
          }}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    </Link>
  );
}

/** Big card: image top, text below */
function FeaturedCard({ item, onCardClick }) {
  return (
    <Link
      href={item.href}
      onClick={() => onCardClick?.(item)}
      id={item.id !== undefined && item.id !== null ? `market-card-${item.id}` : undefined}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-[#F7F8FA] no-underline transition-shadow hover:shadow-[0px_4px_14px_0px_#0000001A] dark:bg-[#1c1c1f]"
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden sm:h-[280px] md:h-[350px] lg:h-[400px] rounded-lg">
        <img
          src={item.image}
          alt={item.title}
          onError={(e) => {
            if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
              e.currentTarget.src = item.fallbackImage;
            }
          }}
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

export default function MarketNewsSection({
  news,
  initialItems = [],
  viewAllHref = "/market-news",
}) {
  const fetchWrapper = useFetchWrapper();
  const [marketItems, setMarketItems] = useState(() => {
    if (Array.isArray(initialItems) && initialItems.length > 0) {
      return initialItems;
    }
    if (Array.isArray(news) && news.length > 0) {
      return news;
    }
    return [];
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    if (Array.isArray(initialItems) && initialItems.length > 0) return;

    let cancelled = false;
    fetchWrapper
      .get(Apis.All_Content("market"))
      .then((res) => {
        if (cancelled) return;
        const list = listFrom(res);
        setMarketItems(list);
      })
      .catch((err) => {
        console.warn("Failed to fetch market news:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchWrapper, initialItems]);

  const handleCardClick = (item) => {
    if (!item) return;
    sessionStorage.setItem("home_scroll_section", "market-news-section");
    if (item.id !== undefined && item.id !== null) {
      sessionStorage.setItem("home_scroll_card_id", String(item.id));
    }
    const targetSlug = item.slug || getBlogSlug(item.raw || item);
    rememberBlogId(targetSlug, item.id);
  };

  const sortedArticles = useMemo(() => {
    if (!Array.isArray(marketItems) || marketItems.length === 0) return [];

    const sorted = [...marketItems].sort((a, b) => {
      const timeA = a.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
      const timeB = b.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
      return timeB - timeA;
    });

    return sorted.map((art, idx) => formatArticleForCard(art, idx));
  }, [marketItems]);

  const featured = sortedArticles[0];
  const sideItems = sortedArticles.slice(1, 3);
  const currentViewAllHref = viewAllHref || RoutesName.Market_News || "/market-news";

  return (
    <section id="market-news-section" className="bg-white py-[35px] transition-colors sm:py-[40px] lg:py-[50px] dark:bg-[#141416]">
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

        {/* ---------- Content ---------- */}
        {featured ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Mobile: big card first. Desktop: small cards left, big card right */}
            <div className="order-2 grid gap-10 lg:order-1 lg:grid-rows-2">
              {sideItems.map((item) => (
                <SideCard key={item.id} item={item} onCardClick={handleCardClick} />
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <FeaturedCard item={featured} onCardClick={handleCardClick} />
            </div>
          </div>
        ) : (
          <p className="mt-10 text-center font-[Inter] text-[14px] text-[#667085]">No market news found.</p>
        )}
      </div>
    </section>
  );
}
