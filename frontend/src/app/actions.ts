"use server";

import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import axiosClient from "~/api/axios-client";

export async function logoutAction() {
  const refreshToken = cookies().get("refresh");

  // no need to call api, simply get rid of short-lived access token
  if (!refreshToken) {
    cookies().delete("access");
    return { success: true };
  }

  // try blacklisting the refresh token
  try {
    await axiosClient.post("/api/token/blacklist/", {
      token: refreshToken,
    });
  } catch (error) {
    // network error, do not remove cookies
    if (!isAxiosError(error)) {
      console.error(error);
      return { success: false };
    }
  }

  // clean up cookies
  cookies().delete("access");
  cookies().delete("refresh");
  return { success: true };
}
