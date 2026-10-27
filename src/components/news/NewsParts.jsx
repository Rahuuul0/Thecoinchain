"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { allContentActions } from "@/_actions/allcontent.actions";
import { RoutesName } from "@/_common/app.constants";
import { cn, Tooltip } from "@/components/ui";
import { getMediaUrl, getYouTubeVideoId, rememberBlogId, getBlogSlug, slugify } from "@/lib/content";

dayjs.extend(relativeTime);

// Fallbacks used until the backend sends author info for every item.
const STATIC_PROFILE_NAMES = ["Alice Brown", "Bob Smith", "Chris Johnson", "Diana Miller", "Ethan Davis", "Fiona Wilson"];
const STATIC_PROFILE_AVATARS = [1, 2, 3, 4, 5, 6].map((n) => `https://i.pravatar.cc/150?img=${n}`);

/** "Just now" / "3 hours ago" within a day, otherwise an absolute date. */
export function formatNewsDate(date) {
  if (!date) return "Just now";
  const parsed = dayjs(typeof date === "string" ? date.replace(/Z$/i, "") : date);
  if (!parsed.isValid()) return "Just now";
  if (dayjs().diff(parsed) < 60000) return "Just now";
  const hours = dayjs().diff(parsed, "hour");
  if (hours >= 0 && hours < 24) {
    const fromNow = parsed.fromNow();
    return fromNow.startsWith("in ") ? "Just now" : fromNow;
  }
  return parsed.format("MMM DD, YYYY HH:mm");
}

export function getAuthorInfo(item, fallbackIndex = 0) {
  const profile = item?.profile || item;
  const name = profile?.profile_name?.trim() || "";
  const image = profile?.profile_image;
  let avatarUrl = image && image.trim() && !image.includes("/HEADER") ? getMediaUrl(image) : "";
  const hasProfile = !!(name || avatarUrl);
  if (!avatarUrl) avatarUrl = STATIC_PROFILE_AVATARS[fallbackIndex % STATIC_PROFILE_AVATARS.length];

  return {
    name: name || STATIC_PROFILE_NAMES[fallbackIndex % STATIC_PROFILE_NAMES.length],
    avatarUrl,
    hasProfile,
    profileId: profile?.profile_id,
  };
}

/** Navigates to an article, remembering list scroll position for "Back". */
export function useOpenBlog() {
  const router = useRouter();
  return (item) => {
    if (!item) return;
    sessionStorage.setItem("crypto_news_scroll_y", String(window.scrollY));
    if (item.id !== undefined && item.id !== null) sessionStorage.setItem("crypto_news_card_id", String(item.id));
    const slug = getBlogSlug(item);
    rememberBlogId(slug, item.id);
    router.push(RoutesName.Blog_Detail.replace(":slug", slug));
  };
}

/** Opens a journalist profile, resolving the name from the API when only an id is known. */
export function useOpenProfile() {
  const router = useRouter();
  const { getProfileDetail } = allContentActions();
  const [loading, setLoading] = useState(false);

  const openProfile = async (profileId, profileName) => {
    if (!profileId && !profileName) return;
    try {
      let name = profileName;
      if (!name && profileId) {
        setLoading(true);
        const response = await getProfileDetail(profileId);
        const profile = response?.data || response;
        if (profile) {
          name = profile.profile_name || profile.name || "";
          sessionStorage.setItem("profileDetail", JSON.stringify(profile));
        }
      }
      const nameSlug = slugify(name || "") || String(profileId);
      if (profileId) {
        sessionStorage.setItem(`profile_id_${nameSlug}`, String(profileId));
        localStorage.setItem(`profile_id_${nameSlug}`, String(profileId));
      }
      router.push(RoutesName.Profile_Detail.replace(":name", nameSlug));
    } catch (err) {
      console.error("Error fetching profile detail:", err);
    } finally {
      setLoading(false);
    }
  };

  return [openProfile, loading];
}

/** Avatar + name that overlaps the bottom edge of a card's media. */
export function ProfileBadge({ author, size = 56, onProfileClick }) {
  const clickable = !!author.profileId;
  return (
    <div
      className={cn("relative z-[2] mb-3 ml-4 flex items-end gap-3", clickable ? "cursor-pointer" : "cursor-default")}
      style={{ marginTop: -size / 2 }}
      onClick={(e) => {
        e.stopPropagation();
        if (clickable) onProfileClick?.(author.profileId, author.name);
      }}
    >
      <img
        src={author.avatarUrl}
        alt={author.name}
        style={{ width: size, height: size }}
        className={cn(
          "shrink-0 rounded-full border-[3px] border-white object-cover shadow-[0_0_0_3px_#5602a5] transition-transform",
          clickable && "hover:scale-105"
        )}
      />
      <span className={cn("text-sm font-bold text-[#7d7e80] transition-colors", clickable && "hover:text-[#2084EA]")}>{author.name}</span>
    </div>
  );
}

/** Image (blurred until loaded), uploaded video, or YouTube embed for a news item. */
export function NewsMedia({ item, height, className, rounded = "rounded-lg", controls = true }) {
  const [loaded, setLoaded] = useState(false);
  const src = getMediaUrl(item?.get_media_display);

  if (item?.media_type === "youtube-link") {
    return (
      <div className={cn("w-full overflow-hidden", rounded, className)} style={{ height }}>
        <YouTube
          videoId={getYouTubeVideoId(item.get_media_display)}
          opts={{ width: "100%", height: String(height || 400), playerVars: { autoplay: 0 } }}
          className="w-full"
        />
      </div>
    );
  }

  if (item?.media_type === "video") {
    return <video src={src} controls={controls} className={cn("w-full object-cover", rounded, className)} style={{ height }} />;
  }

  return (
    <img
      src={src || undefined}
      alt={item?.title || "Crypto"}
      onLoad={() => setLoaded(true)}
      className={cn("w-full object-cover transition-[filter] duration-300 ease-out", loaded ? "blur-0" : "blur-[8px]", rounded, className)}
      style={{ height }}
    />
  );
}

/** Fixed round "back" button with the blue side tooltip used on news pages. */
export function BackButton({ title = "Back", onClick, className }) {
  return (
    <div className={cn("fixed left-4 z-10 sm:top-[124px] sm:left-6", className)}>
      <Tooltip
        title={title}
        placement="right"
        tooltipClassName="ml-4 min-w-[100px] rounded-lg bg-[#2084EA] px-4 py-2.5 text-center font-semibold text-white dark:bg-[#2084EA] dark:text-white"
      >
        <button
          type="button"
          onClick={onClick}
          aria-label={title}
          className="flex size-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-700 sm:size-10"
        >
          <ArrowLeft className="size-[18px] sm:size-5" />
        </button>
      </Tooltip>
    </div>
  );
}

/** Floating "scroll to top" button that appears after 300px of scroll. */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed right-4 bottom-6 z-[1200] transition-transform duration-200 sm:right-6 sm:bottom-8 md:right-8 md:bottom-10",
        visible ? "scale-100" : "pointer-events-none scale-0"
      )}
    >
      <Tooltip title="Scroll to top" placement="left">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="flex size-11 items-center justify-center rounded-full border-2 border-[#8e95a5] bg-white/92 text-[#6e7687] shadow-[0_4px_14px_rgba(0,0,0,0.12)] backdrop-blur-[6px] transition-all duration-200 hover:-translate-y-[3px] hover:border-primary hover:bg-[#f0f5ff] hover:text-primary hover:shadow-[0_6px_18px_rgba(55,114,255,0.25)] dark:bg-[rgba(29,31,43,0.92)] dark:text-[#a0a5b5] dark:hover:bg-primary/15"
        >
          <ArrowUp className="size-[22px]" />
        </button>
      </Tooltip>
    </div>
  );
}
