"use client";

import parse from "html-react-parser";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTutorialActions } from "@/_actions";
import { blogimgAtom, blogListAtom, breadCrumbAtom, tutorialCategoryAtom } from "@/_state";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import StayInTheKnow from "@/components/StayInTheKnow";
import { cn, Container, Select, Tabs } from "@/components/ui";
import { itemImage } from "@/lib/content";

/** Category filter: underline tabs on desktop, a select on mobile. */
function CategoryFilter({ categories, value, onChange }) {
  const options = [{ value: "1", label: "All" }, ...categories.map((c) => ({ value: c.title, label: c.title }))];
  return (
    <>
      <Tabs className="gap-4 max-md:hidden" variant="underline" tabClassName="py-3 text-sm font-medium uppercase" items={options} value={value} onChange={onChange} />
      <Select className="mb-2.5 hidden w-full max-md:block" value={value} onChange={onChange} options={options} />
    </>
  );
}

function EntryList({ items, onOpen }) {
  return items.map((item, i) => {
    const image = itemImage(item);
    return (
      <div key={item.id ?? i} onClick={() => onOpen(item)} className="mb-[30px] grid cursor-pointer grid-cols-1 sm:grid-cols-[5fr_7fr] md:mb-0">
        <div className="flex flex-col justify-between pr-[30px] md:pr-[50px]">
          <div>
            <span className="mb-2.5 inline-block h-5 min-w-[50px] rounded-[5px] bg-danger px-2 text-center text-xs leading-[1.8] font-semibold text-white uppercase md:mb-[50px]">
              New
            </span>
          </div>
          <div className="mb-2.5 md:mb-[50px]">
            <h4 className="max-h-20 overflow-hidden pb-2.5 font-display font-bold md:pb-[50px]">{item.title}</h4>
            <p className="mb-2.5 md:mb-[50px]">{item.category}</p>
            <div className="max-h-[45px] overflow-hidden text-sm text-n4">{parse(item.description || "")}</div>
          </div>
          <ArrowRight className="size-6" />
        </div>
        <div>{image && <img src={image} alt="" className="max-h-[330px] w-full object-cover" />}</div>
      </div>
    );
  });
}

function Section({ heading, categories, entries, onOpen }) {
  const [category, setCategory] = useState("1");
  const visible = category === "1" ? entries : entries.filter((e) => e.category === category);

  return (
    <div className="pb-6">
      <div className="sm:w-5/12">
        <h2 className="font-display">{heading}</h2>
        <p className="py-8">New to crypto? Not for long — start with these guides and explainers</p>
      </div>
      <CategoryFilter categories={categories} value={category} onChange={setCategory} />
      <div className="mt-20 max-md:mt-12">
        <EntryList items={visible} onOpen={onOpen} />
      </div>
    </div>
  );
}

/**
 * Two-tab content listing (Guides/Analytics, News/Promotions).
 * Each tab: { label, heading, categoryType, entries, crumb, detailPage }.
 * `detailBase` is the detail route prefix, e.g. "/guides-and-analytics-detail".
 */
export default function ContentHub({ title, subtitle, tabs, detailBase, onLoad }) {
  const router = useRouter();
  const categoryActions = useTutorialActions();
  const categories = useAtomValue(tutorialCategoryAtom);
  const [breadcrumb, setBreadCrumb] = useAtom(breadCrumbAtom);
  const setBlogImg = useSetAtom(blogListAtom);
  const setBlogNew = useSetAtom(blogimgAtom);

  // Coming back from an article in the second tab reopens that tab.
  const [active, setActive] = useState(breadcrumb === tabs[1].crumb ? 1 : 0);

  useEffect(() => {
    onLoad?.();
    categoryActions.categoryList();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tab = tabs[active];
  const openEntry = (item) => {
    setBreadCrumb(tab.crumb);
    setBlogImg(item);
    setBlogNew(true);
    router.push(`${detailBase}/${tab.detailPage}/${item.slug}`);
  };

  return (
    <>
      <div className="relative z-[1] mt-14 sm:mt-16">
        <CryptoTickerMarquee />
      </div>

      <Container className="pt-12">
        <h1 className="text-center font-display font-bold">{title}</h1>
        <p className="text-center text-2xl! text-n4! max-md:text-base!">{subtitle}</p>

        <div role="tablist" className="mt-4 flex justify-center gap-5">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn("min-h-12 border border-line px-4 py-3 text-sm font-medium uppercase transition-colors", active === i ? "bg-primary text-white" : "text-fg")}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-20 max-md:mt-12">
          <Section
            key={active}
            heading={tab.heading}
            categories={categories.filter((c) => c.type === tab.categoryType)}
            entries={tab.entries || []}
            onOpen={openEntry}
          />
        </div>
      </Container>

      <StayInTheKnow />
    </>
  );
}
