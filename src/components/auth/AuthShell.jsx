"use client";

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useAtomValue } from "jotai";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { forwardRef, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { bannerListActions } from "@/_actions";
import { useUserActions } from "@/_actions/user.actions";
import { setLogoListAtom } from "@/_state";
import { Button, cn, IconButton, Tabs, TextField } from "@/components/ui";
import { AppleIcon, GoogleIcon } from "@/components/ui/BrandIcons";
import { inputBox } from "@/components/ui/TextField";
import { useSiteLogo } from "@/components/SiteLogo";
import { IMAGE_URL } from "@/lib/content";

/** Full-width submit button used on every auth form. */
export function AuthSubmit({ loading, children, className, ...props }) {
  return (
    <Button type="submit" loading={loading} fullWidth className={cn("mt-[30px] px-[15px] py-2.5 text-lg", className)} {...props}>
      {children}
    </Button>
  );
}

/** Dark split layout shared by login, sign-up and recovery screens. */
export function AuthShell({ headerAction, backHref = "/", wide = false, children }) {
  const logoList = useAtomValue(setLogoListAtom);
  const { logoList: fetchLogoList } = bannerListActions();
  const themedLogo = useSiteLogo();

  useEffect(() => {
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
    if (!logoList?.length) fetchLogoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The dark backdrop always uses the light-on-dark ("Header") logo.
  const headerLogo = logoList?.find?.((item) => item.position === "Header");
  const lightLogo = headerLogo?.image ? `${IMAGE_URL}/${headerLogo.image}` : headerLogo?.image_link || "";

  return (
    <main className="m-0 bg-n2 p-0">
      <div className="absolute top-0 left-0 flex w-[calc(100%-160px)] items-center justify-between p-20 max-[1025px]:w-[calc(100%-96px)] max-[1025px]:p-12 max-md:static max-md:w-full max-md:flex-wrap max-md:justify-center max-md:gap-6 max-md:bg-page max-md:p-6 max-md:pt-[60px]">
        <Link href="/" className="block w-[180px]">
          {lightLogo && <img src={lightLogo} alt="The Coin Chain" className="max-[1025px]:hidden" />}
          {themedLogo && <img src={themedLogo} alt="The Coin Chain" className="hidden max-w-[142px] max-[1025px]:block" />}
        </Link>
        {headerAction && <div className="relative z-[2] font-display text-sm font-bold text-n4">{headerAction}</div>}
      </div>

      <div className="flex min-h-screen">
        <div className="w-[30%] text-right max-[1025px]:hidden">
          <img src="/assets/images/auth-bg.svg" alt="" className="ml-auto max-h-[99vh]" />
        </div>
        <div className="relative ml-auto w-[70%] bg-page px-[2%] pt-[10%] pb-[2%] max-[1025px]:w-full max-[1025px]:pt-32 max-md:px-8 max-md:pt-[60px] max-md:pb-8">
          {backHref && (
            <div className="absolute top-0 sm:top-[30px] md:top-[90px]">
              <Link href={backHref} aria-label="Back" className="flex size-8 items-center justify-center rounded-full bg-primary text-n8!">
                <ChevronLeft className="size-6" />
              </Link>
            </div>
          )}
          <div className={cn("mx-auto", wide ? "max-w-[400px]" : "max-w-[380px]")}>{children}</div>
        </div>
      </div>
    </main>
  );
}

export function AuthTitle({ children }) {
  return <h5 className="mb-4 text-center font-bold">{children}</h5>;
}

/** "Please ensure you are visiting the correct url" pill. */
export function EnsureUrl({ path }) {
  return (
    <div>
      <span className="block text-xs text-[#777E91]">Please ensure you are visiting the correct url.</span>
      <div className="mt-3 flex items-center justify-center gap-1 rounded-full bg-n7 p-2.5 text-sm font-medium max-md:text-[13px] dark:bg-n2">
        <img src="/assets/images/icons/lock.svg" alt="lock" />
        <span className="text-success">https://</span> {path}
      </div>
    </div>
  );
}

export function AuthDivider() {
  return <div className="my-8 h-px w-full bg-line" />;
}

function GoogleButton({ action }) {
  const userActions = useUserActions();
  const login = useGoogleLogin({
    ux_mode: "redirect",
    onSuccess: (codeResponse) => (action === "auth" ? userActions.googleAuth(codeResponse) : userActions.googleLogin(codeResponse)),
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <Button fullWidth onClick={() => login()} className="px-[15px] py-2.5 text-lg">
      <span className="flex size-5 items-center justify-center rounded-full bg-white">
        <GoogleIcon className="size-3.5" />
      </span>
      Google
    </Button>
  );
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;

/** Google + Apple sign-in buttons. `googleAction` is "login" or "auth" (sign-up). */
export function OpenIdButtons({ label, googleAction = "login" }) {
  return (
    <div>
      <small className="mt-3 mb-5 block text-center text-[#777E91]">{label}</small>
      <div className="flex items-center justify-center gap-5 max-md:gap-2.5">
        {/* Google's SDK throws without a client id, so only mount it when configured. */}
        {GOOGLE_CLIENT_ID && (
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleButton action={googleAction} />
          </GoogleOAuthProvider>
        )}
        <Button variant="secondary" fullWidth className="px-[15px] py-[9px] text-lg">
          <AppleIcon className="size-5" />
          Apple
        </Button>
      </div>
    </div>
  );
}

/** Small pill tabs (Email / Mobile). */
export function AuthTabs(props) {
  return (
    <Tabs
      className="justify-center gap-5"
      tabClassName="min-w-[50px] justify-center px-3 py-1.5 text-sm text-n4"
      activeClassName="bg-n3! text-n8! dark:text-n2!"
      {...props}
    />
  );
}

/** Password input with a show/hide toggle. Spread a react-hook-form registration into it. */
export const PasswordInput = forwardRef(function PasswordInput({ className = "mt-4 mb-2", ...props }, ref) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      ref={ref}
      className={className}
      autoComplete="off"
      type={visible ? "text" : "password"}
      endAdornment={
        <IconButton onClick={() => setVisible((v) => !v)} aria-label={visible ? "Hide password" : "Show password"}>
          {visible ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
        </IconButton>
      }
      {...props}
    />
  );
});

/** Row of big single-digit boxes for one-time codes. */
export function OtpField({ value, onChange, length = 4 }) {
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={length}
      inputType="number"
      shouldAutoFocus
      containerStyle={{ display: "flex", gap: 16, width: "100%" }}
      renderInput={(props) => (
        <input
          {...props}
          className="m-0! w-auto! flex-1 rounded-lg border border-n7 bg-n7 px-[15px] py-[30px] text-center text-2xl font-bold text-fg outline-none focus:border-n6 focus:bg-n8 max-[321px]:px-2.5 max-[321px]:py-5 dark:border-n2 dark:bg-n2 dark:focus:border-n3"
        />
      )}
    />
  );
}

/** "Resend Code (59)" countdown button + Continue, side by side. */
export function OtpActions({ timer, onResend, canContinue, continueType = "submit", onContinue }) {
  return (
    <div className="grid grid-cols-[auto_100px] justify-between gap-[30px]">
      <Button
        variant="outlined"
        disabled={timer > 0}
        onClick={onResend}
        className={cn("mt-[30px] min-w-[100px] px-[15px] py-[9px] text-lg", timer > 0 && "bg-[#ccc] opacity-100")}
      >
        {timer > 0 ? `Resend Code (${timer})` : "Resend Code"}
      </Button>
      <Button
        type={continueType}
        onClick={onContinue}
        disabled={!canContinue}
        variant={canContinue ? "primary" : "outlined"}
        className="mt-[30px] min-w-[100px] px-[15px] py-2.5 text-lg"
      >
        Continue
      </Button>
    </div>
  );
}

/** 60-second resend countdown. */
export function useCountdown(seconds = 60) {
  const [timer, setTimer] = useState(seconds);
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);
  return [timer, () => timer <= 0 && setTimer(seconds)];
}

/** Labelled international phone input (react-phone-number-input). */
export function PhoneField({ label = "Mobile *", value, onChange, error, className }) {
  return (
    <div className={cn("group/phone mt-1 flex flex-col", className)}>
      <label className="order-1 text-[9px] font-bold text-n5 uppercase group-focus-within/phone:text-[rgb(84,107,238)]">{label}</label>
      <PhoneInput
        className={cn(
          inputBox,
          "order-2 mt-3 focus-within:border-[rgb(94,115,235)] [&_.PhoneInputInput]:min-w-0 [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:px-1.5 [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:outline-none"
        )}
        placeholder="Enter Mobile number"
        value={value}
        onChange={onChange}
      />
      {error && <div className="order-3 mt-[7px] text-[13px] leading-[1.5] text-red-600">{error}</div>}
    </div>
  );
}
