"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { subscriptionActions, useUserActions } from "@/_actions";
import { authAtom, forecastSubAtom } from "@/_state";
import AccountShell from "@/components/account/AccountShell";
import { PasswordInput, PhoneField } from "@/components/auth/AuthShell";
import { Button, FieldError, TextField } from "@/components/ui";

const digitsOnly = (value) => (value || "").replace(/[^A-Z0-9]/gi, "");

const baseShape = {
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().email().trim().required("Email Address is required"),
  mobile: Yup.string()
    .trim()
    .transform(digitsOnly)
    .required("Mobile number is required")
    .min(8, "Please enter a valid phone number"),
};

const completeProfileShape = {
  ...baseShape,
  password: Yup.string()
    .required(" Password is required")
    .min(8, " Password must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
    ),
  confirmpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
};

// White fields on the grey "Update your profile" panel.
const whiteBox = "border-white bg-n8 text-n2 dark:border-white dark:bg-n8 dark:text-n2";

const VIP_FEATURES = ["Get all crypto price predictions", "1 hour, 1 day, 7day, 1 month time frames available", "Trade with Machine Learning", "Stay informed, stay profitable"];

export default function Profile() {
  const userActions = useUserActions();
  const subscriptionApi = subscriptionActions();
  const auth = useAtomValue(authAtom);
  const subscription = useAtomValue(forecastSubAtom);
  const needsCompletion = auth?.is_profile_completed === 0;

  const schema = useMemo(() => Yup.object().shape(needsCompletion ? completeProfileShape : baseShape), [needsCompletion]);
  const { register, handleSubmit, formState, reset, setValue, watch } = useForm({ resolver: yupResolver(schema) });
  const { errors, isSubmitting } = formState;
  const mobile = watch("mobile");

  useEffect(() => {
    subscriptionApi.subscribedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth) reset({ ...auth, name: auth.user_name, mobile: auth.phone });
  }, [auth, reset]);

  if (!auth) return null;

  const badge = subscription?.status === "running" ? "VIP" : subscription?.status === "expired" ? "FREE" : "";

  return (
    <AccountShell title="Profile info">
      <div className="sm:w-2/3">
        <div className="pb-5 md:pb-[5px]">
          <h5 className="font-semibold">{auth.user_name || auth.email?.split("@")[0]}</h5>
          <p className="text-sm! text-n4!">{auth.email}</p>
          {badge && (
            <span className="mt-3 mb-5 inline-flex cursor-default rounded-full border border-line px-[15px] py-[9px] font-display text-sm font-bold text-success sm:mt-[30px]">{badge}</span>
          )}
        </div>
      </div>

      {subscription?.status === "running" && (
        <>
          <div className="border-b border-line">
            <h5 className="py-10 font-semibold">Features</h5>
          </div>
          <p className="py-6 font-medium">VIP - Your annual plan will be expired on {dayjs(subscription.end_date).format("MM/DD/YY")}</p>
          {VIP_FEATURES.map((feature) => (
            <p key={feature} className="pb-6">
              {feature}
            </p>
          ))}
        </>
      )}

      <form noValidate onSubmit={handleSubmit(() => userActions.updateUser(watch()))}>
        <div className="mb-12 rounded-2xl bg-[#f1f2f4] p-8 max-md:mb-6">
          <h5 className="text-2xl! font-semibold text-n2">Update your profile</h5>

          <TextField label="Name *" className="mt-4 mb-2" boxClassName={whiteBox} autoComplete="off" autoFocus {...register("name")} />
          <FieldError>{errors.name?.message}</FieldError>

          <TextField label="Email *" className="mt-4 mb-2" boxClassName={whiteBox} disabled autoComplete="off" {...register("email")} />
          <FieldError>{errors.email?.message}</FieldError>

          <PhoneField
            className={needsCompletion ? "mt-4" : "pointer-events-none mt-4 opacity-80"}
            value={mobile || undefined}
            onChange={(value) => setValue("mobile", value || "", { shouldValidate: true })}
            error={errors.mobile?.message}
          />

          {needsCompletion && (
            <>
              <PasswordInput label="Password *" placeholder="Password" boxClassName={whiteBox} autoComplete="new-password" {...register("password")} />
              <FieldError>{errors.password?.message}</FieldError>
              <PasswordInput label="Confirm Password *" placeholder="Confirm Password" boxClassName={whiteBox} autoComplete="new-password" {...register("confirmpassword")} />
              <FieldError>{errors.confirmpassword?.message}</FieldError>
            </>
          )}
        </div>

        <div className="text-right">
          <Button type="submit" loading={isSubmitting} className="min-w-40 px-[15px] py-2.5 sm:ml-auto">
            {isSubmitting ? "Loading" : "Save Settings"}
          </Button>
        </div>
      </form>
    </AccountShell>
  );
}
