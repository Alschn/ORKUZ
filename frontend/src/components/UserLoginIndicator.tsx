"use client"

import useAuthContext from "~/store/use-auth-context";
import {Button} from "~/components/ui/button";
import Link from "next/link";

export default function UserLoginIndicator() {
  const {login, logout} = useAuthContext()
  return (
    login
      ? <span><span className={'px-2'}>{`Hello, ${login}`}</span><Button onClick={logout}>Logout</Button></span>
      : <Link href={'/login'}><Button>Login</Button></Link>
  )
}
