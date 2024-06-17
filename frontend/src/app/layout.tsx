import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import { Providers } from "./providers";
import { cookies } from "next/headers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ORKUZ frontend",
  description: "Frontend written for the purpose of the final paper.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = cookies();
  const accessTokenCookie = cookiesStore.get("access");

  return (
    <html lang="en" className={`${fontSans.variable}`} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers authToken={accessTokenCookie?.value}>{children}</Providers>
      </body>
    </html>
  );
}
