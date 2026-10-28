"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bannerListActions } from "@/_actions";
import { setLogoListAtom, switchDarkModeAtom } from "@/_state";
import { cn, Spinner } from "@/components/ui";

/**
 * Logo URL from the CMS. The "Header" logo is the light-on-dark variant,
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

  const logo = logoList?.find?.((item) => item.position === (isDarkMode ? "Header" : "Footer"));
  if (!logo) return "";
  return logo.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${logo.image}` : logo.image_link || "";
}

export default function SiteLogo({ className, href = "/", onClick }) {
  const src = useSiteLogo();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [src]);

  return (
    <Link href={href} onClick={onClick} aria-label="The Coin Chain home" className={cn("relative flex h-[45px] items-center", className)}>
      {!loaded && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size={24} />
        </span>
      )}
      {src && (
        <img
          key={src}
          src={src}
          alt="The Coin Chain"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={cn("max-h-[45px] w-full rounded-[15px] object-contain", !loaded && "invisible")}
        />
      )}
    </Link>
  );
}
