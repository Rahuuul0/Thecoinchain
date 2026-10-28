"use client";

import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Apis, RoutesName } from "@/_common/app.constants";
import { useFetchWrapper } from "@/_helpers";
import { formatNewsDate } from "@/components/news/NewsParts";
import { Button, cn, Container } from "@/components/ui";
import { getBlogSlug, getMediaUrl, getYouTubeVideoId, listFrom, rememberBlogId, slugify } from "@/lib/content";

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

const itemsFrom = (res) => (Array.isArray(res?.results) ? res.results : listFrom(res));

/** Loads one content type from the API. */
export function useContentList(type, { onLoaded } = {}) {
  const fetchWrapper = useFetchWrapper();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadContent = (retryCount = 0) => {
      fetchWrapper
        .get(Apis.All_Content(type))
        .then((res) => {
          if (cancelled) return;
          const list = itemsFrom(res);
          setItems(list);
          onLoaded?.(list);
          setLoading(false);
        })
        .catch((err) => {
          if (cancelled) return;
          if (retryCount < 1) {
            setTimeout(() => {
              if (!cancelled) loadContent(retryCount + 1);
            }, 1500);
            return;
          }
          console.warn(`Unable to fetch ${type}:`, err);
          setItems([]);
          setLoading(false);
        });
    };

    loadContent();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return [items, loading];
}

/** Navigation helpers that remember where on the home page the reader was. */
export function useHomeNavigation(sectionId) {
  const router = useRouter();

  const rememberSection = () => {
    sessionStorage.setItem("home_scroll_position", String(window.scrollY));
    sessionStorage.setItem("home_scroll_section", sectionId);
    sessionStorage.setItem("restore_scroll_on_home", "true");
  };

  return {
    openBlog(item) {
      if (item?.id === undefined || item?.id === null) return;
      rememberSection();
      const slug = getBlogSlug(item);
      rememberBlogId(slug, item.id);
      router.push(RoutesName.Blog_Detail.replace(":slug", slug));
    },
    openProfile(name, profileId) {
      if (!name && !profileId) return;
      const nameSlug = slugify(name) || String(profileId);
      if (profileId) {
        sessionStorage.setItem(`profile_id_${nameSlug}`, String(profileId));
        localStorage.setItem(`profile_id_${nameSlug}`, String(profileId));
      }
      router.push(RoutesName.Profile_Detail.replace(":name", nameSlug));
    },
    openList(href) {
      sessionStorage.removeItem("restore_scroll_on_news");
      sessionStorage.removeItem("crypto_news_card_id");
      sessionStorage.removeItem("crypto_news_scroll_y");
      rememberSection();
      router.push(href);
    },
  };
}

const authorOf = (item) => ({
  name: (item?.profile || item)?.profile_name?.trim() || item?.author?.trim() || item?.author_name?.trim() || "",
  profileId: (item?.profile || item)?.profile_id || item?.profile_id,
});

/** "Author | 3 hours ago" line shown on news cards. */
function AuthorTimeRow({ item, onProfile, wrapOnMobile, className, nameClassName = "text-[#444444]", mutedClassName = "text-[#808080]" }) {
  const { name, profileId } = authorOf(item);
  const time = formatNewsDate(item?.created_at);
  if (!name && !time) return null;

  return (
    <div
      className={cn(
        "flex w-full items-center gap-1 overflow-hidden text-[10.5px] leading-[1.2] whitespace-nowrap sm:text-[11px]",
        wrapOnMobile ? "flex-wrap sm:flex-nowrap" : "flex-nowrap",
        mutedClassName,
        className
      )}
    >
      {name && (
        <>
          <span
            title={name}
            onClick={(e) => {
              e.stopPropagation();
              onProfile(name, profileId);
            }}
            className={cn("inline-block min-w-0 shrink truncate font-semibold", nameClassName, profileId && "cursor-pointer hover:text-primary")}
          >
            {name}
          </span>
          {time && <span className={cn("shrink-0 opacity-60", wrapOnMobile && "hidden sm:block")}>|</span>}
        </>
      )}
      {time && <span className="shrink-0 whitespace-nowrap">{time}</span>}
    </div>
  );
}

/** Media box for cards: uploaded video, YouTube embed, or image. */
function CardMedia({ item, placeholder, className, imgClassName }) {
  const mediaUrl = getMediaUrl(item?.get_media_display);
  const mediaType = String(item?.media_type || "").toLowerCase();
  const youtubeId = ["youtube", "youtube-link", "youtube_link"].includes(mediaType) ? getYouTubeVideoId(item?.get_media_display) : null;
  const stop = (e) => e.stopPropagation();

  return (
    <div className={cn("overflow-hidden bg-[#f3f3f3]", className)}>
      {["video", "video-file", "video_file"].includes(mediaType) ? (
        <video src={mediaUrl} controls preload="metadata" onClick={stop} className="block size-full object-cover" />
      ) : youtubeId ? (
        <div onClick={stop} className="size-full [&_iframe]:block [&_iframe]:size-full [&>div]:size-full">
          <YouTube videoId={youtubeId} opts={{ width: "100%", height: "100%", playerVars: { rel: 0 } }} className="size-full" />
        </div>
      ) : (
        <img
          src={mediaUrl || placeholder}
          alt={item?.title || "News"}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholder;
          }}
          className={cn("block size-full object-cover transition-transform duration-300", imgClassName)}
        />
      )}
    </div>
  );
}

function SectionHeading({ title, action }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h5 className="font-semibold text-black dark:text-white">{title}</h5>
      {action}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card grid (Latest News, Press Releases, Global News)                */
/* ------------------------------------------------------------------ */

const GRID_VARIANTS = {
  large: {
    grid: "grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3",
    card: "rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 hover:shadow-[0_16px_30px_rgba(0,0,0,0.14)]",
    media: "h-[175px] md:h-[190px]",
    body: "p-5",
    title: "leading-[1.35]",
  },
  compact: {
    grid: "grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4",
    card: "flex flex-col rounded-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:-translate-y-[5px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.13)]",
    media: "h-[90px] sm:h-[130px] md:h-[150px]",
    body: "flex min-h-[107px] flex-col justify-between p-3 sm:min-h-[90px]",
    title: "line-clamp-2 leading-[1.3]",
  },
};

export function NewsCardGrid({ id, title, type, limit, viewAllHref, viewAllAfter, variant = "large", placeholder, loadingText, emptyText, onLoaded }) {
  const [news, loading] = useContentList(type, { onLoaded });
  const nav = useHomeNavigation(id);
  const v = GRID_VARIANTS[variant];

  return (
    <Container id={id} maxWidth="xl" className="px-4 py-12 md:px-8">
      <SectionHeading
        title={title}
        action={
          news.length > viewAllAfter && (
            <Button variant="outlined" className="h-[50px] px-[15px] py-[9px]" onClick={() => nav.openList(viewAllHref)}>
              View All
            </Button>
          )
        }
      />

      {loading || news.length === 0 ? (
        <p className="text-[#321B6D]!">{loading ? loadingText : emptyText}</p>
      ) : (
        <div className={cn("grid", v.grid)}>
          {news.slice(0, limit).map((item) => (
            <div
              key={item?.id}
              onClick={() => nav.openBlog(item)}
              className={cn(
                "group h-full cursor-pointer overflow-hidden border border-[#ececec] bg-white transition-[transform,box-shadow,border-color] duration-300 hover:border-[#e0e0e0]",
                v.card
              )}
            >
              <CardMedia item={item} placeholder={placeholder} className={v.media} imgClassName="group-hover:scale-[1.06]" />
              <div className={v.body}>
                <AuthorTimeRow item={item} onProfile={nav.openProfile} wrapOnMobile={variant === "compact"} className={variant === "compact" ? "mb-1.5" : "mb-2"} />
                <p
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && nav.openBlog(item)}
                  className={cn("font-semibold text-black! transition-colors group-hover:text-primary!", v.title)}
                >
                  {item?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

/* ------------------------------------------------------------------ */
/* Markets / Finance / Policy / Tech panels                            */
/* ------------------------------------------------------------------ */

const BUSINESS_CATEGORIES = [
  { type: "market", label: "Markets", href: RoutesName.Market_News },
  { type: "finance", label: "Finance", href: RoutesName.Finance },
  { type: "policy", label: "Policy", href: RoutesName.policy },
  { type: "tech", label: "Tech", href: RoutesName.tech },
];

export function BusinessNewsPanels() {
  const fetchWrapper = useFetchWrapper();
  const nav = useHomeNavigation("business-news-section");
  const [byType, setByType] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      BUSINESS_CATEGORIES.map(({ type }) =>
        fetchWrapper
          .get(Apis.All_Content(type))
          .then((res) => [type, itemsFrom(res)])
          .catch(() => [type, []])
      )
    )
      .then((entries) => setByType(Object.fromEntries(entries)))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasAny = Object.values(byType).some((list) => list.length > 0);
  const muted = "text-[#808080] dark:text-[#b0b0b0]";

  return (
    <Container id="business-news-section" maxWidth="xl" className="px-4 py-12 md:px-8">
      {loading || !hasAny ? (
        <p className="text-primary!">{loading ? "Loading latest news..." : "No latest news is available right now."}</p>
      ) : (
        <div className="grid grid-cols-1 border border-[#e6e6e6] md:grid-cols-2 dark:border-[#333]">
          {BUSINESS_CATEGORIES.map((category, index) => {
            const [featured, ...rest] = byType[category.type] || [];
            const secondary = rest.slice(0, 3);
            return (
              <div
                key={category.type}
                className={cn(
                  "border-b border-[#e6e6e6] bg-white p-5 md:p-7 dark:border-[#333] dark:bg-[#1c1c1c]",
                  index % 2 === 0 && "md:border-r",
                  index >= BUSINESS_CATEGORIES.length - 2 && "md:border-b-0"
                )}
              >
                <button type="button" onClick={() => nav.openList(category.href)} className="group mb-5 flex w-fit items-center gap-1 text-black dark:text-white">
                  <p className="leading-[1.2] font-bold text-inherit!">{category.label}</p>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-[3px]" />
                </button>

                {!featured ? (
                  <p className={muted}>No {category.label.toLowerCase()} news right now.</p>
                ) : (
                  <div className="grid grid-cols-[5fr_7fr] gap-5">
                    <div>
                      <div onClick={() => nav.openBlog(featured)} className="h-[95px] w-full cursor-pointer overflow-hidden rounded-2xl sm:h-[150px] md:h-[175px]">
                        <CardMedia item={featured} placeholder="https://via.placeholder.com/400x300?text=News" className="size-full bg-[#f0f0f0]" />
                      </div>
                      <div className="mt-3">
                        <p onClick={() => nav.openBlog(featured)} className="cursor-pointer leading-[1.3] font-medium text-black! hover:text-primary! dark:text-white!">
                          {featured.title}
                        </p>
                        <AuthorTimeRow item={featured} onProfile={nav.openProfile} className="mt-1.5" nameClassName="text-black dark:text-white" mutedClassName={muted} />
                      </div>
                    </div>
                    {secondary.length > 0 && (
                      <div>
                        {secondary.map((item, i) => (
                          <div key={item?.id ?? i} className="py-2">
                            <p onClick={() => nav.openBlog(item)} className="cursor-pointer leading-[1.35] font-semibold text-black! hover:text-primary! dark:text-white!">
                              {item.title}
                            </p>
                            <AuthorTimeRow item={item} onProfile={nav.openProfile} className="mt-1" nameClassName="text-black dark:text-white" mutedClassName={muted} />
                            {i < secondary.length - 1 && <hr className="mt-2.5 border-[#e6e6e6] dark:border-[#333]" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}

/* ------------------------------------------------------------------ */
/* Price prediction timeline                                           */
/* ------------------------------------------------------------------ */

export function PricePredictionTimeline() {
  const [news, loading] = useContentList("price_prediction");
  const nav = useHomeNavigation("price-prediction-section");

  return (
    <div className="relative mx-auto overflow-hidden rounded-[18px] border border-[#ececec] bg-[url(/assets/images/Gemini_Generated_Image_56r3p656r3p656r3.png)] bg-cover bg-center bg-no-repeat shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:max-w-[550px] md:mr-0 md:ml-auto dark:border-[#2b2b30]">
      <div className="absolute inset-0 bg-white/90 dark:bg-[rgba(27,27,31,0.85)]" />

      <div className="relative">
        <div className="overflow-hidden bg-[linear-gradient(90deg,rgb(24,34,53)_0%,rgb(19_55_94)_51%)] py-3 whitespace-nowrap dark:bg-[linear-gradient(90deg,rgb(0_72_100)_0%,rgb(19_55_94)_51%)]">
          <div className="inline-flex items-center [--marquee-duration:14s] animate-marquee motion-reduce:animate-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="inline-flex items-center px-3 text-[13px] font-bold tracking-[0.6px] text-white">
                PRICE PREDICTION NEWS <span className="mx-2.5">•</span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-h-[430px] overflow-y-auto px-5 py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-[#cfcfcf] dark:[&::-webkit-scrollbar-thumb]:bg-[#555]">
          {loading || news.length === 0 ? (
            <p className="py-6 text-[#808080]!">{loading ? "Loading price prediction news..." : "No price prediction news is available right now."}</p>
          ) : (
            news.map((item, index) => (
              <div key={item?.id ?? index} onClick={() => nav.openBlog(item)} className="relative flex cursor-pointer gap-4 py-[18px]">
                <div className="relative flex w-3 shrink-0 justify-center">
                  <span className={cn("absolute top-0 w-0.5 bg-[#ADADAD] dark:bg-[#4a4a50]", index === news.length - 1 ? "bottom-1/2" : "-bottom-[110px]")} />
                  <span className="z-[1] mt-3.5 size-[9px] rotate-45 rounded-[2px] bg-[#2F6FED]" />
                </div>

                <div className="min-w-0 flex-1">
                  {item?.category && (
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="inline-flex h-[22px] items-center rounded-full bg-[#f1f1f1] px-2 text-xs font-medium text-[#333] dark:bg-[#2a2a2f] dark:text-[#ddd]">
                        {item.category}
                      </span>
                    </div>
                  )}
                  <p className="mb-1.5 line-clamp-2 leading-[1.35] font-bold text-[#111]! dark:text-white!">{item?.title}</p>
                  {(item?.profile_name || item?.created_at) && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item?.profile_name && <p className="font-semibold whitespace-nowrap text-[#2F6FED]!">{item.profile_name}</p>}
                      {item?.profile_name && item?.created_at && <span className="text-[#888] dark:text-[#4a4a50]">|</span>}
                      {item?.created_at && (
                        <p className="whitespace-nowrap text-[#333]! dark:text-[#a0a0a5]!">{dayjs(item.created_at).format("MMM DD, YYYY HH:mm [UTC]")}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 text-center">
          <button
            type="button"
            onClick={() => nav.openList(RoutesName.Price_Prediction)}
            className="rounded-[10px] border border-[#2F6FED] px-5 py-1.5 text-sm font-semibold text-[#2F6FED] hover:bg-[rgba(47,111,237,0.06)]"
          >
            View all price prediction
          </button>
        </div>
      </div>
    </div>
  );
}
