"use client";

import parse from "html-react-parser";
import { useAtomValue } from "jotai";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useHomeActions } from "@/_actions";
import { useAlertActions } from "@/_actions/alert.actions";
import { Labels, RoutesName } from "@/_common/app.constants";
import { authAtom, cryptoTraderAtom, storeHydratedAtom } from "@/_state";
import CheckoutPayment from "@/components/CheckoutPayment";
import { Button, Container } from "@/components/ui";
import { itemImage } from "@/lib/content";

export default function Subscription() {
  const router = useRouter();
  const alertActions = useAlertActions();
  const homeActions = useHomeActions();
  const auth = useAtomValue(authAtom);
  const hydrated = useAtomValue(storeHydratedAtom);
  const traders = useAtomValue(cryptoTraderAtom);

  // Subscribing needs an account.
  useEffect(() => {
    if (hydrated && !auth) {
      router.push(RoutesName.login);
      alertActions.error(Labels.Un_Subscribed_User);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, auth]);

  useEffect(() => {
    homeActions.cryptoTrader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-16 bg-page">
      <Container>
        <div className="flex items-center justify-between bg-page py-10 max-md:flex-wrap max-md:py-8">
          <h2 className="relative font-display max-[1025px]:text-[40px]! max-md:pl-[30px] max-md:text-[32px]! max-md:before:absolute max-md:before:top-2.5 max-md:before:left-0 max-md:before:text-lg max-md:before:content-['❮']">
            Subscriptions
          </h2>
          <small className="flex items-center gap-2.5 text-sm font-medium text-n4">
            How to buy crypto on The Coin Chain
            <Link href="/learn-cypto" className="flex items-center text-n3!">
              Learn now <ChevronRight className="w-4" />
            </Link>
          </small>
        </div>
      </Container>

      <div className="border-t border-line bg-n7 pt-20 pb-[136px] max-[1025px]:pb-8 max-md:bg-page max-md:pt-0 max-md:pb-[34px] dark:bg-n1">
        <Container>
          <CheckoutPayment />
        </Container>
      </div>

      <div className="bg-n7 max-[1025px]:py-28 max-md:py-16 dark:bg-ink">
        <Container>
          <h2 className="mx-auto max-w-[500px] text-center font-display text-[40px]! font-bold max-md:text-left">Become a crypto trader in seconds</h2>
          <p className="pt-4 text-left text-n4! md:text-center">We&apos;ve got everything you need to start trading.</p>
          <div className="grid grid-cols-1 gap-x-2 gap-y-2 py-12 sm:grid-cols-3 sm:gap-x-4 sm:py-16 md:gap-x-6">
            {traders?.map((item, i) => {
              const image = itemImage(item);
              return (
                <div key={item.id ?? i} className="rounded-[15px] bg-n8 px-[30px] py-10 text-center shadow-[0_6px_25px_rgb(15_15_15/10%)] dark:bg-n2">
                  {image && <img src={image} alt="" className="mx-auto h-40" />}
                  <h6 className="pb-6">{item.title}</h6>
                  <div className="pb-6 text-sm text-n4">{parse(item.description || "")}</div>
                  <Button variant="outlined" href={item.link || "#"} className="mx-auto px-[15px] py-[9px]">
                    Coming Soon
                  </Button>
                </div>
              );
            })}
          </div>
          <Button href="/contact" className="w-full">
            Contact Us
          </Button>
        </Container>
      </div>
    </div>
  );
}
