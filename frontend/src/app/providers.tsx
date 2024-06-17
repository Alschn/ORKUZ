"use client";

import * as React from "react";
import ThemeProvider from "~/providers/theme";
import QueryClientProvider from "~/providers/tanstack-query";
import { Toaster } from "~/components/ui/toaster";
import AuthProvider from "~/providers/auth";

export function Providers({
  children,
  authToken,
}: {
  children: React.ReactNode;
  authToken?: string;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <QueryClientProvider>
        <AuthProvider token={authToken}>{children}</AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
