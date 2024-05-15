"use client"

import React, {createRef, useState} from "react";
import {Field} from "~/components/ui/field";
import {cn} from "~/lib/utils";
import Form from "~/components/ui/form";
import {useRouter} from "next/navigation";
import useAuthContext from "~/store/use-auth-context";
import {object, string, ZodError} from "zod";

const loginSchema = object({
  login: string().min(1, 'Login is required'),
  password: string().min(1, 'Password is required')
}).required()

export default function LoginPage() {
  const loginRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const [loginError, setLoginError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const router = useRouter();
  const {doLogin} = useAuthContext()

  const handleValidationError = (error: ZodError) => {
    error?.errors.forEach(({path, message}) => {
      switch (path.toString()) {
        case 'login':
          setLoginError(message);
          break;
        case 'password':
          setPasswordError(message);
      }
    });
  }

  const handleSubmit = () => {
    const login = loginRef.current?.value;
    const password = passwordRef.current?.value;
    const formValue = {login, password};
    const {success, error} = loginSchema.safeParse(formValue);

    if (!success) {
      handleValidationError(error);
      return;
    }

    // TODO call API and handle JWT
    doLogin(login as string);
    router.push('/');
  }

  return <>
    <main className={cn('flex', 'items-center', 'justify-center', 'flex-col', 'min-h-screen')}>
      <h1 className={'text-4xl p-2 my-2'}>Login to ORKUZ</h1>
      <Form onSubmit={handleSubmit} fields={
        <>
          <Field label={'Login'} id={'login'} name={'login'} ref={loginRef} error={loginError}
                 onChange={() => setLoginError(undefined)}/>
          <Field label={'Password'} id={'password'} name={'password'} type={'password'} ref={passwordRef}
                 error={passwordError} onChange={() => setPasswordError(undefined)}/>
        </>
      }/>
    </main>
  </>
}
