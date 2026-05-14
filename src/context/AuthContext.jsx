import { createContext, useContext, useState } from "react";
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
} from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setUser] = useState(getCurrentUser());

  function login(user) {
    setCurrentUser(user);
    setUser(user);
  }

  function logout() {
    clearCurrentUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}