"use client";

import dayjs from "dayjs";
import { Award, Languages } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { allContentActions } from "@/_actions/allcontent.actions";
import { Apis } from "@/_common/app.constants";
import { useFetchWrapper } from "@/_helpers";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import { BackButton, ScrollToTopButton, useOpenBlog } from "@/components/news/NewsParts";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Container, Spinner } from "@/components/ui";
import { getMediaUrl, getYouTubeVideoId, IMAGE_URL, slugify } from "@/lib/content";

const EMPTY_AUTHOR = { name: "", role: "", image: "", expertise: [], languages: [], bio: "", socialLinks: {} };
const PLACEHOLDER = "https://via.placeholder.com/800x600?text=Blog";

const toAuthor = (profile) => ({
  name: profile?.profile_name || "",
  role: profile?.profile_designation || "",
  image: profile?.profile_image ? `${IMAGE_URL}${profile.profile_image}` : "",
  bio: profile?.profile_description || "",
  socialLinks: profile?.profile_social_link || {},
  expertise: profile?.expertise || [],
  languages: profile?.languages || [],
});

const rememberProfileId = (profile) => {
  if (!profile?.profile_name || !profile?.profile_id) return;
  const slug = slugify(profile.profile_name);
  sessionStorage.setItem(`profile_id_${slug}`, String(profile.profile_id));
  sessionStorage.setItem(`profile_id_${profile.profile_name}`, String(profile.profile_id));
  localStorage.setItem(`profile_id_${slug}`, String(profile.profile_id));
};

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-[34px] min-w-[34px] items-center justify-center rounded-[9px] border border-[#d9ecfb] bg-[linear-gradient(135deg,#e9f5ff,#f5faff)] text-[#0878d1]">
        {icon}
      </div>
      <div>
        <p className="mb-[3px] font-semibold tracking-[1px] text-[#8a9199] uppercase">{label}</p>
        {children}
      </div>
    </div>
  );
}

function SocialLink({ href, className = "text-[#0878d1]", children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex size-[35px] items-center justify-center rounded-[9px] border border-[#d9e9f5] bg-[linear-gradient(135deg,#eef8ff,#ffffff)] hover:bg-[#e9f5fc] ${className}`}
    >
      {children}
    </a>
  );
}

function BlogCard({ item, onOpen }) {
  const mediaUrl = getMediaUrl(item?.get_media_display);
  const mediaType = String(item?.media_type || "").toLowerCase();
  const isVideo = ["video", "video-file", "video_file"].includes(mediaType);
  const isYouTube = ["youtube", "youtube-link", "youtube_link"].includes(mediaType);
  const youtubeId = isYouTube ? getYouTubeVideoId(item?.get_media_display) : null;

  return (
    <div
      onClick={() => onOpen(item)}
      className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#e0e0e0] hover:shadow-[0_16px_30px_rgba(0,0,0,0.14)]"
    >
      <div className="h-[145px] overflow-hidden bg-[#f3f3f3] md:h-[150px]">
        {isVideo ? (
          <video src={mediaUrl} controls preload="metadata" onClick={(e) => e.stopPropagation()} className="block size-full object-cover" />
        ) : youtubeId ? (
          <div onClick={(e) => e.stopPropagation()} className="size-full [&_iframe]:block [&_iframe]:size-full [&>div]:size-full">
            <YouTube videoId={youtubeId} opts={{ width: "100%", height: "100%", playerVars: { rel: 0 } }} className="size-full" />
          </div>
        ) : (
          <img
            src={mediaUrl || PLACEHOLDER}
            alt={item?.title || "Blog"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = PLACEHOLDER;
            }}
            className="block size-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
          />
        )}
      </div>

      <div className="p-5">
        {item?.type && (
          <span className="mb-2.5 inline-flex h-[22px] items-center rounded-md border border-[#d9ecfb] bg-[#eef8ff] px-2 text-[10px] font-bold text-[#0878d1] capitalize">
            {String(item.type).replace(/_/g, " ")}
          </span>
        )}
        <p
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(item)}
          className="line-clamp-2 leading-[1.35] font-semibold text-black! transition-colors group-hover:text-[#323232]!"
        >
          {item?.title}
        </p>
        {item?.created_at && <p className="mt-4 font-semibold text-[#808080]!">{dayjs(item.created_at).format("MMM DD, YYYY hh:mm A")}</p>}
      </div>
    </div>
  );
}

export default function MuiCrptoProfileNews() {
  const { name, id } = useParams();
  const router = useRouter();
  const fetchWrapper = useFetchWrapper();
  const { getProfileDetail } = allContentActions();
  const openBlog = useOpenBlog();

  const [author, setAuthor] = useState(EMPTY_AUTHOR);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const routeParam = name || id;

    const findProfileId = async () => {
      const clean = decodeURIComponent(routeParam).trim();
      const slug = slugify(clean);
      const cached =
        sessionStorage.getItem(`profile_id_${clean}`) ||
        sessionStorage.getItem(`profile_id_${slug}`) ||
        localStorage.getItem(`profile_id_${clean}`) ||
        localStorage.getItem(`profile_id_${slug}`);
      if (cached) return cached;
      if (/^\d+$/.test(clean)) return clean;

      // Unknown slug: look the author up in recent content.
      for (const type of ["latest_news", "press_release", "price_prediction", "research_report"]) {
        try {
          const res = await fetchWrapper.get(Apis.All_Content(type));
          const items = Array.isArray(res?.data) ? res.data : [];
          const match = items.find((it) => slugify(it?.profile?.profile_name || it?.author || it?.author_name || "") === slug);
          const profileId = match?.profile?.profile_id || match?.profile_id;
          if (profileId) return profileId;
        } catch (err) {
          console.warn(`Could not lookup profile in ${type}:`, err);
        }
      }
      return null;
    };

    const load = async () => {
      if (!routeParam) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const profileId = await findProfileId();
        if (!profileId) throw new Error("Profile not found");

        const response = await getProfileDetail(profileId);
        if (response?.result_code !== 1) throw new Error(response?.error_info || "Failed to load profile");
        if (!response.profile) throw new Error("Profile data not found");

        rememberProfileId(response.profile);
        setAuthor(toAuthor(response.profile));
        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.warn("Error fetching profile:", err);
        setError("Failed to load profile data");
        setAuthor(EMPTY_AUTHOR);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, id]);

  if (loading || error) {
    return (
      <Container className="pt-28 pb-10">
        <div className="flex min-h-[400px] w-full items-center justify-center rounded-[18px] border border-[#dfe4e9] p-6">
          {loading ? <Spinner /> : <p className="w-full rounded-md bg-red-50 px-4 py-3 text-red-800!">{error}</p>}
        </div>
      </Container>
    );
  }

  const social = author.socialLinks || {};

  return (
    <>
      <div className="relative z-[1] mt-14 sm:mt-16">
        <CryptoTickerMarquee />
      </div>

      <Container className="mt-24">
        <BackButton onClick={() => router.back()} className="top-[130px]" />

        {/* Profile card */}
        <div className="mx-auto w-full overflow-hidden rounded-[18px] border border-[#dfe4e9] bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_55%,#f5faff_100%)] shadow-[0_12px_35px_rgba(20,50,80,0.06)]">
          <div className="grid grid-cols-1 gap-[22px] p-[18px] sm:grid-cols-[auto_1fr] sm:p-[25px] md:grid-cols-[210px_minmax(0,1fr)] md:gap-[30px] md:p-[30px]">
            <div className="relative mx-auto w-full max-w-[250px] md:mx-0 md:max-w-[210px]">
              <div className="relative">
                {author.image ? (
                  <img
                    src={author.image}
                    alt={author.name}
                    className="h-[250px] w-full rounded-[14px] border border-[#dfe5ea] object-cover shadow-[0_8px_25px_rgba(0,0,0,0.08)] md:h-[226px]"
                  />
                ) : (
                  <div className="h-[250px] w-full rounded-[14px] border border-[#dfe5ea] bg-[#bdbdbd] md:h-[226px]" />
                )}
                <div className="absolute -bottom-3 left-0 h-[5px] w-full rounded-[5px] bg-[linear-gradient(180deg,#08a4e8,#0065d8)]" />
              </div>

              <div className="mt-5 flex gap-2">
                {social.twitter && (
                  <SocialLink href={social.twitter} className="text-[#17202a]">
                    <span className="font-[Arial,sans-serif] text-lg leading-none font-bold">𝕏</span>
                  </SocialLink>
                )}
                {social.linkedin && (
                  <SocialLink href={social.linkedin}>
                    <LinkedInIcon className="size-[18px]" />
                  </SocialLink>
                )}
                {social.facebook && (
                  <SocialLink href={social.facebook}>
                    <FacebookIcon className="size-[18px]" />
                  </SocialLink>
                )}
                {social.instagram && (
                  <SocialLink href={social.instagram}>
                    <InstagramIcon className="size-[18px]" />
                  </SocialLink>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-[7px] flex items-center gap-2">
                <span className="h-0.5 w-6 rounded-[5px] bg-[linear-gradient(90deg,#0099e8,#0065d8)]" />
                <p className="text-xs! font-medium tracking-[1.3px] text-[#1685ca]!">JOURNALIST PROFILE</p>
              </div>

              <h4 className="mb-1 leading-[1.08] font-semibold! tracking-[-1.2px] text-[#17202a]">{author.name}</h4>

              {author.role && <p className="mb-5 font-semibold text-[#1685ca]! sm:mb-[25px]">{author.role}</p>}

              <div className="flex flex-col gap-4">
                {author.expertise.length > 0 && (
                  <InfoRow icon={<Award className="size-[18px]" />} label="Expertise">
                    <div className="flex flex-wrap gap-[5px]">
                      {author.expertise.map((item) => (
                        <span key={item} className="inline-flex h-[26px] items-center rounded-[7px] border border-[#dcecf7] bg-[#f7fbfe] px-[9px] text-[11px] font-medium text-[#39434c]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </InfoRow>
                )}
                {author.languages.length > 0 && (
                  <InfoRow icon={<Languages className="size-[17px]" />} label="Languages">
                    <div className="flex flex-wrap gap-1.5">
                      {author.languages.map((language) => (
                        <span key={language} className="inline-flex h-[25px] items-center rounded-[7px] border border-[#e1e7ed] bg-white px-2 text-[11px] font-semibold text-[#4a535c]">
                          {language}
                        </span>
                      ))}
                    </div>
                  </InfoRow>
                )}
              </div>

              <div className="mt-[15px] rounded-[13px] border border-[rgba(0,113,190,0.08)] bg-[linear-gradient(135deg,#f7fbfe_0%,#ffffff_100%)] p-[17px] sm:mt-5 sm:p-5">
                <div className="mb-[9px] flex items-center gap-2">
                  <span className="size-[7px] rounded-full bg-[#0787d1] shadow-[0_0_0_4px_#e4f4fc]" />
                  <p className="font-extrabold tracking-[1px] text-[#65717c]! uppercase">About the Author</p>
                </div>
                <p className="m-0 leading-[1.65] text-[#59636c]!">{author.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Author's articles */}
        <div className="my-10">
          <p className="mb-6 font-semibold text-black! dark:text-white!">Blogs by {author.name || "this author"}</p>
          {blogs.length === 0 ? (
            <p className="text-[#8a9199]!">No blogs found for this author.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {blogs.map((item) => (
                <BlogCard key={item?.id} item={item} onOpen={openBlog} />
              ))}
            </div>
          )}
        </div>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
