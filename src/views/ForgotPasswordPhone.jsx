"use client";

import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useAlertActions } from "@/_actions/alert.actions";
import { useUserActions } from "@/_actions/user.actions";
import { loginDataAtom, switchAtom } from "@/_state";
import { AuthDivider, AuthShell, AuthSubmit, OtpActions, OtpField, PhoneField, useCountdown } from "@/components/auth/AuthShell";

/** Phone-based password recovery: request a code, then verify it. */
export default function ForgotPasswordPhone() {
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const [askForPhone, setAskForPhone] = useAtom(switchAtom);
  const [loginData, setLoginData] = useAtom(loginDataAtom);
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState();
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timer, resetTimer] = useCountdown(60);

  const requestCode = async (e) => {
    e.preventDefault();
    setShowPhoneError(true);
    if (!mobile || !isValidPhoneNumber(mobile)) return;
    setLoginData({ ...loginData, phone: mobile, email: "" });
    setSubmitting(true);
    try {
      await userActions.forgotPassword({ phone: mobile });
    } finally {
      setSubmitting(false);
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      alertActions.error("Fill OTP first");
      return;
    }
    setLoginData({ ...loginData, otp });
    await userActions.forgotPasswordVerify(otp);
  };

  const signUpLink = (
    <>
      Don’t have an account?{" "}
      <Link href="/create-account" onClick={() => setAskForPhone(true)}>
        Sign up for free
      </Link>
    </>
  );

  const phoneError = !showPhoneError ? null : mobile && isValidPhoneNumber(mobile) ? null : mobile ? "Mobile number is not valid." : "Mobile number is required.";

  if (askForPhone) {
    return (
      <AuthShell headerAction={signUpLink} backHref="/login">
        <h3 className="mb-8 text-center font-display font-bold max-md:text-[32px]!">Forgot password</h3>
        <small className="block text-center text-[#777E91]">For security purposes, no withdrawals are permitted for 24 hours after password changed.</small>
        <AuthDivider />
        <form noValidate onSubmit={requestCode} className="mx-auto mt-[30px] w-full max-w-[380px]">
          <PhoneField
            value={mobile}
            onChange={(value) => {
              setMobile(value);
              setShowPhoneError(true);
            }}
            error={phoneError}
          />
          <AuthSubmit loading={submitting}>{submitting ? "Loading" : "Continue"}</AuthSubmit>
          <p className="mt-6 text-center text-sm! font-bold">
            <Link href="/login" className="text-n2!">
              Nevermind, I got it
            </Link>
          </p>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell headerAction={signUpLink} backHref="/login" wide>
      <h3 className="mb-8 text-center font-display font-bold max-md:text-[32px]!">Security verification</h3>
      <small className="mb-5 block text-center text-n3">To secure your account, please complete the following verification.</small>
      <p className="mb-5 text-center text-sm! text-n4!">
        Enter the 4 digit code received by <br />
        <span className="text-n2 dark:text-n8">{mobile || loginData?.phone}</span>
      </p>
      <form noValidate onSubmit={verifyCode} className="mx-auto mt-[30px] w-full max-w-[400px]">
        <OtpField value={otp} onChange={setOtp} />
        <OtpActions
          timer={timer}
          canContinue={otp.length === 4}
          onResend={() => {
            userActions.forgotPassword({ phone: mobile || loginData?.phone });
            resetTimer();
          }}
        />
      </form>
    </AuthShell>
  );
}
