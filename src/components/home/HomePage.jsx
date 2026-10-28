"use client";

import dayjs from "dayjs";
import parse from "html-react-parser";
import { useAtomValue, useSetAtom } from "jotai";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import ReactPlayer from "react-player";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { bannerListActions, useHomeActions, useTutorialActions } from "@/_actions";
import { RoutesName } from "@/_common/app.constants";
import {
  authAtom,
  bannerListAtom,
  blogimgAtom,
  blogListAtom,
  blogVideoAtom,
  breadCrumbAtom,
  forecastSubAtom,
  headingListAtom,
  homeBannerAtom,
  latestNewsAtom,
  selectedCategoryAtom,
  tutorialAtom,
  tutorialCategoryAtom,
} from "@/_state";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import MuiTrandingNewsDashboardSection from "@/components/MuiTrandingNewsDashboardSection";
import { formatNewsDate, ScrollToTopButton } from "@/components/news/NewsParts";
import { Button, cn, Container, Tabs } from "@/components/ui";
import { IMAGE_URL } from "@/lib/content";
import CryptoTable from "@/views/CryptoTable";
import CryptoMarketOverview from "./CryptoMarketOverview";
import { BusinessNewsPanels, NewsCardGrid, PricePredictionTimeline, useContentList, useHomeNavigation } from "./HomeNews";
import HomePageCryptoNews from "./HomePageCryptoNews";

const NOTIFICATION_INTERVAL = 5000;

/* ------------------------------------------------------------------ */
/* Scroll restoration after coming back from an article                */
/* ------------------------------------------------------------------ */

function useRestoreHomeScroll() {
  useEffect(() => {
    const clear = () => ["restore_scroll_on_home", "home_scroll_section", "home_scroll_position", "home_scroll_card_id"].forEach((k) => sessionStorage.removeItem(k));
    const sectionId = sessionStorage.getItem("home_scroll_section");
    const cardId = sessionStorage.getItem("home_scroll_card_id");
    const targetY = parseFloat(sessionStorage.getItem("home_scroll_position")) || null;
    const shouldRestore = sessionStorage.getItem("restore_scroll_on_home") === "true" || sectionId || targetY;

    if (!shouldRestore || (!sectionId && !cardId && !(targetY > 0))) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      clear();
      return;
    }

    const scrollToEl = (el) => window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 90), behavior: "smooth" });
    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      const card = cardId && document.getElementById(`news-card-${cardId}`);
      const section = sectionId && document.getElementById(sectionId);
      if (card) scrollToEl(card);
      else if (section && (section.offsetHeight > 50 || attempts >= 15)) scrollToEl(section);
      else if (!sectionId && targetY > 0 && (document.documentElement.scrollHeight >= targetY || attempts >= 20)) window.scrollTo({ top: targetY, behavior: "smooth" });
      else if (attempts < 25) return;
      clearInterval(timer);
      clear();
    }, 100);
    return () => clearInterval(timer);
  }, []);
}

/* ------------------------------------------------------------------ */
/* Global community: rotating guest-post cards                         */
/* ------------------------------------------------------------------ */

function NotificationCard({ data, variant, entering = true, onClick, className }) {
  const stacked = variant === "stacked";
  const rest = stacked ? "translateX(-50%) translateY(30px) scale(0.92)" : entering ? "translate(-50%, 0px) scale(1)" : "translate(-50%, 90px) scale(0.96)";
  const hover = stacked ? "translateX(-50%) translateY(24px) scale(0.95)" : `translate(-50%, ${entering ? "-6px" : "84px"}) scale(${entering ? 1.015 : 0.975})`;

  return (
    <div
      onClick={onClick}
      style={{ "--rest": rest, "--hover": hover }}
      className={cn(
        "group absolute left-1/2 isolate flex w-[320px] cursor-pointer items-center gap-4 overflow-hidden rounded-[22px] border border-white/14 bg-white/8 p-5 shadow-[0_20px_60px_rgba(0,0,0,.45),inset_0_1px_1px_rgba(255,255,255,.08)] backdrop-blur-[18px] will-change-[transform,opacity] [transform:var(--rest)] hover:border-[rgba(164,221,255,.55)] hover:shadow-[0_35px_70px_rgba(0,0,0,.55),0_0_28px_rgba(90,177,255,.3),inset_0_1px_1px_rgba(255,255,255,.18)] hover:[transform:var(--hover)] sm:w-[520px] md:w-[420px] lg:w-[520px]",
        // light sweep + sparkle on hover
        "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:translate-x-[-130%] before:skew-x-[-18deg] before:bg-[linear-gradient(115deg,transparent_20%,rgba(170,225,255,.12)_42%,rgba(255,255,255,.38)_50%,rgba(130,108,255,.16)_58%,transparent_80%)] before:opacity-0 hover:before:animate-[card-shimmer_1.1s_ease-out] hover:before:opacity-100",
        "after:pointer-events-none after:absolute after:right-3.5 after:bottom-2 after:z-[2] after:scale-[.35] after:rotate-[-30deg] after:text-[26px] after:leading-none after:text-[rgba(210,235,255,.85)] after:opacity-0 after:drop-shadow-[0_0_9px_rgba(145,205,255,.95)] after:transition-[opacity,transform] after:duration-300 after:content-['✦'] hover:after:scale-100 hover:after:rotate-0 hover:after:opacity-100",
        "motion-reduce:transition-none",
        className
      )}
    >
      {data.avatar ? (
        <img src={data.avatar} alt="" className="relative z-[1] size-16 shrink-0 rounded-full border-[3px] border-[rgba(120,160,255,.6)] object-cover" />
      ) : (
        <span className="relative z-[1] size-16 shrink-0 rounded-full border-[3px] border-[rgba(120,160,255,.6)] bg-[#bdbdbd]" />
      )}
      <div className="relative z-[1] flex-1">
        <p className="tracking-[1px] text-[#b6bcc8]! uppercase">{data.type}</p>
        <p className="line-clamp-2 leading-[1.15] font-bold text-white! sm:line-clamp-none">{data.title}</p>
        <p className="mt-1 text-[#c2c5cf]!">
          Host: {data.host}
          {" | "}
          {data.time}
        </p>
      </div>
    </div>
  );
}

function GlobalCommunitySection() {
  const [guestPosts] = useContentList("guest_post");
  const nav = useHomeNavigation("global-community-section");
  const [activeIndex, setActiveIndex] = useState(0);
  const [entering, setEntering] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setEntering(false);
      setTimeout(() => {
        setActiveIndex((prev) => (guestPosts.length ? (prev + 1) % guestPosts.length : 0));
        setEntering(true);
      }, 250);
    }, NOTIFICATION_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [guestPosts.length]);

  const toCard = (item) =>
    item
      ? {
          id: item.id,
          type: item.type?.replace(/_/g, " ").toUpperCase(),
          title: item.title,
          host: item.profile?.profile_name,
          time: formatNewsDate(item.created_at),
          avatar: item.profile?.profile_image ? `${IMAGE_URL}/${item.profile.profile_image}` : "",
        }
      : {};

  const currentItem = guestPosts[activeIndex];
  const current = toCard(currentItem);
  const next = toCard(guestPosts[(activeIndex + 1) % (guestPosts.length || 1)]);

  const openCurrent = () => {
    if (!currentItem?.id) return;
    sessionStorage.setItem("home_scroll_card_id", String(currentItem.id));
    nav.openBlog(currentItem);
  };

  return (
    <div id="global-community-section" className="relative overflow-hidden rounded-3xl bg-[#0f1117] md:rounded-[32px] dark:border dark:border-[rgba(189,189,189,0.16)]">
      <Container>
        <div className="flex flex-col items-center justify-center py-6 md:flex-row md:gap-8">
          <div className="z-[2] flex-1 text-center text-white md:text-left">
            <p className="mb-4 text-[13px]! tracking-[1.5px] text-[#8a8f9c]! uppercase">CRYPTO NEWS</p>
            <h2 className="mb-6 font-display leading-[1.15] font-bold">Be Part of our Global Community</h2>
            <p className="mx-auto mb-10 max-w-[440px] text-[#9aa0ab]! md:mx-0">
              Let&apos;s stay in touch. Join our communities to keep up with the <b> The Coin Chain </b> team and our traders from across the world?
            </p>
          </div>

          <div className="relative flex min-h-[290px] w-full flex-1 items-center justify-center overflow-hidden md:min-h-[400px]">
            <img src="/assets/images/globe.svg" alt="Global community" className="pointer-events-none relative z-[1] w-[180px] opacity-70 md:w-[260px]" />
            <NotificationCard
              data={next}
              variant="stacked"
              className="bottom-[35px] z-[2] opacity-50 transition-all duration-[800ms] ease-[cubic-bezier(0.43,0.05,0.3,1)] md:bottom-[55px]"
            />
            <NotificationCard
              key={current.id}
              data={current}
              entering={entering}
              onClick={openCurrent}
              className={cn(
                "bottom-[95px] z-[3] transition-[transform,opacity] duration-[800ms,700ms] ease-[cubic-bezier(0.43,0.05,0.3,1),ease] md:bottom-[135px]",
                entering ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Learn crypto tutorials                                              */
/* ------------------------------------------------------------------ */

const truncate = (text = "", length = 150) => (text.length > 10 ? `${text.substring(0, length)}...` : text);

function LearnCryptoTutorials() {
  const router = useRouter();
  const tutorialsData = useAtomValue(tutorialAtom);
  const tutorialCategories = useAtomValue(tutorialCategoryAtom).filter((item) => item.type === "Tutorial");
  const setBreadCrumb = useSetAtom(breadCrumbAtom);
  const setBlogImg = useSetAtom(blogListAtom);
  const setBlogNew = useSetAtom(blogimgAtom);
  const setBlogVideo = useSetAtom(blogVideoAtom);
  const [tab, setTab] = useState("1");
  const [loadMore, setLoadMore] = useState(4);

  const tutorials = tab === "1" ? tutorialsData : tutorialsData.filter((item) => item.category === tab);

  const openVideo = (item) => {
    setBreadCrumb(item.category);
    setBlogImg(item);
    setBlogNew(true);
    setBlogVideo(true);
    router.push(`${RoutesName.learn_Crypto_Details}/learncyptovideo/${item.slug}`);
  };

  return (
    <div className="w-full">
      <Tabs
        className="gap-2 pt-1 md:gap-5 md:pt-10"
        tabClassName="font-display text-base capitalize text-n4 px-4 py-2 rounded-full"
        activeClassName="bg-n3! text-n8!"
        value={tab}
        onChange={setTab}
        items={[{ value: "1", label: "All" }, ...tutorialCategories.map((c) => ({ value: c.title, label: c.title }))]}
      />

      {/* Desktop: two-column list */}
      <div className="pt-12 max-[1025px]:hidden">
        <div className="grid grid-cols-2 gap-x-8">
          {tutorials.slice(0, loadMore).map((item, index) => (
            <div key={item.id ?? index} onClick={() => openVideo(item)} className="mb-6 grid grid-cols-2 gap-x-8 max-md:mb-8">
              <div className="flex cursor-pointer flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <p className="max-h-[45px] overflow-hidden font-medium">
                    {item.title}
                    {item.category}
                  </p>
                  <div className="max-h-[110px] overflow-hidden text-sm text-n4">{parse(truncate(item.description))}</div>
                </div>
                <p className="text-sm! text-n4!">{dayjs(item.created_at).format("MMM DD,YYYY")}</p>
              </div>
              <div className="size-[220px]">
                <ReactPlayer src={item.video_link} controls light={item.image_link} playing={false} width="100%" height="100%" />
              </div>
            </div>
          ))}
        </div>
        {tutorials.length > 4 && tutorials.length > loadMore && (
          <div className="mb-6 max-md:hidden">
            <Button variant="outlined" className="h-[50px] px-[15px] py-[9px]" onClick={() => setLoadMore((n) => n + 20)}>
              Load more <ChevronRight className="size-5 text-n4" />
            </Button>
          </div>
        )}
      </div>

      {/* Tablet & mobile: carousel */}
      <div className="swiper-arrows hidden pt-6 max-[1025px]:block">
        <Swiper
          slidesPerView={1}
          navigation
          spaceBetween={30}
          breakpoints={{ 480: { slidesPerView: 1, spaceBetween: 0 }, 640: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 2, spaceBetween: 30 } }}
          modules={[Navigation]}
        >
          {tutorials.slice(0, 3).map((item, index) => (
            <SwiperSlide key={item.id ?? index}>
              <div className="relative mb-8">
                <div className="aspect-video w-full">
                  <ReactPlayer src={item.video_link} controls light={item.image_link} playing width="100%" height="100%" />
                </div>
                <p className="py-4 text-2xl! font-bold max-md:text-base!">{item.title}</p>
                <div className="text-sm text-n4">{parse(truncate(item.description))}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const homeActions = useHomeActions();
  const bannerActions = bannerListActions();
  const tutorialAction = useTutorialActions();
  const homeBannerData = useAtomValue(homeBannerAtom);
  const headingList = useAtomValue(headingListAtom);
  const bannerList = useAtomValue(bannerListAtom);
  const selectedCat = useAtomValue(selectedCategoryAtom);
  const subscribeUser = useAtomValue(forecastSubAtom);
  const auth = useAtomValue(authAtom);
  const setLatestNews = useSetAtom(latestNewsAtom);

  useRestoreHomeScroll();

  useEffect(() => {
    tutorialAction.tutorialData();
    tutorialAction.categoryList();
    homeActions.cryptoTrader();
    homeActions.cryptoNews();
    bannerActions.homeBannerList();
    bannerActions.get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative z-[2] mt-14 sm:mt-16">
        <CryptoTickerMarquee />
      </div>

      {/* Hero: headline story + trending ticker */}
      <section className="relative flex items-center bg-[url(/assets/Background_img/Golden_Market_Waves.png)] bg-cover bg-top bg-no-repeat pt-8 pb-12 transition-[background-image] duration-500 sm:pt-10 sm:pb-16 md:min-h-[560px] md:pt-12 md:pb-20 dark:bg-[url(/assets/Background_img/Golden_Coins.png)]">
        <Container>
          <div className="pb-4 sm:pb-6">
            {subscribeUser?.status === "expired" && auth !== null && (
              <div className="mt-[22px] mb-4 flex items-center gap-3 rounded bg-[rgb(229,246,253)] px-4 py-1.5 text-sm text-[rgb(1,67,97)]">
                <Info className="size-5 text-[#0288d1]" />
                <span>
                  You don&apos;t have any current plan please{" "}
                  <Link href="/subscription">
                    <b>subscribe </b>
                  </Link>
                  !
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 md:gap-8">
              <div className="md:pr-10">
                <HomePageCryptoNews />
              </div>
              <div id="trending-news-section">
                <MuiTrandingNewsDashboardSection />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CryptoMarketOverview />

      {/* Latest news + press releases */}
      <div className="bg-n7 dark:bg-ink">
        <Container>
          <div>
            <h2 className="mx-auto max-w-[500px] text-left font-display text-[40px]! font-bold min-[768px]:text-center">{parse(headingList[0]?.title ?? "")}</h2>
            <div className="pt-4" />
            <NewsCardGrid
              id="latest-news-section"
              title="Latest News"
              type="latest_news"
              limit={6}
              viewAllAfter={3}
              viewAllHref={RoutesName.Latest_News}
              variant="large"
              placeholder="https://via.placeholder.com/800x600?text=Latest+News"
              loadingText="Loading latest news..."
              emptyText="No latest news is available right now."
              onLoaded={setLatestNews}
            />
            <Button href="/contact" className="w-full">
              Contact Us
            </Button>
          </div>
          <NewsCardGrid
            id="press-release-section"
            title="Press Releases"
            type="press_release"
            limit={8}
            viewAllAfter={8}
            viewAllHref={RoutesName.Press_Release}
            variant="compact"
            placeholder="https://via.placeholder.com/800x600?text=Press+Releases"
            loadingText="Loading press_release..."
            emptyText="No press releases are available right now."
          />
        </Container>
      </div>

      <Container>
        <BusinessNewsPanels />
        <GlobalCommunitySection />
        <NewsCardGrid
          id="global-news-section"
          title="Global News"
          type="global_news"
          limit={8}
          viewAllAfter={8}
          viewAllHref={RoutesName.Global_News}
          variant="compact"
          placeholder="https://via.placeholder.com/800x600?text=Research+Report"
          loadingText="Loading research reports..."
          emptyText="No research reports are available right now."
        />

        <Container>
          <div>
            <h2 className="font-display font-bold max-md:mb-6 max-md:text-center max-md:text-[40px]!">Learn crypto</h2>
            <LearnCryptoTutorials />
          </div>
        </Container>

        <div className="py-8 sm:py-12">
          <div className="justify-between md:flex md:items-center">
            <h2 className="font-display max-md:mb-8 max-md:text-[40px]!">Market trend</h2>
            <p className="mb-8 block sm:mb-0 sm:hidden">
              <span className="text-gold">Subscribe</span> to gain complete access to the most precise short and long-term predictions of cryptocurrency prices.
            </p>
          </div>
          <CryptoTable selectedCat={selectedCat} isIt={false} />
          <div className="mt-6 flex justify-center sm:mt-8">
            <Button variant="outlined" href="/prediction-dashboard" className="px-6 py-2 font-semibold sm:px-8">
              View All
            </Button>
          </div>
        </div>
      </Container>

      {/* Apps + price prediction timeline */}
      <Container>
        <div className="pt-2.5 sm:pb-12">
          <div className="grid grid-cols-1 gap-4 max-md:flex max-md:flex-col-reverse md:grid-cols-12 md:gap-6">
            <div className="md:col-span-5">
              <p className="text-n4!">app&apos;s</p>
              <h5 className="pb-10">Coming soon...</h5>
              {[
                { icon: "/assets/images/google-g-2015-logo-svgrepo-com.svg", label: "Download from", store: "Google Play", divider: true },
                { icon: "/assets/images/icons/apple.svg", label: "Download from", store: "Appstore", divider: true },
                { icon: "/assets/images/icons/apple.svg", label: "Download for", store: "Mac OS" },
              ].map((app) => (
                <div key={app.store} className={cn("flex gap-4 py-5", app.divider && "border-b border-line")}>
                  <img src={app.icon} alt="" className="size-14" />
                  <div>
                    <div className="text-sm text-n4">{app.label}</div>
                    <div className="text-2xl max-md:text-base">{app.store}</div>
                  </div>
                </div>
              ))}
            </div>
            <div id="price-prediction-section" className="md:col-span-7">
              <PricePredictionTimeline />
            </div>
          </div>
        </div>
      </Container>

      {/* Partner banners */}
      <div className="pb-0 md:pb-12">
        <Marquee>
          {bannerList.map((item, i) => {
            const image = item.image_url ? `${IMAGE_URL}/${item.image_url}` : item.image_link;
            return image ? <img key={i} src={image} alt="" className="ml-[75px] min-h-[100px] max-w-[200px] object-contain" /> : null;
          })}
        </Marquee>
      </div>

      <ScrollToTopButton />
    </>
  );
}
