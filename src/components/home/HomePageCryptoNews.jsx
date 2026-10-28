"use client";

import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { RoutesName } from "@/_common/app.constants";
import { TrendingNewsAtom } from "@/_state";
import { Spinner } from "@/components/ui";
import { getBlogSlug, rememberBlogId, stripHtml } from "@/lib/content";

const pill = "rounded-lg bg-[#c5c5c5] p-1.5 text-xs font-medium text-[#0e0e0e] uppercase";

/** Hero headline: the newest trending article (loaded by the trending section). */
export default function HomePageCryptoNews() {
  const router = useRouter();
  const news = useAtomValue(TrendingNewsAtom)?.[0];

  if (!news) {
    return (
      <div className="flex min-h-[180px] w-full items-center justify-center md:min-h-[240px]">
        <Spinner />
      </div>
    );
  }

  const author = news.profile?.profile_name?.trim() || news.author?.trim() || news.author_name?.trim();
  const createdAt = typeof news.created_at === "string" ? news.created_at.replace(/Z$/i, "") : news.created_at;
  const date = createdAt && dayjs(createdAt).isValid() ? dayjs(createdAt).format("MMMM DD, YYYY hh:mm A") : "";

  const openNews = () => {
    if (!news.id) return;
    sessionStorage.setItem("home_scroll_position", String(window.scrollY));
    sessionStorage.setItem("home_scroll_section", "trending-news-section");
    sessionStorage.setItem("home_scroll_card_id", String(news.id));
    sessionStorage.setItem("restore_scroll_on_home", "true");
    const slug = getBlogSlug(news);
    rememberBlogId(slug, news.id);
    router.push(RoutesName.Blog_Detail.replace(":slug", slug));
  };

  return (
    <div>
      <h1
        onClick={openNews}
        className="mb-4 cursor-pointer font-display text-[28px]! leading-[1.15] font-bold text-n1 transition-colors duration-200 hover:text-primary md:text-[35px]! dark:text-white"
      >
        Crypto News: {news.title}
      </h1>
      <p className="mb-[15px] line-clamp-2 text-sm! leading-[1.6] text-[#0e0e0e]! sm:text-base! md:mb-6 dark:text-white!">{stripHtml(news.description)}</p>
      <div className="mb-8 flex flex-wrap items-center gap-4">
        {author && <span className={pill}>{author}</span>}
        {date && <span className={pill}>{date}</span>}
      </div>
    </div>
  );
}
