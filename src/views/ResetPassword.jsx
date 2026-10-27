"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useUserActions } from "@/_actions/user.actions";
import { AuthShell, AuthSubmit, PasswordInput } from "@/components/auth/AuthShell";
import { FieldError } from "@/components/ui";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("New Password Required")
    .min(8, "New Password must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
    ),
  confirmpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function ResetPassword() {
  const userActions = useUserActions();
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors, isSubmitting } = formState;

  return (
    <AuthShell
      headerAction={
        <>
          Already have an account? <Link href="/login">Login</Link>
        </>
      }
    >
      <h3 className="mb-8 text-center font-display font-bold max-md:text-[32px]!">New Password</h3>
      <form noValidate onSubmit={handleSubmit(userActions.resetPassword)} className="mx-auto mt-[30px] w-full max-w-[380px]">
        <PasswordInput label="New Password" placeholder="Password" autoComplete="current-password" autoFocus {...register("password")} />
        <FieldError>{errors.password?.message}</FieldError>
        <PasswordInput label="Confirm New Password" placeholder="Confirm Password" autoComplete="new-password" {...register("confirmpassword")} />
        <FieldError>{errors.confirmpassword?.message}</FieldError>
        <AuthSubmit disabled={isSubmitting}>Continue</AuthSubmit>
      </form>
    </AuthShell>
  );
}
