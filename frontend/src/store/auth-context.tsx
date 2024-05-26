"use client";

import { createContext } from "react";

export type User = { username: string };

export interface AuthContextProps {
  user: User | undefined;
  login: (user: User) => void;
  logout: () => void;
}

const authContextDefaultValue: AuthContextProps = {
  user: undefined,
  login: () => undefined,
  logout: () => undefined,
};

export const AuthContext = createContext<AuthContextProps>(
  authContextDefaultValue,
);
