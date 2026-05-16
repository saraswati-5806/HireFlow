import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
} from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setUser] = useState(getCurrentUser());
  const [darkMode, setDarkMode] = useState(false);

  // Automatically toggles a class on the body tag for dark mode styles
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  function login(user) {
    setCurrentUser(user);
    setUser(user);
  }

  function logout() {
    clearCurrentUser();
    setUser(null);
  }

  // Optimize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    currentUser,
    login,
    logout,
    darkMode,
    setDarkMode,
  }), [currentUser, darkMode]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}