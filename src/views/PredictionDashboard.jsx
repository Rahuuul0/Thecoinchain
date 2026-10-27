"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { ArrowDown, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { faqActions } from "@/_actions";
import { RoutesName } from "@/_common/app.constants";
import { blogimgAtom, blogListAtom, faqAtom } from "@/_state";
import { Button, Container, Tooltip } from "@/components/ui";
import { itemImage } from "@/lib/content";
import CryptoTable from "./CryptoTable";

export default function PredictionDashboard() {
  const router = useRouter();
  const faqAction = faqActions();
  const faq = useAtomValue(faqAtom);
  const setBlogImg = useSetAtom(blogListAtom);
  const setBlogNew = useSetAtom(blogimgAtom);
  const [visible, setVisible] = useState(6);
  const [search, setSearch] = useState("");

  useEffect(() => {
    faqAction.get();
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openFaq = (item) => {
    setBlogImg(item);
    setBlogNew(true);
    router.push(`${RoutesName.FaqDetail}/predictionDashboard/${item.slug}`);
  };

  return (
    <div className="mt-16">
      <div className="pt-9">
        <Container>
          <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h4 className="m-0 font-display font-bold max-md:text-2xl! max-md:font-semibold">Cryptocurrency Market Cap</h4>
            <label className="flex h-10 w-full items-center gap-1.5 rounded-lg border border-n6 bg-n7 px-3 text-sm focus-within:border-[1.5px] focus-within:border-primary hover:border-[#B1B5C3] sm:w-[260px] md:w-[300px] dark:border-white/15 dark:bg-[#1e2230] dark:hover:border-white/30">
              <Search className="size-5 shrink-0 text-n4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search all coins by name"
                className="min-w-0 flex-1 bg-transparent text-n1 outline-none placeholder:text-n4 dark:text-white"
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} aria-label="clear search" className="p-1">
                  <X className="size-4 text-n4" />
                </button>
              )}
            </label>
          </div>

          <CryptoTable search={search} />

          <div className="fixed right-4 bottom-20 z-[999] sm:right-6 sm:bottom-[90px] md:right-8 md:bottom-[100px]">
            <Tooltip title="Scroll to pagination" placement="left">
              <button
                type="button"
                onClick={() => document.getElementById("prediction-pagination")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                aria-label="scroll to table pagination"
                className="flex size-11 items-center justify-center rounded-full border-2 border-[#8e95a5] bg-white/92 text-[#6e7687] shadow-[0_4px_14px_rgba(0,0,0,0.12)] backdrop-blur-[6px] transition-all duration-200 hover:translate-y-[3px] hover:border-primary hover:bg-[#f0f5ff] hover:text-primary hover:shadow-[0_6px_18px_rgba(55,114,255,0.25)] dark:bg-[rgba(29,31,43,0.92)] dark:text-[#a0a5b5] dark:hover:bg-primary/15"
              >
                <ArrowDown className="size-[22px]" />
              </button>
            </Tooltip>
          </div>
        </Container>

        <div className="mt-[15px] bg-n7 dark:bg-n2">
          <Container>
            <h5 className="text-2xl! font-semibold text-n4 max-md:text-sm! max-md:font-medium">FAQ</h5>
          </Container>
          <div className="bg-page py-8">
            <Container>
              <div className="grid grid-cols-3 gap-8 max-[1025px]:grid-cols-2 max-[681px]:grid-cols-1">
                {faq.slice(0, visible).map((item, i) => {
                  const image = itemImage(item);
                  return (
                    <div key={item.id ?? i} onClick={() => openFaq(item)} className="flex cursor-pointer gap-5 max-md:flex-wrap">
                      <div className="min-h-24 w-32 min-w-32 rounded-[15px] bg-[#f5f5f5] text-center max-md:w-full">
                        {image && <img src={image} alt="FAQ" className="mx-auto h-full max-h-[120px] w-auto object-cover max-sm:max-h-[175px] max-sm:w-full" />}
                      </div>
                      <div>
                        <small className="text-xs text-n4">{item.category}</small>
                        <p className="max-h-[25px] overflow-hidden text-sm! font-medium">{item.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {faq.length > 6 && faq.length > visible && (
                <Button variant="outlined" onClick={() => setVisible((n) => n + 20)} className="mt-4 px-[15px] py-[9px]">
                  View All
                </Button>
              )}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
