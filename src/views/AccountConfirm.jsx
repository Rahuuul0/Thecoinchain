"use client";

import { useAtom } from "jotai";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAlertActions } from "@/_actions/alert.actions";
import { useUserActions } from "@/_actions/user.actions";
import { switchAtom, userErrorAtom } from "@/_state";
import { AuthDivider, AuthShell, AuthSubmit, OtpActions, OtpField, useCountdown } from "@/components/auth/AuthShell";

/** After sign-up: pick SMS or email, then enter the verification code. */
export default function AccountConfirm() {
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const [stage, setStage] = useAtom(switchAtom);
  const [userError, setUserError] = useAtom(userErrorAtom);
  const [channel, setChannel] = useState("email");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, resetTimer] = useCountdown(60);
  const [contact, setContact] = useState({ email: "", phone: "" });

  useEffect(() => {
    setContact({ email: localStorage.getItem("email") || "", phone: localStorage.getItem("phone") || "" });
  }, []);

  useEffect(() => {
    if (userError) setIsSubmitting(false);
  }, [userError]);

  const sendCode = (e) => {
    e?.preventDefault();
    if (channel === "email") userActions.getOtp();
    else userActions.getOtpPhone(contact.phone);
    setIsSubmitting(true);
    setUserError(false);
  };

  const verify = (e) => {
    e.preventDefault();
    if (otp.length !== 4) alertActions.error("Fill OTP First");
    else userActions.verifyRegisterOtp(otp);
  };

  const loginLink = (
    <>
      Already have an account? <Link href="/login">Login</Link>
    </>
  );

  if (stage === true) {
    return (
      <AuthShell headerAction={loginLink} backHref={null}>
        <h3 className="mb-8 text-center font-display font-bold max-md:text-[32px]!">Let’s confirm it’s really you</h3>
        <small className="mb-5 block text-center text-[#777E91]">
          Help us secure your account.
          <br />
          Please complete the verifications below
        </small>
        <form noValidate onSubmit={sendCode} className="mx-auto mt-[30px] w-full max-w-[380px]">
          <fieldset aria-label="confirm account" className="flex flex-col">
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="radio" name="channel" value="phone" checked={channel === "phone"} onChange={() => setChannel("phone")} className="size-5 accent-primary" />
              Get the code by text message (SM) at {contact.phone}
            </label>
            <AuthDivider />
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="radio" name="channel" value="email" checked={channel === "email"} onChange={() => setChannel("email")} className="size-5 accent-primary" />
              Get the code by email at {contact.email}
            </label>
          </fieldset>
          <AuthSubmit loading={isSubmitting}>
            {isSubmitting ? "Loading" : "Continue"}
            {!isSubmitting && <ChevronRight className="size-5" />}
          </AuthSubmit>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell headerAction={loginLink} backHref={null}>
      <h3 className="mb-8 text-center font-display font-bold max-md:text-[32px]!">Enter your security code</h3>
      <small className="mb-5 block text-center text-[#777E91]">
        {stage !== "email" ? `We have sent the code by text message (SM) at ${contact.phone}` : `We have sent the code by email at ${contact.email}`}
      </small>
      <form noValidate onSubmit={verify} className="mx-auto mt-[30px] w-full max-w-[380px]">
        <OtpField value={otp} onChange={setOtp} />
        <OtpActions
          timer={timer}
          canContinue
          onResend={() => {
            if (stage === "email") userActions.getOtp();
            else userActions.getOtpPhone(contact.phone);
            resetTimer();
          }}
        />
      </form>
    </AuthShell>
  );
}
