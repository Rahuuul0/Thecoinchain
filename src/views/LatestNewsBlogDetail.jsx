"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RoutesName } from "@/_common/app.constants";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import { BackButton } from "@/components/news/NewsParts";
import { Container } from "@/components/ui";
import { IMAGE_URL, slugify } from "@/lib/content";

// Created dates come back as UTC but are meant to be shown as-is.
const parseCreatedAt = (value) => {
  const local = typeof value === "string" ? value.replace(/Z$/i, "") : value;
  return local && dayjs(local).isValid() ? dayjs(local) : null;
};

function AuthorPopup({ profile, onOpenProfile }) {
  return (
    <div className="absolute top-full left-0 z-[1000] pt-2.5">
      <div className="relative w-[270px] rounded-[10px] border border-[#2084EA] bg-white p-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.12)] before:absolute before:-top-[9px] before:left-[22px] before:border-x-[9px] before:border-b-[9px] before:border-x-transparent before:border-b-[#2084EA] after:absolute after:-top-[7px] after:left-[23px] after:border-x-8 after:border-b-8 after:border-x-transparent after:border-b-white">
        <div className="mb-2.5 flex items-center gap-2.5">
          <img
            src={`${IMAGE_URL}/${profile.profile_image}`}
            alt={profile.profile_name}
            onClick={onOpenProfile}
            className="size-[46px] cursor-pointer rounded-full border-2 border-[#2084EA] object-cover"
          />
          <div>
            <button type="button" onClick={onOpenProfile} className="text-[15px] font-semibold text-gray-800 hover:text-[#2084EA]">
              {profile.profile_name} ↗
            </button>
            <p className="mt-0.5 text-xs! text-gray-400!">{profile.profile_designation}</p>
          </div>
        </div>
        <p className="line-clamp-3 text-xs! leading-[1.6] text-[#8B8B8B]!">
          {profile.profile_description || "Fun-loving and cheerful, a passionate blockchain and crypto writer who knows no boundary..."}
        </p>
      </div>
    </div>
  );
}

/**
 * Article page. `blog` and its sanitized `html` are loaded on the server
 * (see app/(site)/blog/[slug]/page.jsx).
 */
export default function LatestNewsBlogDetail({ blog, html }) {
  const router = useRouter();
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [blog?.id]);

  const profile = blog?.profile;
  const createdAt = parseCreatedAt(blog?.created_at);
  const authorDate = createdAt ? createdAt.format("MMM DD, YYYY HH:mm") : "";
  const formattedType = (blog?.type || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const openProfile = () => {
    const id = profile?.profile_id;
    const name = profile?.profile_name || "";
    if (!id && !name) return;
    const nameSlug = slugify(name, true) || String(id);
    if (id) {
      sessionStorage.setItem(`profile_id_${nameSlug}`, String(id));
      localStorage.setItem(`profile_id_${nameSlug}`, String(id));
    }
    router.push(RoutesName.Profile_Detail.replace(":name", nameSlug));
  };

  const handleBack = () => {
    // Tell the list page we came from whether to restore its scroll position.
    if (sessionStorage.getItem("crypto_news_card_id")) {
      sessionStorage.setItem("restore_scroll_on_news", "true");
      sessionStorage.removeItem("restore_scroll_on_home");
    } else {
      sessionStorage.setItem("restore_scroll_on_home", "true");
      sessionStorage.removeItem("restore_scroll_on_news");
    }
    if (window.history.length > 1) router.back();
    else router.push(RoutesName.Latest_News);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="relative z-[1] mt-14 sm:mt-16">
        <CryptoTickerMarquee />
      </div>

      <div className="py-20">
        <BackButton title={`Back to ${formattedType || "News"}`} onClick={handleBack} className="top-[120px]" />

        <Container>
          <article className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="rounded-2xl border border-gray-200 p-6 sm:p-8">
              {(profile?.profile_name || authorDate) && (
                <div className="mb-4 flex flex-wrap items-center gap-1.5">
                  {profile?.profile_name && (
                    <div className="relative inline-flex" onMouseEnter={() => setShowProfilePopup(true)} onMouseLeave={() => setShowProfilePopup(false)}>
                      <button
                        type="button"
                        onClick={openProfile}
                        className="text-[13px] font-semibold whitespace-nowrap text-[#2F6FED] underline hover:text-[#1558C0]"
                      >
                        {profile.profile_name}
                      </button>
                      {showProfilePopup && <AuthorPopup profile={profile} onOpenProfile={openProfile} />}
                    </div>
                  )}
                  {profile?.profile_name && authorDate && <span className="text-[#d5d5d5]">|</span>}
                  {authorDate && (
                    <time dateTime={createdAt.format("YYYY-MM-DDTHH:mm")} className="text-[13px] whitespace-nowrap text-[#555]">
                      Published on {authorDate}
                    </time>
                  )}
                </div>
              )}

              <div className="blog-content mb-8" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </article>
        </Container>
      </div>
    </div>
  );
}
