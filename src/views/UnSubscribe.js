"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { subscriptionActions } from "@/_actions";
import { Button, FieldError, TextField } from "@/components/ui";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email Address is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid"
    )
    .email("Email must be a valid email")
    .trim(),
});

/** Newsletter unsubscribe form (linked from emails). */
export default function UnSubscribe() {
  const actions = subscriptionActions();
  const { register, handleSubmit, formState, setValue } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors, isSubmitting } = formState;

  return (
    <form noValidate onSubmit={handleSubmit((data) => actions.unsubscribes(data))} className="m-[50px] pt-16">
      <h2 className="m-10">DO You Want TO Unsubscribe ?</h2>
      <div>
        <TextField
          label="Email *"
          type="email"
          className="mt-4 mb-2"
          placeholder="Email address"
          autoComplete="off"
          {...register("email")}
          onChange={(e) => setValue("email", e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : ""))}
        />
        <FieldError>{errors.email?.message}</FieldError>
        <Button type="submit" fullWidth loading={isSubmitting} className="mt-4 px-[15px] py-2.5">
          {isSubmitting ? "Loading" : "UnSubscribe"}
        </Button>
      </div>
    </form>
  );
}
