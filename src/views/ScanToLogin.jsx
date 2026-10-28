"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { RoutesName } from "@/_common/app.constants";
import { AuthDivider, AuthShell, AuthTitle, EnsureUrl } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui";

export default function ScanToLogin() {
  return (
    <AuthShell
      backHref={RoutesName.login}
      headerAction={
        <>
          Don’t have an account? <Link href="/create-account">Sign up for free</Link>
        </>
      }
    >
      <AuthTitle>Sign in to The Coin Chain</AuthTitle>
      <EnsureUrl path="accounts.TheCoinChain/login" />
      <AuthDivider />
      <small className="mb-5 block text-center text-[#777E91]">
        Please use your <b>The Coin Chain</b> app to scan BC code to log in .
      </small>
      <div className="mt-6 flex justify-center sm:mt-8">
        <div className="rounded-2xl bg-n8 p-6 text-center dark:bg-n3">
          <img src="/assets/images/scanner.png" alt="scanner" className="mx-auto" />
          <Button variant="outlined" className="mx-auto mt-12 border-n6 px-[15px] py-[9px] text-lg dark:border-n4">
            Coming Soon
          </Button>
        </div>
      </div>
      <Button href={RoutesName.login} fullWidth className="mt-[30px] px-[15px] py-2.5 text-lg">
        <ChevronLeft className="size-5" />
        Go Back
      </Button>
    </AuthShell>
  );
}
