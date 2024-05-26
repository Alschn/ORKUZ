import { type AuthContextProps, type User } from "~/store/auth-context";

export const AuthActionTypes = {
  LOGIN: "login",
  LOGOUT: "logout",
} as const;

type AuthActionType = (typeof AuthActionTypes)[keyof typeof AuthActionTypes];
type AuthAction = { type: AuthActionType; payload?: User };
type AuthContextReducer = (
  state: AuthContextProps,
  action: AuthAction,
) => AuthContextProps;

const authContextReducer: AuthContextReducer = (
  state,
  action,
): AuthContextProps => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, user: action.payload };
    case AuthActionTypes.LOGOUT:
      return { ...state, user: undefined };
    default:
      return state;
  }
};

export default authContextReducer;
