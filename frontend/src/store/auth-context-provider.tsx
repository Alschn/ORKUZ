import {ReactNode, useReducer} from "react";
import {AuthContext, AuthContextProps} from "./auth-context";

enum ActionType {
  LOGIN = 'login',
  LOGOUT = 'logout'
}

type Action = { type: ActionType, payload?: string }
type AuthReducer = (state: AuthContextProps, action: Action) => AuthContextProps;

export default function AuthContextProvider({children}: { children: ReactNode }) {
  const reducer: AuthReducer = (state, action): AuthContextProps => {
    switch (action.type) {
      case ActionType.LOGIN:
        return {...state, userLogin: action.payload}
      case ActionType.LOGOUT:
        return {...state, userLogin: undefined}
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    userLogin: undefined,
    setUserLogin: login => dispatch({type: ActionType.LOGIN, payload: login}),
    logout: () => dispatch({type: ActionType.LOGOUT})
  })

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  )
}
