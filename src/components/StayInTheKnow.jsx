"use client";

import { Button, Container } from "@/components/ui";
import { useSiteLogo } from "./SiteLogo";

/** "Stay in the know" promo with the community card, shown under content listings. */
export default function StayInTheKnow() {
  const logoSrc = useSiteLogo();

  return (
    <div className="bg-n7 py-[60px] max-[1025px]:py-28 max-md:py-16 dark:bg-n1">
      <Container>
        <div className="text-center">
          {logoSrc && <img src={logoSrc} alt="The Coin Chain" className="mx-auto max-w-[142px]" />}
          <h2 className="pb-6 text-center font-display font-bold max-md:text-[48px]!">
            Stay in the know on
            <br /> crypto with The Coin Chain
          </h2>
          <p className="text-n4!">A creative agency that lead and inspire</p>
        </div>

        <div className="mx-16 mt-20 mb-6 rounded-3xl bg-n8 p-[50px] shadow-[0_6px_25px_rgb(15_15_15/10%)] max-md:mx-0 max-md:mt-6 max-md:bg-transparent max-md:p-0 max-md:text-center max-md:shadow-none dark:bg-n2">
          <div className="grid grid-cols-1 gap-16 max-md:flex max-md:flex-col-reverse sm:grid-cols-2 md:gap-6">
            <div>
              <small className="block pb-4 text-n4 uppercase">Crypto news</small>
              <h4 className="pb-6 text-2xl!">Be Part of our Global Community</h4>
              <p className="pb-16 text-n4! sm:pb-24">
                Let’s stay in touch. Join our communities to keep up with the <b>The Coin Chain</b> team and our traders from across the world.
              </p>
              <Button variant="outlined" href="/community" className="px-[15px] py-[9px]">
                Join now
              </Button>
            </div>
            <div className="text-right">
              <img src="/assets/images/globe.svg" alt="" className="ml-auto w-full" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
