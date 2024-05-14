"use client"

import React, {createRef, useState} from "react";
import {Field} from "~/components/ui/field";
import {cn} from "~/lib/utils";
import Form from "~/components/ui/form";
import {validateRequired} from "~/lib/validations";
import {useRouter} from "next/navigation";
import useAuthContext from "~/store/use-auth-context";

export default function LoginPage() {
  const loginRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const [loginError, setLoginError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const router = useRouter();
  const {doLogin} = useAuthContext()

  const handleSubmit = () => {
    let login = loginRef.current?.value;
    let password = passwordRef.current?.value;
    let valid = true;


    if (!validateRequired(login)) {
      valid = false;
      setLoginError('Field is required');
    }
    if (!validateRequired(password)) {
      valid = false;
      setPasswordError('Field is required');
    }

    if (valid) {
      doLogin(login as string)
      router.push('/');
    }
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
