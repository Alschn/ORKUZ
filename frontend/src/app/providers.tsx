"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import AuthContextProvider from "~/store/auth-context-provider";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </NextThemesProvider>
  );
}
