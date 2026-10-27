"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import { useAlertActions } from "@/_actions/alert.actions";
import { useUserActions } from "@/_actions/user.actions";
import { AuthDivider, AuthShell, AuthSubmit, OpenIdButtons, PasswordInput, PhoneField } from "@/components/auth/AuthShell";
import { Checkbox, FieldError, TextField } from "@/components/ui";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email Address is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid"
    )
    .email("Email must be a valid email")
    .trim(),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
    ),
  confirm_password: Yup.string()
    .trim()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
  agree: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const squash = (value) => value.replace(/\s+/g, value.length > 1 ? " " : "");

export default function CreateAccount() {
  const router = useRouter();
  const { id: referralId } = useParams();
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const captchaRef = useRef(null);
  const [mobile, setMobile] = useState();
  const [showPhoneError, setShowPhoneError] = useState(false);

  const { register, handleSubmit, formState, setValue } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors, isSubmitting } = formState;

  // /create-account/:id stores the referral code, then drops it from the URL.
  useEffect(() => {
    if (referralId) {
      localStorage.setItem("refToken", referralId);
      router.replace("/create-account");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    if (!mobile || !isValidPhoneNumber(mobile)) return;
    const token = captchaRef.current?.getValue();
    if (!token) {
      alertActions.error("reCAPTCHA is mandatory");
      return;
    }
    captchaRef.current.reset();
    return userActions.create({ ...data, mobile });
  };

  const phoneError = !showPhoneError ? null : mobile && isValidPhoneNumber(mobile) ? null : mobile ? "Mobile number is not valid." : "Mobile number is required.";

  return (
    <AuthShell
      headerAction={
        <>
          Already have an account? <Link href="/login">Login</Link>
        </>
      }
    >
      <h3 className="mb-8 text-center font-display font-bold max-md:text-[32px]!">Sign up</h3>
      <OpenIdButtons label="Use Your OpenID to Sign up" googleAction="auth" />
      <AuthDivider />
      <small className="mb-5 block text-center text-[#777E91]">Or continue with email</small>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-[30px] w-full max-w-[380px]">
        <TextField
          label="Email *"
          type="email"
          className="mt-4 mb-2"
          placeholder="Email address"
          autoComplete="off"
          {...register("email")}
          onChange={(e) => setValue("email", squash(e.target.value))}
        />
        <FieldError>{errors.email?.message}</FieldError>

        <PhoneField
          value={mobile}
          onChange={(value) => {
            setMobile(value);
            setShowPhoneError(true);
          }}
          error={phoneError}
        />

        <PasswordInput label="Password *" placeholder="Password" {...register("password")} onChange={(e) => setValue("password", squash(e.target.value))} />
        <FieldError>{errors.password?.message}</FieldError>

        <PasswordInput
          label="Confirm Password *"
          placeholder="Confirm Password"
          {...register("confirm_password")}
          onChange={(e) => setValue("confirm_password", squash(e.target.value))}
        />
        <FieldError>{errors.confirm_password?.message}</FieldError>

        <Checkbox
          className="mt-2 items-start text-xs leading-5"
          {...register("agree")}
          label="* By signing up I agree that I’m 18 years of age or older, to the User Agreements, Privacy Policy, Cookie Policy, E-Sign Consent."
        />
        <FieldError>{errors.agree?.message}</FieldError>

        {process.env.NEXT_PUBLIC_reCAPTCHA_SITE_KEY && (
          <div className="my-2.5 flex justify-center">
            <ReCAPTCHA theme="light" ref={captchaRef} sitekey={process.env.NEXT_PUBLIC_reCAPTCHA_SITE_KEY} />
          </div>
        )}

        <AuthSubmit loading={isSubmitting} onClick={() => setShowPhoneError(true)}>
          {isSubmitting ? "Loading" : "Sign up"}
        </AuthSubmit>
      </form>
    </AuthShell>
  );
}
