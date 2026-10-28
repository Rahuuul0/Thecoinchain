"use client";

import parse from "html-react-parser";
import { useAtom, useAtomValue } from "jotai";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { analyticsActions, faqActions, guidesAnalysisActions, newsListActions, promotionsActions, useContactActions, useTutorialActions } from "@/_actions";
import { blogimgAtom, blogListAtom, blogVideoAtom, breadCrumbAtom, loaderAtom, tutorialAtom } from "@/_state";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import { Breadcrumbs, cn, Container, LoadingOverlay } from "@/components/ui";
import { itemImage } from "@/lib/content";

/**
 * Detail page for CMS items reached via /<section>-detail/:page/:title.
 * `:page` picks which API loads the item; the result lands in blogListAtom.
 */
function useLoadItem(page, title) {
  const tutorials = useTutorialActions();
  const news = newsListActions();
  const promotions = promotionsActions();
  const guides = guidesAnalysisActions();
  const analytics = analyticsActions();
  const contact = useContactActions();
  const faq = faqActions();

  useEffect(() => {
    const loaders = {
      newsletter: () => news.getSingle(title),
      newspromotions: () => promotions.getSingle(title),
      guides: () => guides.getSingle(title),
      guideanalytics: () => analytics.getSingle(title),
      learncypto: () => tutorials.getSingle(title),
      learncyptovideo: () => tutorials.getSingleVideo(title),
      learnandearn: () => tutorials.getSingleMarket(title),
      contact: () => contact.getSingleContact(title),
      predictionDashboard: () => faq.get(title),
    };
    if (loaders[page]) loaders[page]();
    else console.warn(`Unknown detail page type: ${page}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, title]);
}

const PLACEHOLDER_PARAGRAPHS = [
  "For traders who love technical analysis, robust charting tools are essential. TradingView is one option for both amateur and experienced traders. It offers numerous trading and charting tools and also a free membership option. Let’s face it... not everyone has the money or need for a Bloomberg terminal subscription.",
  "The Stacks series of products: Stacks: Landing Page Kit, Stacks: Portfolio Kit, Stacks: eCommerce Kit. \"Stacks is a production-ready library of stackable content blocks built in React Native.",
  "Mix-and-match dozens of responsive elements to quickly configure your favorite landing page layouts or hit the ground running with 10 pre-built templates, all in light or dark mode.\"",
];

/**
 * @param parent      breadcrumb back to the listing: { label, href, clearsItem? }
 * @param current     breadcrumb label for this page (defaults to the stored category)
 * @param fullWidth   let the description use the full container width
 * @param withTicker  show the coin price strip above the page
 * @param compact     tighter spacing around the media
 */
export default function ContentDetail({ parent, current, fullWidth = false, withTicker = false, compact = false }) {
  const { page, title } = useParams();
  const [item] = useAtom(blogListAtom);
  const [hasItem, setHasItem] = useAtom(blogimgAtom);
  const isVideo = useAtomValue(blogVideoAtom);
  const breadCrumb = useAtomValue(breadCrumbAtom);
  const tutorials = useAtomValue(tutorialAtom);
  const loader = useAtomValue(loaderAtom);
  const tutorialActions = useTutorialActions();

  useLoadItem(page, title);

  useEffect(() => {
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
    tutorialActions.tutorialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const crumbs = [
    { label: parent.label, href: parent.href, onClick: parent.clearsItem ? () => setHasItem(false) : undefined },
    { label: current ?? breadCrumb },
  ];

  const fallbackVideo = tutorials[0];

  return (
    <>
      {withTicker && (
        <div className="relative z-[1] mt-14 sm:mt-16">
          <CryptoTickerMarquee />
        </div>
      )}

      <Container className="pt-[60px] max-md:pt-[88px]">
        <LoadingOverlay open={loader} />
        <h1 className="pb-6 text-center font-display font-bold">{hasItem ? item.title : "A beginner’s guide to trading view"}</h1>
        <div className="flex justify-center">
          <Breadcrumbs items={crumbs} className="[&>span:last-of-type]:text-xs [&>span:last-of-type]:font-semibold [&>span:last-of-type]:text-n3" />
        </div>
      </Container>

      <Container>
        <div className={compact ? "pb-8 sm:pb-10" : "pb-8 sm:pb-20"}>
          {hasItem && !isVideo ? (
            <div className={cn("flex max-w-full justify-center pt-8 pb-8 sm:pt-20", compact ? "md:pb-10" : "md:pb-20 lg:pb-[136px]")}>
              <img src={itemImage(item)} alt={item.title || ""} className="max-w-full" />
            </div>
          ) : (
            <div className={cn("pt-8 pb-8 sm:pt-20 md:pb-20", fullWidth ? "lg:pb-14" : "lg:pb-[136px]")}>
              {hasItem ? (
                <ReactPlayer src={item?.video_link} controls light={item?.image_link} playing width="100%" height="550px" />
              ) : (
                fallbackVideo && <ReactPlayer src={fallbackVideo.video_link} controls light={fallbackVideo.image_link} playing={false} width="100%" height="550px" />
              )}
            </div>
          )}

          <div className={cn("mx-auto", fullWidth ? "max-w-full" : "max-w-[728px]")}>
            <div className="relative mb-8 pb-8 font-display text-[40px] font-bold before:absolute before:bottom-0 before:block before:h-0.5 before:w-[166px] before:bg-line max-md:text-[32px]">
              {hasItem ? "Description" : "Introduction"}
            </div>
            {hasItem ? (
              <div className="html-content pb-6 text-[#777e90] [&_p]:text-[#777e90]">{parse(item.description || "")}</div>
            ) : (
              PLACEHOLDER_PARAGRAPHS.map((text, i) => (
                <p key={i} className={cn("text-[#777e90]!", i === PLACEHOLDER_PARAGRAPHS.length - 1 ? "pb-8 sm:pb-20" : "pb-6")}>
                  {text}
                </p>
              ))
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
