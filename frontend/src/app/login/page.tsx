"use client";

import React, { createRef, useState } from "react";
import { Field } from "~/components/ui/field";
import Form from "~/components/ui/form";
import { useRouter } from "next/navigation";
import useAuthContext from "~/store/use-auth-context";
import * as z from "zod";
import { type ZodError } from "zod";

const loginSchema = z
  .object({
    login: z.string().min(1, "Login is required"),
    password: z.string().min(1, "Password is required"),
  })
  .required();

export default function LoginPage() {
  const loginRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const [loginError, setLoginError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const router = useRouter();
  const { login } = useAuthContext();

  const handleValidationError = (error: ZodError) => {
    error?.errors.forEach(({ path, message }) => {
      switch (path.toString()) {
        case "login":
          setLoginError(message);
          break;
        case "password":
          setPasswordError(message);
          break;
      }
    });
  };

  const handleSubmit = () => {
    const username = loginRef.current?.value;
    const password = passwordRef.current?.value;
    const formValue = { login: username, password };
    const { success, error } = loginSchema.safeParse(formValue);

    if (!success) {
      handleValidationError(error);
      return;
    }

    // TODO call API and handle JWT
    login({ username: username! });
    router.push("/");
  };

  return (
    <>
      <main
        className={"flex min-h-screen flex-col items-center justify-center"}
      >
        <h1 className={"my-2 p-2 text-4xl"}>Login to ORKUZ</h1>
        <Form onSubmit={handleSubmit}>
          <Field
            label={"Login"}
            id={"login"}
            name={"login"}
            ref={loginRef}
            error={loginError}
            onChange={() => setLoginError(undefined)}
          />
          <Field
            label={"Password"}
            id={"password"}
            name={"password"}
            type={"password"}
            ref={passwordRef}
            error={passwordError}
            onChange={() => setPasswordError(undefined)}
          />
        </Form>
      </main>
    </>
  );
}
