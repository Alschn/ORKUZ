"use client"

import { useContext } from "react";
import {AuthContext} from "~/store/auth-context";

export default function useAuthContext() {
  const {userLogin, setUserLogin, logout} = useContext(AuthContext)

  return {login: userLogin, doLogin: setUserLogin, logout}
}
