import { type ReactNode, useReducer } from "react";
import { AuthContext } from "./auth-context";
import authContextReducer, {
  AuthActionTypes,
} from "~/store/auth-context-reducer";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(authContextReducer, {
    user: undefined,
    login: (user) => dispatch({ type: AuthActionTypes.LOGIN, payload: user }),
    logout: () => dispatch({ type: AuthActionTypes.LOGOUT }),
  });

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
