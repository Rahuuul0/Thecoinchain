"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAlertActions } from "@/_actions/alert.actions";
import { useUserActions } from "@/_actions/user.actions";
import { loginDataAtom, switchAtom } from "@/_state";
import { AuthDivider, AuthShell, AuthSubmit, OtpActions, OtpField, useCountdown } from "@/components/auth/AuthShell";
import { FieldError, TextField } from "@/components/ui";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required("Email Address is required"),
});

/** Email-based password recovery: request a code, then verify it. */
export default function ForgotPassword() {
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const [askForEmail, setAskForEmail] = useAtom(switchAtom);
  const [loginData, setLoginData] = useAtom(loginDataAtom);
  const [otp, setOtp] = useState("");
  const [timer, resetTimer] = useCountdown(60);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const { register, handleSubmit, formState, getValues } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (!askForEmail) setRecoveryEmail(localStorage.getItem("email") || "");
  }, [askForEmail]);

  const requestCode = async ({ email }) => {
    setLoginData({ ...loginData, phone: "", email });
    await userActions.forgotPassword({ email });
  };

  const verifyCode = async () => {
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
      <Link href="/create-account" onClick={() => setAskForEmail(true)}>
        Sign up for free
      </Link>
    </>
  );

  if (askForEmail) {
    return (
      <AuthShell headerAction={signUpLink} backHref="/login">
        <h3 className="mb-8 text-center font-display font-bold max-md:text-[32px]!">Forgot password</h3>
        <small className="block text-center text-[#777E91]">For security purposes, no withdrawals are permitted for 24 hours after password changed.</small>
        <AuthDivider />
        <form noValidate onSubmit={handleSubmit(requestCode)} className="mx-auto mt-[30px] w-full max-w-[380px]">
          <TextField
            label="Enter the account email"
            type="email"
            className="mt-4 mb-2"
            placeholder="Your email"
            autoComplete="email"
            autoFocus
            {...register("email")}
            endAdornment={<Mail className="mr-2 size-5 text-n4" />}
          />
          <FieldError>{errors.email?.message}</FieldError>
          <AuthSubmit loading={isSubmitting}>{isSubmitting ? "Loading" : "Continue"}</AuthSubmit>
          <p className="mt-6 text-center text-sm! font-bold">
            <Link href="/login" className="font-display text-fg!">
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
      <small className="mb-5 block text-center">To secure your account, please complete the following verification.</small>
      <p className="mb-5 text-center text-sm! text-n4!">
        Enter the 4 digit code received by <span className="text-fg">{recoveryEmail}</span>
      </p>
      <form
        noValidate
        className="mx-auto mt-[30px] w-full max-w-[400px]"
        onSubmit={(e) => {
          e.preventDefault();
          verifyCode();
        }}
      >
        <OtpField value={otp} onChange={setOtp} />
        <OtpActions
          timer={timer}
          canContinue={otp.length === 4}
          onResend={() => {
            userActions.forgotPassword({ email: getValues("email") || recoveryEmail });
            resetTimer();
          }}
        />
      </form>
    </AuthShell>
  );
}
