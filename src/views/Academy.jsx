"use client";

import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import PageHeader from "@/components/PageHeader";
import { Button, Container } from "@/components/ui";

const COURSES = [
  { title: "All About Crypto", href: "/academy-about-crypto" },
  { title: "Master Course", href: "/master-course" },
];

export default function Academy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="relative z-[1] mt-14 sm:mt-16">
        <CryptoTickerMarquee />
      </div>
      <div className="bg-page">
        <Container>
          <PageHeader title="Academy" className="pt-0" titleClassName="max-w-[700px]" crumbs={[{ label: "Home", href: "/" }, { label: "Academy" }]} />
        </Container>
        <Container>
          <div className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
            {COURSES.map((course) => (
              <div key={course.title}>
                <img src="/assets/images/leveragedv3.svg" alt="" />
                <div className="block justify-between gap-4 pt-6 md:flex">
                  <div>
                    <div className="font-display text-[32px] font-bold">{course.title}</div>
                    <div className="py-4 text-base text-n4">Good things come in 3s. Get 3x Leveraged tokens now.</div>
                  </div>
                  <Button variant="outlined" href={course.href} className="h-[50px] border border-n6 px-6">
                    Learn more <ChevronRight className="size-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
