"use client";

import dayjs from "dayjs";
import parse from "html-react-parser";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { communityActions } from "@/_actions";
import { communityAtom, loaderAtom } from "@/_state";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageHeader from "@/components/PageHeader";
import { Container, LoadingOverlay } from "@/components/ui";
import { itemImage } from "@/lib/content";

export default function Community() {
  const actions = communityActions();
  const reviews = useAtomValue(communityAtom);
  const loader = useAtomValue(loaderAtom);

  useEffect(() => {
    actions.community();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative z-[1] mt-14 sm:mt-16">
        <CryptoTickerMarquee />
      </div>
      <LoadingOverlay open={loader} />
      <div className="bg-page">
        <Container>
          <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Community" }]} />
          <PageHeader title={`Top Crypto Experts Reviews for ${new Date().getFullYear()}`} className="pt-0" titleClassName="max-w-[700px]" />

          <div className="grid grid-cols-2 gap-[30px] max-md:grid-cols-1">
            {reviews?.map((item, i) => {
              const image = itemImage(item);
              return (
                <div key={item.id ?? i} className="rounded-[15px] bg-n8 px-[30px] py-10 shadow-[0_6px_25px_rgba(15,15,15,0.1)] dark:bg-n2">
                  <div className="mb-6 flex items-center gap-5">
                    {image && (
                      <div className="h-[50px] w-full max-w-[50px]">
                        <img src={image} alt="" className="size-[50px] rounded-full bg-[#f5f5f5] object-cover" />
                      </div>
                    )}
                    <div className="w-full">
                      <div className="flex justify-between">
                        <small className="text-xs font-semibold text-n4 uppercase">{item.title}</small>
                        <small className="text-xs font-semibold text-n4 uppercase">{dayjs(item.created_at).format("MMM/DD/YYYY")}</small>
                      </div>
                      <h5>{item.exp_review}</h5>
                    </div>
                  </div>
                  <div className="line-clamp-2 h-[200px] overflow-auto pr-2.5 text-justify text-sm text-n4 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:bg-n4 [&_p]:text-sm! [&_p]:text-n4!">
                    {parse(item.decription || "")}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs!">
            * TheCoinChain accepts no liability for content of the comments or reviews made by the site users. The entire responsibility for the contents rests with the authors.
          </p>
        </Container>
      </div>
    </>
  );
}
