"use client"

import {createContext} from "react";

export interface AuthContextProps {
  userLogin: string | undefined;
  setUserLogin: (login: string) => void;
  logout: () => void;
}

const authContextDefaultValue: AuthContextProps = {
  userLogin: undefined,
  setUserLogin: () => {},
  logout: () => {}
};

export const AuthContext = createContext<AuthContextProps>(authContextDefaultValue)

