import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userId: null,
  role: null,
  login: () => {},
  logout: () => {},
});
