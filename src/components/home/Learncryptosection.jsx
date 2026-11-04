"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const IMG = "/assets/images/coinchain-img";

// Sabhi cards me yehi image use hoti hai (item.image dene par wo override ho jati hai)
const LEARN_CRYPTO_IMAGE = `${IMG}/LearnCrypto.png`;

const TITLE = "Technical Analysis and Elliott Wave Analysis and Price Prediction";

const DEFAULT_LESSONS = [
  { id: 1, title: TITLE, href: "/learn-crypto/technical-analysis-1" },
  { id: 2, title: TITLE, href: "/learn-crypto/technical-analysis-2" },
  { id: 3, title: TITLE, href: "/learn-crypto/technical-analysis-3" },
  { id: 4, title: TITLE, href: "/learn-crypto/technical-analysis-4" },
  { id: 5, title: TITLE, href: "/learn-crypto/technical-analysis-5" },
  { id: 6, title: TITLE, href: "/learn-crypto/technical-analysis-6" },
];

function LessonCard({ item }) {
  return (
    <Link href={item.href} className="group flex flex-col gap-4 no-underline">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <img
          src={item.image || LEARN_CRYPTO_IMAGE}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Play button */}
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-black/55 backdrop-blur-[2px] transition-transform duration-300 group-hover:scale-110 sm:size-12">
          <Play className="size-4 translate-x-px fill-white text-white sm:size-[18px]" />
        </span>
      </div>

      <h3 className="m-0 line-clamp-2 font-[Manrope] text-[16px] md:text-[18px] font-medium leading-snug text-[#111318] transition-colors group-hover:text-[#B8860B] sm:text-[20px] dark:text-white">
        {item.title}
      </h3>
    </Link>
  );
}

export default function LearnCryptoSection({ items = DEFAULT_LESSONS, exploreHref = "/learn-crypto" }) {
  return (
    <section className="bg-[#F8F9FB] py-[35px] transition-colors sm:py-[40px] lg:py-[50px] dark:bg-[#141416]">
      <div className="mx-auto container px-3 md:px-0">
        {/* ---------- Heading ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="min-w-0 flex-1">
            <h2 className="m-0 font-[Manrope] text-[26px] font-extrabold leading-tight text-[#111318] sm:text-[32px] dark:text-white">
              Learn <span className="text-[#F7931A]">Crypto</span>
            </h2>
            <p className="mb-0 mt-3 max-w-[640px] font-[Inter] text-[14px] font-normal leading-normal text-[#667085] sm:text-[16px] dark:text-white/60">
              Simple guides, explainers and videos for every level.
            </p>
          </div>

          <Link
            href={exploreHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[linear-gradient(270deg,#D7AE42_0%,#F0D667_33%,#F0D667_65.7%,#D7AE42_100%)] px-4 py-2.5 font-[Manrope] text-[14px] font-semibold text-[#111318] no-underline transition-opacity hover:opacity-90 border border-transparent hover:border-[#010101] dark:hover:border-white"
          >
            Explore All
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* ---------- Cards: 1 / 2 / 3 columns ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 min-[560px]:grid-cols-2 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-9">
          {items.map((item) => (
            <LessonCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}