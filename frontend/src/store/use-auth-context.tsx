"use client";

import { useContext } from "react";
import { AuthContext } from "~/store/auth-context";

export default function useAuthContext() {
  return useContext(AuthContext);
}
