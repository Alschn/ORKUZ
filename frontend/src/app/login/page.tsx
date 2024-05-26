"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { type LoginSchema, loginSchema } from "./schema";
import { useLoginMutation } from "./hooks";
import { useToast } from "~/components/ui/use-toast";

export default function LoginPage() {
  const form = useForm<LoginSchema>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { toast } = useToast();

  const mutation = useLoginMutation({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Login successful!",
        description: "You are now logged in.",
        duration: 1500,
      });
      // force hard navigation to completely refresh client state
      window.location.replace("/");
    },
    onError: (_) => {
      // todo: better error handling
      toast({
        variant: "destructive",
        title: "Login failed!",
        description: "Please check your credentials...",
        duration: 3000,
      });
    },
  });

  const onSubmit = (values: LoginSchema) => {
    mutation.mutate(values);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Form {...form}>
        <h1 className="mb-4 p-2 text-4xl">Login to ORKUZ</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container max-w-[500px] space-y-6"
        >
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Login"
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={mutation.isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
