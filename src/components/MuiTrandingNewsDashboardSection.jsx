"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Apis, RoutesName } from "@/_common/app.constants";
import { useFetchWrapper } from "@/_helpers";
import { TrendingNewsAtom } from "@/_state";
import { getBlogSlug, listFrom, rememberBlogId } from "@/lib/content";

dayjs.extend(relativeTime);

const timeLabel = (item) => {
  const raw = item?.created_at || item?.published_at || item?.date;
  const parsed = raw && dayjs(typeof raw === "string" ? raw.replace(/Z$/i, "") : raw);
  if (!parsed?.isValid() || dayjs().diff(parsed) < 60000) return "Just now";
  const fromNow = parsed.fromNow();
  return fromNow.startsWith("in ") ? "Just now" : fromNow;
};

/** Auto-scrolling "Trending news" card in the home hero. */
export default function MuiTrandingNewsDashboardSection() {
  const router = useRouter();
  const fetchWrapper = useFetchWrapper();
  const [news, setNews] = useAtom(TrendingNewsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWrapper
      .get(Apis.All_Content("trending_news"))
      .then((res) => setNews(Array.isArray(res?.results) ? res.results : listFrom(res)))
      .catch((err) => {
        console.warn("Unable to fetch trending news:", err);
        setNews([]);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDetail = (item) => {
    if (item?.id === undefined || item?.id === null) return;
    sessionStorage.setItem("home_scroll_position", String(window.scrollY));
    sessionStorage.setItem("home_scroll_section", "trending-news-section");
    sessionStorage.setItem("restore_scroll_on_home", "true");
    const slug = getBlogSlug(item);
    rememberBlogId(slug, item.id);
    router.push(RoutesName.Blog_Detail.replace(":slug", slug));
  };

  // Duplicate the list once so the vertical ticker loops without a visible jump.
  const stories = news.slice(0, 5);
  const scrolling = stories.length > 1 ? [...stories, ...stories] : stories;

  return (
    <div className="relative isolate ml-auto w-full max-w-[550px] overflow-hidden rounded-3xl border border-[rgba(225,229,235,0.9)] bg-white/88 bg-[linear-gradient(125deg,rgba(255,255,255,.94),rgba(246,248,252,.8)),url(/assets/coin_img/TheCoinChainImage.png)] bg-cover bg-left px-6 py-5 shadow-[0_16px_38px_rgba(0,0,0,.07),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-[14px] sm:rounded-[28px] sm:bg-center sm:py-6 dark:border-[rgb(136_135_135/61%)] dark:bg-[#182235] dark:bg-[linear-gradient(125deg,rgb(10_10_10),rgb(48_47_47/54%)),url(/assets/coin_img/TheCoinChainImage.png)] dark:shadow-[0_16px_38px_rgba(0,0,0,.36),inset_0_1px_0_rgba(255,255,255,.24)]">
      <div className="flex items-center gap-2 pb-2.5">
        <h5 className="text-lg! leading-[1.1] font-bold tracking-[-.5px] text-n1 dark:text-white">Trending news</h5>
        <span className="rounded-full bg-[rgba(169,237,240,.92)] px-1.5 py-[3px] text-[10px] leading-none font-extrabold text-[#08777d]">LIVE</span>
      </div>

      <div className="group h-[385px] overflow-hidden py-2">
        {loading || stories.length === 0 ? (
          <p className="py-6 text-center text-sm! text-n4! dark:text-white/72!">
            {loading ? "Loading trending news…" : "No trending stories available right now."}
          </p>
        ) : (
          <div
            className={
              stories.length > 1
                ? "flex flex-col animate-ticker-up group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
                : "flex flex-col"
            }
          >
            {scrolling.map((item, index) => (
              <div
                key={`${item?.id ?? index}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => openDetail(item)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openDetail(item)}
                className="grid min-h-[58px] cursor-pointer grid-cols-[minmax(0,1fr)] items-center border-b border-black/8 p-2 transition-[background-color,transform] duration-200 hover:translate-x-[3px] hover:bg-black/4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5b39] sm:p-2.5 dark:border-white/22 dark:hover:bg-white/12"
              >
                <div className="flex w-full min-w-0 flex-col">
                  <p className="leading-[1.18] font-medium text-n1! dark:text-white!">{item?.title || "Latest crypto market update"}</p>
                  <span className="mt-1 block text-right text-[11px] leading-[1.2] font-medium whitespace-nowrap text-[#6f6f6f] dark:text-[#d5d5d5]">
                    {timeLabel(item)} | {item?.type?.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-5 text-center">
        <Link
          href={RoutesName.Trending_News}
          className="inline-flex min-w-[126px] justify-center rounded-full border border-black/25 px-[22px] py-1.5 text-sm font-semibold text-n1! no-underline transition-colors hover:border-primary hover:bg-primary/8 hover:text-primary! dark:border-[#106ef1] dark:text-white! dark:hover:bg-[rgba(16,110,241,.25)]"
        >
          Top stories
        </Link>
      </div>
    </div>
  );
}
