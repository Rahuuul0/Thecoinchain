"use client";

import parse from "html-react-parser";
import { useAtomValue } from "jotai";
import { ArrowRight, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { notificationActions } from "@/_actions/notification.actions";
import { notificationViewAtom } from "@/_state";
import { Button, Checkbox, Container } from "@/components/ui";

const CATEGORIES = ["Crypto Prediction", "Community", "Academy", "News"];
const btn = "px-4 py-1.5";

function PromoCard({ image, title, text, cta }) {
  return (
    <div className="flex flex-1 gap-8 max-[992px]:min-w-[222px] max-[992px]:flex-wrap">
      <div className="min-w-32 max-[992px]:w-full">
        <img src={image} alt={title} className="max-[992px]:max-h-[370px] max-[992px]:w-full max-[992px]:object-contain" />
      </div>
      <div>
        <h5 className="mb-2 text-2xl! font-semibold">{title}</h5>
        <p className="mb-4 text-sm! text-n4!">{text}</p>
        <Button variant="outlined" href="/contentnotfound" className={btn}>
          {cta} <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}

export default function Notifications() {
  const notificationAction = notificationActions();
  const notifications = useAtomValue(notificationViewAtom);
  const [visible, setVisible] = useState(10);
  const [selected, setSelected] = useState([]);
  const readLock = useRef(false);

  useEffect(() => {
    notificationAction.notificationList_View();
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilter = (categories) => {
    setSelected(categories);
    if (categories.length) notificationAction.categoryNotifications(categories);
    else notificationAction.notificationList_View();
  };

  const toggleCategory = (category, checked) => applyFilter(checked ? [...selected, category] : selected.filter((c) => c !== category));

  // Mark as read on click, at most once every 1.5s.
  const markRead = (item) => {
    if (readLock.current || item.ct_notify_read_status != null) return;
    readLock.current = true;
    setTimeout(() => (readLock.current = false), 1500);
    notificationAction.notificationSingleread(item.ct_notiy_id);
  };

  const allSelected = selected.length === CATEGORIES.length;

  return (
    <div className="mt-16 bg-n7 py-8 max-md:bg-page max-md:py-0 dark:bg-n1">
      <Container>
        <div className="rounded-lg bg-n8 p-10 max-md:p-0 dark:bg-ink">
          <div className="flex items-center justify-between max-sm:flex-wrap">
            <h4 className="font-display text-[32px]! font-bold max-sm:mb-5">Notifications</h4>
            {notifications.length > 0 && (
              <div className="flex justify-between gap-5 max-[481px]:w-full max-[481px]:justify-start">
                <Button variant="outlined" className={btn} onClick={() => notificationAction.clearNotifications({ action: "all_read" })}>
                  Mark all as read
                </Button>
                <Button variant="outlined" className={btn} onClick={() => notificationAction.clearNotifications({ action: "all_clear" })}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
          <div className="my-8 h-px w-full bg-line" />

          <div className="grid grid-cols-[1fr_352px] gap-20 max-[1025px]:grid-cols-[1fr_230px] max-[992px]:grid-cols-1">
            <div className="max-[992px]:order-2">
              {notifications.length > 0 ? (
                notifications.slice(0, visible).map((item, i) => (
                  <div
                    key={item.ct_notiy_id ?? i}
                    onClick={() => markRead(item)}
                    className={`mb-[15px] flex items-start gap-4 border-b border-line pb-[15px] last:border-0 ${item.ct_notify_read_status == null ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className="flex size-11 min-w-11 items-center justify-center rounded-full border-2 border-line text-n4">
                      <Zap className="size-5" />
                    </div>
                    <div className="w-full">
                      <div className="flex items-start justify-between">
                        <div>
                          <h6 className="text-base! font-medium">{item.ct_notify_title}</h6>
                          <small className="text-n4">{item.ct_notify_catrgory}</small>
                        </div>
                        <div className="ml-auto flex items-center gap-4 max-[992px]:items-start">
                          <small className="font-medium text-n4">{item.ct_notify_created_At}</small>
                          <span className={`block size-3 rounded-full ${item.ct_notify_read_status != null ? "bg-n4" : "bg-success"}`} />
                        </div>
                      </div>
                      <div className="line-clamp-2 h-20 overflow-auto text-sm [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:bg-n4 [&_p]:text-sm!">{parse(item.ct_notify_msg || "")}</div>
                    </div>
                  </div>
                ))
              ) : (
                <span>No New Notifications Available</span>
              )}

              {notifications.length > visible && (
                <Button variant="outlined" onClick={() => setVisible(notifications.length)} className={`mx-auto flex ${btn}`}>
                  Load more <img src="/assets/images/icons/cale-ic.svg" alt="" />
                </Button>
              )}
            </div>

            <div className="max-[992px]:order-1 max-md:hidden">
              <h5 className="mb-6 text-2xl! font-semibold">Filters</h5>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((category) => (
                  <Checkbox key={category} label={category} checked={selected.includes(category)} onChange={(e) => toggleCategory(category, e.target.checked)} />
                ))}
              </div>
              <div className="mt-6 flex gap-2.5">
                <Button variant="outlined" className={btn} onClick={() => applyFilter(allSelected ? [] : CATEGORIES)}>
                  {allSelected ? "Unselect all" : "Select all"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-[30px] rounded-lg bg-n8 p-10 max-[992px]:overflow-x-auto max-[992px]:px-0 max-[992px]:py-5 dark:bg-ink">
          <PromoCard image="/assets/images/deposit.svg" title="Bank deposit" text="Deposit crypto or cash currency to your wallet and start trading on the world largest exchange!" cta="Bank deposit" />
          <PromoCard image="/assets/images/transfer.svg" title="Transfer" text="Internal transfers are free on The coin Chain." cta="Transfer coin" />
        </div>
      </Container>
    </div>
  );
}
