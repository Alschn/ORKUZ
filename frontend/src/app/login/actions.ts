"use server";

import axiosClient from "~/api/axios-client";
import { type LoginSchema } from "./schema";
import { cookies } from "next/headers";
import { type AxiosError, type AxiosResponse } from "axios";

type LoginResponseData = {
  access: string;
  refresh: string;
};

const ENDPOINT_LOGIN = "/api/token/";

const accessCookieConfig = {
  httpOnly: true,
  maxAge: 2 * 60 * 60,
};
const refreshCookieConfig = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60,
};

export async function loginAction({ login, password }: LoginSchema) {
  let res: AxiosResponse<LoginResponseData>;

  try {
    res = await axiosClient.post<LoginResponseData>(ENDPOINT_LOGIN, {
      username: login,
      password,
    });
  } catch (error) {
    // todo: better error handling
    const err = error as AxiosError;
    console.log(err.response);
    throw new Error("Login failed");
  }

  const cookiesStore = cookies();
  cookiesStore.set("access", res.data.access, accessCookieConfig);
  cookiesStore.set("refresh", res.data.refresh, refreshCookieConfig);
  return res.data;
}
