"use client";

import dayjs from "dayjs";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useTutorialActions } from "@/_actions";
import { RoutesName } from "@/_common/app.constants";
import { blogimgAtom, blogListAtom, blogVideoAtom, breadCrumbAtom, marketBlogListAtom } from "@/_state";
import { Button, cn, Select } from "@/components/ui";

const BADGE_COLORS = ["bg-purple", "bg-success", "bg-primary"];

/** "Learn And Earn" video cards on the market pages. */
export default function LearnNEarn({ className }) {
  const router = useRouter();
  const tutorialAction = useTutorialActions();
  const posts = useAtomValue(marketBlogListAtom);
  const setBlogImg = useSetAtom(blogListAtom);
  const setBlogNew = useSetAtom(blogimgAtom);
  const setBlogVideo = useSetAtom(blogVideoAtom);
  const setBreadCrumb = useSetAtom(breadCrumbAtom);
  const [visible, setVisible] = useState(3);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    tutorialAction.marketBlogList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openVideo = (item) => {
    setBreadCrumb(item.category);
    setBlogImg(item);
    setBlogNew(true);
    setBlogVideo(true);
    router.push(`${RoutesName.Marketblog_detail}/learnandearn/${item.slug}`);
  };

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => setVisible((n) => n + 50), 400);
  };

  return (
    <div className={cn("py-[136px] max-[1025px]:py-28 max-md:pt-16 max-md:pb-0", className)}>
      <div className="mb-16 px-[30%] text-center max-[1025px]:mb-12 max-[992px]:px-[20%] max-md:px-[25%] max-sm:px-[8%] max-[481px]:px-0">
        <h2 className="font-display text-n2 max-md:text-[40px]! dark:text-n8">Learn And Earn</h2>
        <p className="pt-4 text-n3! dark:text-n8!">Stacks is a production-ready library of stackablecontent blocks built in React Native.</p>
        <Select
          className="my-12 hidden text-left max-md:block"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "", label: "None" },
            { value: "10", label: "2D Design" },
            { value: "20", label: "3D Design" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
        {posts.slice(0, visible).map((item, i) => (
          <div key={item.id ?? i} onClick={() => openVideo(item)} className="flex-1 cursor-pointer border-b-2 border-line pt-5 pb-[50px] max-md:border-b-0 max-md:pb-0">
            <div className="mb-12 overflow-hidden rounded-2xl">
              <ReactPlayer src={item.video_link} controls light={item.image_link} playing={false} width="100%" height="200px" />
            </div>
            <span className={cn("rounded px-2 py-1.5 text-xs font-bold text-white uppercase", BADGE_COLORS[i % 3])}>{item.tag}</span>
            <p className="mt-[22px] mb-12 h-[70px] overflow-hidden text-2xl! font-semibold max-[1025px]:h-[108px] max-md:h-auto">{item.title}</p>
            <div className="flex items-center gap-2.5">
              <span className="size-6 rounded-full bg-success" />
              <small className="text-sm font-medium text-n4">{item.created_by}</small>
              <small className="ml-auto text-sm font-medium text-n4">{dayjs(item.created_at).format("MMM DD, YYYY")}</small>
            </div>
          </div>
        ))}
      </div>

      {posts.length >= 4 && visible <= 3 && (
        <Button variant="outlined" onClick={loadMore} disabled={loadingMore} className="mx-auto mt-16 flex w-40 px-[15px] py-[9px] max-[1025px]:mt-12">
          {loadingMore && "Loading"}
          <img src="/assets/images/icons/loading.svg" alt="" className={cn(loadingMore && "animate-spin", "dark:invert")} />
          {!loadingMore && "Load more"}
        </Button>
      )}
    </div>
  );
}
