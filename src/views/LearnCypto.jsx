"use client";

import dayjs from "dayjs";
import { useAtomValue, useSetAtom } from "jotai";
import { BookOpen, CalendarDays, ChevronRight, Play, Search, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTutorialActions } from "@/_actions/tutorial.actions";
import { RoutesName } from "@/_common/app.constants";
import { blogimgAtom, blogListAtom, blogVideoAtom, breadCrumbAtom, loaderAtom, tutorialAtom } from "@/_state";
import { cn, Container, LoadingOverlay } from "@/components/ui";
import { stripHtml } from "@/lib/content";

const CATEGORY_TABS = ["All", "Blockchain", "Bitcoin", "Ethereum", "Altcoin", "Tutorial"];

// Shown until the API provides real durations.
const SAMPLE_DURATIONS = ["10:24", "12:45", "08:32", "09:18", "14:20", "11:05", "09:45", "08:10", "07:36"];

const getDuration = (item, index) => item?.duration || SAMPLE_DURATIONS[Math.abs((item?.id != null ? Number(item.id) : index) % SAMPLE_DURATIONS.length)];

const formatDate = (date) => {
  const parsed = date && dayjs(date);
  return parsed?.isValid() ? parsed.format("MMM D, YYYY") : "Jul 15, 2026";
};

const BADGE_COLORS = [
  ["bitcoin", "bg-[#F59E0B] text-black"],
  ["blockchain", "bg-[#2563EB] text-white"],
  ["ethereum", "bg-[#8B5CF6] text-white"],
  ["altcoin", "bg-[#10B981] text-white"],
  ["tutorial", "bg-[#EF4444] text-white"],
];
const badgeColor = (category = "") => BADGE_COLORS.find(([key]) => category.toLowerCase().includes(key))?.[1] || "bg-primary text-white";

const matchesCategory = (item, selected) => {
  if (selected === "All") return true;
  const cat = (item.category || "").trim().toLowerCase();
  const sel = selected.toLowerCase();
  if (sel === "tutorial" || sel === "altcoin") return cat.startsWith(sel);
  return cat.includes(sel) || sel.includes(cat);
};

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-6 text-white/90" />
      <div>
        <p className="leading-[1.2] font-bold text-white!">{value}</p>
        <p className="text-white/60!">{label}</p>
      </div>
    </div>
  );
}

function FeaturedVideo({ video, index, onOpen, onSelect, onNext }) {
  return (
    <div className="ml-auto w-full md:max-w-[520px]">
      <div
        onClick={() => onOpen(video)}
        className="group relative aspect-[16/9.5] w-full cursor-pointer overflow-hidden rounded-[18px] border border-white/12 bg-[#161B26] shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
      >
        {video?.image_link && (
          <img
            src={video.image_link}
            alt={video.title || "Featured video"}
            className="block size-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.4)_100%)]" />
        <span className="absolute top-4 left-4 z-[2] rounded-[20px] bg-[#F59E0B] px-3 py-[3px] text-[11px] font-extrabold tracking-[0.5px] text-black uppercase">
          {video?.category?.toUpperCase() || "BITCOIN"}
        </span>
        <span className="absolute top-1/2 left-1/2 z-[2] flex size-[58px] -translate-1/2 items-center justify-center rounded-full border border-white/40 bg-white/22 backdrop-blur-[6px] transition-all duration-200 group-hover:scale-110 group-hover:bg-white/35">
          <Play className="size-8 fill-white text-white" />
        </span>
        <p className="absolute right-20 bottom-4 left-4 z-[2] line-clamp-2 leading-[1.3] font-bold text-white!">
          {video?.title || "What is Bitcoin? Complete Guide for Beginners"}
        </p>
        <span className="absolute right-4 bottom-4 z-[2] rounded-md bg-black/75 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-[4px]">{getDuration(video, 0)}</span>
      </div>

      <div className="mt-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              type="button"
              aria-label={`Featured video ${dot + 1}`}
              onClick={() => onSelect(dot)}
              className={cn("h-2 rounded transition-all duration-300", index % 4 === dot ? "w-6 bg-primary" : "w-2 bg-white/35")}
            />
          ))}
        </div>
        <button type="button" onClick={onNext} aria-label="Next featured video" className="flex size-[34px] items-center justify-center rounded-full bg-white text-black hover:bg-gray-100">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

function VideoCard({ item, index, onOpen }) {
  return (
    <div
      onClick={() => onOpen(item)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[18px] border border-n6 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] dark:border-white/8 dark:bg-[#1A1D24] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] dark:hover:border-[rgba(55,114,255,0.5)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#11141B]">
        <img src={item.image_link} alt={item.title || "Video thumbnail"} className="block size-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <span className={cn("absolute top-3.5 left-3.5 z-[2] rounded-[20px] px-3 py-[3px] text-[11px] font-extrabold tracking-[0.5px] uppercase shadow-[0_2px_8px_rgba(0,0,0,0.25)]", badgeColor(item.category))}>
          {item.category || "TUTORIAL"}
        </span>
        <span className="absolute top-1/2 left-1/2 z-[2] flex size-[46px] -translate-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur-[4px] transition-all duration-200 group-hover:scale-110 group-hover:bg-[rgba(55,114,255,0.85)]">
          <Play className="size-6 fill-white text-white" />
        </span>
        <span className="absolute right-3 bottom-3 z-[2] rounded-md bg-black/75 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-[4px]">{getDuration(item, index)}</span>
      </div>

      <div className="flex grow flex-col p-5">
        <h3 className="mb-2 line-clamp-2 min-h-11 text-base! leading-[1.4] font-bold text-n1 dark:text-white">{item.title}</h3>
        <p className="mb-[18px] line-clamp-2 min-h-10 grow leading-[1.5] text-n4! dark:text-[#8E92A4]!">{stripHtml(item.description)}</p>
        <div className="flex items-center gap-1.5 border-t border-n7 pt-3 text-[#858584] dark:border-white/6 dark:text-n4">
          <CalendarDays className="size-3.5" />
          <p className="font-medium text-inherit!">{formatDate(item.created_at)}</p>
        </div>
      </div>
    </div>
  );
}

export default function LearnCypto() {
  const router = useRouter();
  const tutorialAction = useTutorialActions();
  const tutorials = useAtomValue(tutorialAtom);
  const loader = useAtomValue(loaderAtom);
  const setBlogImg = useSetAtom(blogListAtom);
  const setBlogNew = useSetAtom(blogimgAtom);
  const setBlogVideo = useSetAtom(blogVideoAtom);
  const setBreadCrumb = useSetAtom(breadCrumbAtom);

  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    tutorialAction.tutorialData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openVideo = (item) => {
    if (!item) return;
    setBreadCrumb(item.category || "Video Tutorial");
    setBlogImg(item);
    setBlogNew(true);
    setBlogVideo(true);
    router.push(`${RoutesName.learn_Crypto_Details}/learncyptovideo/${item.slug || item.id}`);
  };

  // Newest first when dates are present; otherwise keep API order.
  const sorted = useMemo(
    () =>
      [...(tutorials || [])].sort((a, b) => {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return ta && tb && ta !== tb ? tb - ta : 0;
      }),
    [tutorials]
  );

  const featured = sorted.length ? sorted[featuredIndex % sorted.length] : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter(
      (item) => matchesCategory(item, category) && (!q || (item.title || "").toLowerCase().includes(q) || (item.description || "").toLowerCase().includes(q))
    );
  }, [sorted, category, query]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-n8 pt-[120px] pb-20 text-n2 transition-colors sm:pt-[136px] md:pt-[152px] md:pb-28 dark:bg-n1 dark:text-n8">
      <LoadingOverlay open={loader} />

      <Container>
        {/* Featured video hero */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/8 bg-[linear-gradient(135deg,#090D16_0%,#101726_50%,#161F33_100%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-8 md:mb-16 md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
            <div>
              <span className="mb-[18px] inline-block rounded-[20px] bg-[#F59E0B] px-3 py-1 text-[11px] font-extrabold tracking-[0.5px] text-black uppercase">FEATURED VIDEO</span>
              <h1 className="mb-4 leading-[1.15] tracking-[-0.5px] text-white">
                Learn <span className="text-[#FFC107]">Crypto</span>
              </h1>
              <p className="mb-7 max-w-[480px] leading-[1.6] text-white/75!">
                Explore blockchain, Bitcoin, Ethereum and crypto tutorials with easy explanations, expert insights and real-world examples.
              </p>
              <div className="mb-8 flex flex-wrap items-center gap-4 sm:gap-6">
                <Stat icon={BookOpen} value="100+" label="Educational Videos" />
                <Stat icon={Users} value="Expert" label="Insights" />
                <Stat icon={TrendingUp} value="Beginner to Advanced" label="Learning" />
              </div>
              <button
                type="button"
                onClick={() => openVideo(featured)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[14.5px] font-bold text-black capitalize shadow-[0_4px_15px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-px hover:bg-gray-100"
              >
                <Play className="size-5 fill-black" />
                Watch Now
                <ChevronRight className="size-5" />
              </button>
            </div>
            <FeaturedVideo
              video={featured}
              index={featuredIndex}
              onOpen={openVideo}
              onSelect={setFeaturedIndex}
              onNext={(e) => {
                e.stopPropagation();
                if (sorted.length) setFeaturedIndex((i) => (i + 1) % Math.min(sorted.length, 4));
              }}
            />
          </div>
        </div>

        {/* Tutorials */}
        <div className="mb-8">
          <h2 className="mb-2 tracking-[-0.5px] text-n1 dark:text-white">
            Video <span className="text-primary">Tutorials</span>
          </h2>
          <p className="mb-8 text-n4! dark:text-n5!">Learn about blockchain, Bitcoin, Ethereum, altcoins and more with easy-to-follow video guides.</p>

          <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
            <div className="flex max-w-full items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none sm:pb-0 md:max-w-[calc(100%-300px)]">
              {CATEGORY_TABS.map((tab) => {
                const active = category === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setCategory(tab);
                      setVisibleCount(6);
                    }}
                    className={cn(
                      "rounded-[30px] px-[18px] py-2 text-sm whitespace-nowrap transition-colors sm:px-[22px]",
                      active
                        ? "bg-primary font-semibold text-white hover:bg-[#255CE0]"
                        : "bg-n7 font-medium text-n4 hover:bg-n6 hover:text-n1 dark:bg-n2 dark:text-n5 dark:hover:bg-n3 dark:hover:text-white"
                    )}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <label className="flex h-[42px] w-full items-center rounded-[30px] border border-n6 bg-white px-3.5 text-sm text-n1 focus-within:border-primary hover:border-n5 sm:w-[280px] dark:border-white/12 dark:bg-n2 dark:text-white dark:hover:border-white/25">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(6);
                }}
                placeholder="Search videos..."
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#9AA0A6] dark:placeholder:text-n4"
              />
              <Search className="size-5 text-n5 dark:text-n4" />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
            {visible.map((item, index) => (
              <VideoCard key={item.id || index} item={item} index={index} onOpen={openVideo} />
            ))}
          </div>

          {visible.length === 0 && (
            <div className="rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] px-6 py-16 text-center dark:border-white/12 dark:bg-[#1A1D24]">
              <h4 className="mb-2 text-lg! font-semibold text-n1 dark:text-white">No videos found</h4>
              <p className="mb-6 text-n4! dark:text-[#8E92A4]!">We couldn&apos;t find any videos matching your category or search query.</p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
                className="rounded-[30px] border border-primary px-4 py-1.5 text-sm text-primary capitalize hover:border-[#255CE0] hover:bg-primary/8"
              >
                Reset Filters
              </button>
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="mt-12 mb-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + 6)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-9 py-2.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(55,114,255,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#255CE0] hover:shadow-[0_12px_24px_rgba(55,114,255,0.4)]"
              >
                More Videos
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
