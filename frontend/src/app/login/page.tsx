"use client"

import React, {FormEventHandler, createRef} from "react";
import {Button} from "~/components/ui/button";
import {Field} from "~/components/ui/field";
import {cn} from "~/lib/utils";

export default function LoginPage() {
  const loginRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    console.log(loginRef);
    console.log('login', loginRef.current?.value);
    console.log('pswd', passwordRef.current?.value);
  }
  return <>
    <main className={cn('flex', 'items-center', 'justify-center', 'flex-col', 'min-h-screen')}>
      <h1 className={'text-4xl p-2'}>Login to ORKUZ</h1>
      <div className={cn('border', 'rounded-md', 'w-1/3', 'p-3')}>
        <form onSubmit={handleSubmit}>
          <Field label={'Login'} id={'login'} name={'login'} ref={loginRef}/>
          <Field label={'Password'} id={'password'} name={'password'} type={'password'} ref={passwordRef}/>
          <div className={cn('text-center', 'p-3')}>
            <Button className={cn('w-1/2')}>Submit</Button>
          </div>
        </form>
      </div>
    </main>
  </>
}
