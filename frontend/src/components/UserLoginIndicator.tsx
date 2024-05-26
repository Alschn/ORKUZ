"use client";

import useAuthContext from "~/store/use-auth-context";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function UserLoginIndicator() {
  const { user, logout } = useAuthContext();
  if (!user) {
    return (
      <Link href={"/login"}>
        <Button>Login</Button>
      </Link>
    );
  }
  return (
    <span>
      <span className={"px-2"}>{`Hello, ${user.username}`}</span>
      <Button onClick={logout}>Logout</Button>
    </span>
  );
}
