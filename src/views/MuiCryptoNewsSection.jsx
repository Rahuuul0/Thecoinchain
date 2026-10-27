"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Apis } from "@/_common/app.constants";
import { useFetchWrapper } from "@/_helpers";
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

/** Puts the reader back where they were after returning from an article. */
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

export default function MuiCryptoNewsSection({ contentKey }) {
  const router = useRouter();
  const fetchWrapper = useFetchWrapper();
  const openBlog = useOpenBlog();
  const [openProfile, profileLoading] = useOpenProfile();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const config = contentConfigFor(contentKey);
  const isTrendingNews = contentKey === "trending-news";

  const typeLabel = (item) => (isTrendingNews && labelForType(item?.type)) || item?.category || config.label;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchWrapper
      .get(Apis.All_Content(config.type))
      .then((res) => !cancelled && setItems(Array.isArray(res?.data) ? res.data : []))
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.type]);

  useRestoreNewsScroll(items);

  const handleBack = () => {
    sessionStorage.setItem("restore_scroll_on_home", "true");
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const featured = items[0];
  const featuredAuthor = getAuthorInfo(featured, 0);
  const topItems = items.slice(1, 5);
  const remainingItems = items.slice(5);

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
            <h4 className="mb-[0.35em] font-bold text-black dark:text-white">{config.heading}</h4>

            <div id={featured?.id ? `news-card-${featured.id}` : undefined} className="mb-6 overflow-hidden rounded-[18px]">
              <div className="flex cursor-pointer items-center justify-center" onClick={() => openBlog(featured)}>
                {featured && <NewsMedia item={featured} height={featured.media_type === "youtube-link" ? 400 : undefined} />}
              </div>

              {featured && featuredAuthor.hasProfile && <ProfileBadge author={featuredAuthor} size={64} onProfileClick={openProfile} />}

              <div className="cursor-pointer py-4 pr-4" onClick={() => openBlog(featured)}>
                <h4 className="mb-[0.35em] font-bold text-black dark:text-white">{featured?.title || "Latest Crypto Title"}</h4>
                <p className="text-gray-500!">{featured?.created_at ? `${typeLabel(featured)} · ${formatNewsDate(featured.created_at)}` : typeLabel(featured)}</p>
              </div>
            </div>
          </div>

          {/* Next four items */}
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
