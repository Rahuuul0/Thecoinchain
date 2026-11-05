"use client";

import { ArrowRight, Loader2, Play, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSetAtom } from "jotai";
import { Apis, RoutesName } from "@/_common/app.constants";
import { useFetchWrapper } from "@/_helpers";
import { blogimgAtom, blogListAtom, blogVideoAtom, breadCrumbAtom } from "@/_state";
import { getMediaUrl, getYouTubeVideoId, listFrom, stripHtml } from "@/lib/content";

const IMG = "/assets/images/coinchain-img";
const LEARN_CRYPTO_IMAGE = `${IMG}/LearnCrypto.png`;

function LessonCard({ item, onPlay, onOpenDetail }) {
  const thumbnail =
    item.image_link ||
    (item.image ? getMediaUrl(item.image) : "") ||
    LEARN_CRYPTO_IMAGE;

  return (
    <div className="group flex flex-col gap-4">
      {/* Thumbnail + Direct Play trigger */}
      <div
        onClick={() => onPlay(item)}
        className="relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-lg bg-[#161B26]"
      >
        <img
          src={thumbnail}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== LEARN_CRYPTO_IMAGE) {
              e.currentTarget.src = LEARN_CRYPTO_IMAGE;
            }
          }}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Category tag */}
        {item.category && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded border border-[#FFE8A2] bg-[#FFF6D9] px-2 py-0.5 font-[Manrope] text-[11px] font-semibold text-[#F7931A]">
            {item.category}
          </span>
        )}

        {/* Play button */}
        <span
          className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-black/55 backdrop-blur-[2px] shadow-lg transition-transform duration-300 group-hover:scale-110 sm:size-12"
          aria-label={`Play ${item.title}`}
        >
          <Play className="size-4 translate-x-px fill-white text-white sm:size-[18px]" />
        </span>
      </div>

      <h3 className="m-0 line-clamp-2 font-[Manrope] text-[16px] md:text-[18px] font-medium leading-snug text-[#111318] transition-colors group-hover:text-[#B8860B] sm:text-[20px] dark:text-white">
        {item.title}
      </h3>
    </div>
  );
}

export default function LearnCryptoSection({
  items,
  initialItems = [],
  exploreHref = "/learn-cypto",
}) {
  const router = useRouter();
  const fetchWrapper = useFetchWrapper();
  const pathname = usePathname();

  const setBreadCrumb = useSetAtom(breadCrumbAtom);
  const setBlogImg = useSetAtom(blogListAtom);
  const setBlogNew = useSetAtom(blogimgAtom);
  const setBlogVideo = useSetAtom(blogVideoAtom);

  const [lessons, setLessons] = useState(() => {
    if (Array.isArray(initialItems) && initialItems.length > 0) {
      return initialItems;
    }
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
    return [];
  });
  const [activeVideo, setActiveVideo] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // Client-side fetch fallback if SSR data is not provided
  useEffect(() => {
    if (Array.isArray(initialItems) && initialItems.length > 0) return;

    let cancelled = false;
    fetchWrapper
      .get(Apis.Tutorial_Video)
      .then((res) => {
        if (cancelled) return;
        const list = listFrom(res);
        setLessons(list);
      })
      .catch((err) => {
        console.warn("Failed to fetch tutorial list:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchWrapper, initialItems]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setActiveVideo(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeVideo]);

  const handleOpenDetail = (item) => {
    if (!item) return;
    setBreadCrumb(item.category || "Video Tutorial");
    setBlogImg(item);
    setBlogNew(true);
    setBlogVideo(true);
    router.push(`${RoutesName.learn_Crypto_Details}/learncyptovideo/${item.slug || item.id}`);
  };

  const sortedLessons = useMemo(() => {
    if (!Array.isArray(lessons) || lessons.length === 0) return [];

    const sorted = [...lessons].sort((a, b) => {
      const timeA = a.created_at ? new Date(String(a.created_at).replace(/Z$/i, "")).getTime() : 0;
      const timeB = b.created_at ? new Date(String(b.created_at).replace(/Z$/i, "")).getTime() : 0;
      return timeB - timeA;
    });

    return sorted.slice(0, 6);
  }, [lessons]);

  const currentExploreHref = exploreHref || RoutesName.Learn_Cypto || "/learn-cypto";
  const activeVideoId = activeVideo ? getYouTubeVideoId(activeVideo.video_link) : null;

  return (
    <section id="learn-crypto-section" className="bg-[#F8F9FB] py-[35px] transition-colors sm:py-[40px] lg:py-[50px] dark:bg-[#141416]">
      <div className="mx-auto container px-3 md:px-0">
        {/* ---------- Heading ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="min-w-0 flex-1">
            <h2 className="m-0 font-[Manrope] text-[26px] font-extrabold leading-tight text-[#111318] sm:text-[32px] dark:text-white">
              Learn <span className="text-[#F7931A]">Crypto</span>
            </h2>
            <p className="mb-0 mt-3 max-w-[640px] font-[Inter] text-[14px] font-normal leading-normal text-[#667085] sm:text-[16px] dark:text-white/60">
              Simple guides, explainers and videos for every level.
            </p>
          </div>

          <Link
            href={currentExploreHref}
            onClick={() => setIsNavigating(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[linear-gradient(270deg,#D7AE42_0%,#F0D667_33%,#F0D667_65.7%,#D7AE42_100%)] px-4 py-2.5 font-[Manrope] text-[14px] font-semibold text-[#111318] no-underline transition-opacity hover:opacity-90 border border-transparent hover:border-[#010101] dark:hover:border-white"
          >
            Explore All
            {isNavigating ? (
              <Loader2 className="size-4 animate-spin text-[#111318]" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </Link>
        </div>

        {/* ---------- Cards: 1 / 2 / 3 columns ---------- */}
        {sortedLessons.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 min-[560px]:grid-cols-2 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-9">
            {sortedLessons.map((item) => (
              <LessonCard
                key={item.id}
                item={item}
                onPlay={(selected) => setActiveVideo(selected)}
                onOpenDetail={handleOpenDetail}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center font-[Inter] text-[14px] text-[#667085]">
            No tutorials found right now.
          </p>
        )}
      </div>

      {/* ---------- Direct Video Player Modal ---------- */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#141416] shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-2 pr-4">
                {activeVideo.category && (
                  <span className="shrink-0 rounded border border-[#FFE8A2] bg-[#FFF6D9] px-2 py-0.5 font-[Manrope] text-[11px] font-semibold text-[#F7931A]">
                    {activeVideo.category}
                  </span>
                )}
                <h3 className="truncate font-[Manrope] text-[15px] font-semibold text-white sm:text-[17px]">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              {activeVideoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full border-0"
                />
              ) : activeVideo.video_link ? (
                <video
                  src={activeVideo.video_link}
                  controls
                  autoPlay
                  className="size-full object-contain"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-white/60">
                  Video link not available.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#18181c] px-4 py-3 sm:px-6">
              <p className="m-0 line-clamp-1 flex-1 text-[13px] text-white/60">
                {stripHtml(activeVideo.description || "").slice(0, 120)}
              </p>
              <button
                type="button"
                onClick={() => {
                  handleOpenDetail(activeVideo);
                  setActiveVideo(null);
                }}
                className="inline-flex items-center gap-1.5 font-[Manrope] text-[13px] font-semibold text-[#F0D667] hover:underline"
              >
                Full Tutorial Details
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
