"use client";

import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { subscriptionActions } from "@/_actions";
import { forecastSubAtom } from "@/_state";
import AccountShell from "@/components/account/AccountShell";
import { Button } from "@/components/ui";

function PlanCard({ title, price, description }) {
  return (
    <div className="mt-[22px] rounded border border-black/12 bg-white text-center shadow-[0_2px_4px_rgba(0,0,0,0.075)] dark:bg-n3">
      <h4 className="rounded-t-[3px] border-b border-black/12 bg-black/3 p-2 font-display font-bold text-fg max-md:text-2xl! max-md:font-semibold">{title}</h4>
      <div className="p-4">
        <h4 className="mb-12 font-display font-bold text-fg">{price}</h4>
        <p className="text-sm!">{description}</p>
      </div>
      <div className="rounded-b-[3px] border-t border-black/12 bg-black/3 px-4 pt-[9px] pb-2 text-center">
        <p className="text-sm! font-normal">You are subscribed to this plan</p>
      </div>
    </div>
  );
}

export default function ForecastSubscriptions() {
  const subscriptionApi = subscriptionActions();
  const user = useAtomValue(forecastSubAtom);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    subscriptionApi.subscribedUser();
    subscriptionApi.subscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [cancelled]);

  const unsubscribe = () => {
    setCancelled(true);
    subscriptionApi.unsubscribeUser();
  };

  const planDays = (text) => <span className="font-sans text-2xl font-normal text-[#6c757d]">{text}</span>;

  return (
    <AccountShell title="Subscriptions" contentClassName="pb-8 shadow-[0_64px_64px_-48px_rgba(15,15,15,0.1)]">
      {!cancelled && (
        <div className="flex flex-col items-start pb-6">
          <h2 className="font-display text-[40px]! text-fg dark:text-n4">
            <span className="font-display text-[40px] text-danger">Forecast </span> Subscriptions
          </h2>
        </div>
      )}

      <div className="mt-4">
        {user?.status === "running" ? (
          !cancelled && (
            <div>
              <p className="w-1/3 py-3">Plan Details</p>
              <PlanCard
                title={user.plan_type}
                price={
                  <>
                    {user.amount} {planDays(`/ ${user.plan_type}`)}
                  </>
                }
                description="Gat all crypto price predictions & Trade with Machine learning"
              />
              <p className="mt-8 text-xs! text-[#6C757D]!">
                By pressing “unsubscribe”, you are immediately terminating the payments/access to the paid content once your plan finishes. To regain full access to the content, a new subscription is required.
              </p>
              <div className="mt-[33px] flex">
                <Button onClick={unsubscribe} className="mx-auto mt-6 px-[15px] py-2.5">
                  Unsubscribe
                </Button>
              </div>
            </div>
          )
        ) : (
          <div>
            <p className="w-1/3 py-3">Details</p>
            <PlanCard title="Free Plan" price={planDays(" Free")} description="Free market chart view & Tutorials for crypto" />
            <div className="mt-[33px] flex">
              <Button href="/subscription" className="mx-auto px-[15px] py-2.5">
                Upgrade
              </Button>
            </div>
          </div>
        )}

        {cancelled && (
          <div className="text-center">
            <img src="/assets/images/subs.svg" alt="" className="mx-auto" />
            <div className="text-sm text-n4">Your subscription and recurring payment has been canceled.</div>
            <div className="flex justify-center gap-6 py-8">
              <Button variant="outlined" href="/" className="px-[15px] py-[9px]">
                Home
              </Button>
              <Button variant="dark" href="/subscription" className="px-[15px] py-[9px]">
                Resubscribe
              </Button>
            </div>
          </div>
        )}
      </div>
    </AccountShell>
  );
}
