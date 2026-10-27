"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authAtom, storeHydratedAtom } from "@/_state";
import { Spinner } from "@/components/ui";

/** Redirects to /login once the stored session is known to be missing. */
export default function AuthGuard({ children }) {
  const auth = useAtomValue(authAtom);
  const hydrated = useAtomValue(storeHydratedAtom);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !auth) router.replace("/login");
  }, [hydrated, auth, router]);

  if (!hydrated || !auth) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return children;
}
