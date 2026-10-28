"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import { useUserActions } from "@/_actions/user.actions";
import { userErrorAtom } from "@/_state";
import { AuthDivider, AuthShell, AuthSubmit, AuthTabs, AuthTitle, EnsureUrl, OpenIdButtons, PasswordInput, PhoneField } from "@/components/auth/AuthShell";
import { FieldError, TextField } from "@/components/ui";

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Email must be a valid email").trim().required("Email Address is required"),
  password: Yup.string().trim().required("Password is required"),
});
const mobileSchema = Yup.object().shape({
  password: Yup.string().trim().required("Password is required"),
});

// Collapse runs of whitespace as the user types.
const squash = (value) => value.replace(/\s+/g, value.length > 1 ? " " : "");

export default function LogIn() {
  const userActions = useUserActions();
  const [userError, setUserError] = useAtom(userErrorAtom);
  const [tab, setTab] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobile, setMobile] = useState();
  const [showPhoneError, setShowPhoneError] = useState(false);

  const { register, handleSubmit, formState, reset, setValue } = useForm({
    resolver: yupResolver(tab === "1" ? emailSchema : mobileSchema),
  });
  const { errors } = formState;

  useEffect(() => {
    if (userError) setIsSubmitting(false);
  }, [userError]);

  const changeTab = (value) => {
    setTab(value);
    reset({ email: "", password: "" });
  };

  const onSubmit = (data) => {
    if (tab !== "1") {
      if (!mobile || !isValidPhoneNumber(mobile)) return;
      data.phone = mobile;
    }
    userActions.login(data);
    setIsSubmitting(true);
    setUserError(false);
  };

  const field = (name) => {
    const registration = register(name);
    return { ...registration, onChange: (e) => setValue(name, squash(e.target.value)) };
  };

  const passwordField = <PasswordInput label="Password *" placeholder="Password" {...field("password")} />;

  const phoneError = !showPhoneError ? null : mobile && isValidPhoneNumber(mobile) ? null : mobile ? "Mobile number is not valid." : "Mobile number is required.";

  return (
    <AuthShell
      headerAction={
        <>
          Don’t have an account? <Link href="/create-account">Sign up for free</Link>
        </>
      }
    >
      <AuthTitle>Sign in to The Coin Chain</AuthTitle>
      <EnsureUrl path="accounts.TheCoinChain/login" />
      <OpenIdButtons label="Use Your OpenID to Sign In" googleAction="login" />
      <AuthDivider />

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-[30px] w-full max-w-[380px]">
        <AuthTabs items={[{ value: "1", label: "Email" }, { value: "2", label: "Mobile" }]} value={tab} onChange={changeTab} />

        {tab === "1" ? (
          <>
            <TextField label="Email *" type="email" className="mt-4 mb-2" placeholder="Email address" autoComplete="off" autoFocus {...field("email")} />
            <FieldError>{errors.email?.message}</FieldError>
            {passwordField}
            <FieldError>{errors.password?.message}</FieldError>
            <div className="mt-2 flex justify-end">
              <Link href="/forgot-password" className="text-xs font-semibold no-underline">
                Forgot password?
              </Link>
            </div>
          </>
        ) : (
          <>
            <PhoneField
              value={mobile}
              onChange={(value) => {
                setMobile(value);
                setShowPhoneError(true);
              }}
              error={phoneError}
            />
            {passwordField}
            <FieldError>{errors.password?.message}</FieldError>
            <div className="mt-2 flex justify-between">
              <Link href="/scan-to-login" className="text-xs font-semibold text-[#777E91]! no-underline">
                Scan to login
              </Link>
              <Link href="/password-recovery" className="text-xs font-semibold no-underline">
                Forgot password?
              </Link>
            </div>
          </>
        )}

        <AuthSubmit loading={isSubmitting} className="mb-4" onClick={() => tab !== "1" && setShowPhoneError(true)}>
          {isSubmitting ? "Loading" : "Login"}
        </AuthSubmit>
      </form>
    </AuthShell>
  );
}
