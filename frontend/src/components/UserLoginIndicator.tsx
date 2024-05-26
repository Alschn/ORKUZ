"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useAuth } from "~/providers/auth";
import { logoutAction } from "~/app/actions";
import { useToast } from "./ui/use-toast";
import { useTransition } from "react";

export default function UserLoginIndicator() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  if (!user) {
    return (
      <Link href={"/login"}>
        <Button>Login</Button>
      </Link>
    );
  }

  const handleLogout = async () => {
    startTransition(async () => {
      const result = await logoutAction();
      if (result.success) {
        window.location.replace("/login");
      } else {
        toast({
          variant: "destructive",
          title: "Logout failed!",
          description: "Please try again later.",
        });
      }
    });
  };

  return (
    <span>
      <span className={"px-2"}>{`Hello, ${user.username}`}</span>
      <Button onClick={handleLogout} disabled={isPending}>
        Logout
      </Button>
    </span>
  );
}
