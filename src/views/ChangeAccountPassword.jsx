"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useUserActions } from "@/_actions/user.actions";
import AccountShell from "@/components/account/AccountShell";
import { PasswordInput } from "@/components/auth/AuthShell";
import { Button, FieldError } from "@/components/ui";

const validationSchema = Yup.object().shape({
  old_password: Yup.string().required("Old Password is required"),
  new_password: Yup.string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
    ),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});

export default function ChangeAccountPassword() {
  const userActions = useUserActions();
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors, isSubmitting } = formState;

  return (
    <AccountShell title="Change password">
      <h3 className="mb-8 text-center font-display max-md:text-[32px]!">New password</h3>
      <form noValidate onSubmit={handleSubmit(userActions.changePassword)}>
        <PasswordInput label="Current Password" placeholder="Current Password" autoComplete="current-password" autoFocus {...register("old_password")} />
        <FieldError>{errors.old_password?.message}</FieldError>
        <PasswordInput label="New Password" placeholder="New Password" autoComplete="new-password" {...register("new_password")} />
        <FieldError>{errors.new_password?.message}</FieldError>
        <PasswordInput label="Confirm New Password" placeholder="Confirm New Password" autoComplete="new-password" {...register("confirm_password")} />
        <FieldError>{errors.confirm_password?.message}</FieldError>
        <Button type="submit" fullWidth loading={isSubmitting} className="mt-[30px] px-[15px] py-2.5">
          {isSubmitting ? "Loading" : "Continue"}
        </Button>
      </form>
    </AccountShell>
  );
}
