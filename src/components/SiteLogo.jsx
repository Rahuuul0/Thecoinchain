"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { bannerListActions } from "@/_actions";
import { setLogoListAtom, switchDarkModeAtom } from "@/_state";
import { cn } from "@/components/ui";

/**
 * Logo URL from the CMS with instant local fallback.
 * The "Header" logo is the light-on-dark variant,
 * the "Footer" one is dark-on-light.
 */
export function useSiteLogo() {
  const isDarkMode = useAtomValue(switchDarkModeAtom);
  const logoList = useAtomValue(setLogoListAtom);
  const { logoList: fetchLogoList } = bannerListActions();

  useEffect(() => {
    if (!logoList?.length) fetchLogoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultLogo = isDarkMode ? "/assets/images/thecoinchain-logo-dark.svg" : "/assets/images/thecoinchain-logo-light.svg";
  const logo = logoList?.find?.((item) => item.position === (isDarkMode ? "Header" : "Footer"));
  if (!logo) return defaultLogo;
  return logo.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${logo.image}` : logo.image_link || defaultLogo;
}

export default function SiteLogo({ className, href = "/", onClick }) {
  const pathname = usePathname();
  const src = useSiteLogo();
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  const handleClick = (e) => {
    onClick?.(e);
    if (pathname === "/" || pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link href={href} onClick={handleClick} aria-label="The Coin Chain home" className={cn("relative flex h-[45px] items-center", className)}>
      <img
        ref={imgRef}
        key={src}
        src={src}
        alt="The Coin Chain"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          "max-h-[45px] w-full rounded-[15px] object-contain transition-opacity duration-200",
          loaded ? "opacity-100" : "opacity-90"
        )}
      />
    </Link>
  );
}
