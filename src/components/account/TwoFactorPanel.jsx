"use client";

import { Eye, Mail } from "lucide-react";
import AccountShell from "@/components/account/AccountShell";
import { Button, cn, IconButton, TextField } from "@/components/ui";

const COPY = {
  enabled: {
    status: "Enabled",
    intro: "If you want to turn off 2FA, input your account password and the six-digit code provided by the Google Authenticator app below, then click",
    action: "Disable 2FA",
    help: "Enter your password and the six-digit code provided by the Google Authenticator app to Disable the 2FA verification",
    href: "/account/2fa-disable",
  },
  disabled: {
    status: "Disabled",
    intro: "If you want to turn on 2FA, input your account password and the six-digit code provided by the Google Authenticator app below, then click",
    action: "Enable 2FA",
    help: "Enter your password and scan SQ code by the Google Authenticator app to Enable the 2FA verification",
    href: "/account/2fa-enable",
  },
};

/** 2FA settings screen (UI only; the backend flow isn't wired up yet). */
export default function TwoFactorPanel({ enabled }) {
  const copy = COPY[enabled ? "enabled" : "disabled"];
  const passwordField = (
    <TextField
      label="Password"
      type="password"
      className="mt-4 mb-2"
      placeholder="Password"
      autoComplete="off"
      autoFocus
      endAdornment={
        <IconButton aria-label="Show password">
          <Eye className="size-5" />
        </IconButton>
      }
    />
  );

  return (
    <AccountShell title="2FA">
      <div className="pb-5 md:pb-[5px]">
        <h3 className="py-6 font-display font-semibold max-md:text-[32px]!">
          2FA <span className={cn("font-display", enabled ? "text-success" : "text-danger")}>{copy.status}</span>
        </h3>
        <p className="text-xs! text-n4!">
          {copy.intro} <span className="font-medium text-fg">&quot;{copy.action}&quot;</span>.
        </p>
      </div>
      <h5 className="pt-10 pb-4 font-semibold">{copy.action}</h5>
      <p className="pb-6 text-sm!">{copy.help}</p>
      <p className="flex items-center gap-2 py-4 font-medium">
        <Mail className="size-5" /> schinner@ui8.net
      </p>

      {enabled ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[6fr_5fr]">
          {passwordField}
          <TextField label="2FA Code" className="mt-4 mb-2" id="fa" name="fa" autoComplete="off" />
        </div>
      ) : (
        <>
          {passwordField}
          <div className="mt-6 flex justify-center sm:mt-8">
            <div className="rounded-2xl bg-n8 p-6 text-center dark:bg-n3">
              <img src="/assets/images/scanner.png" alt="scanner" className="mx-auto" />
              <Button variant="outlined" className="mx-auto mt-12 border-n6 px-[15px] py-[9px] dark:border-n4">
                Download App
              </Button>
            </div>
          </div>
        </>
      )}

      <div className="py-6 text-right sm:pt-8">
        <Button href={copy.href} variant={enabled ? "danger" : "success"} className="px-6 py-2.5 max-md:w-full">
          {copy.action}
        </Button>
      </div>
    </AccountShell>
  );
}
