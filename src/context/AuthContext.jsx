import { createContext, useContext, useState, useEffect } from "react";
import * as storage from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => storage.getCurrentUser());
  // 🌓 Add state around line 10
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    storage.setCurrentUser(currentUser);
  }, [currentUser]);

  // Sync dark mode state with localStorage configuration
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const login = (user) => {
    setCurrentUser(user);
    storage.setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    storage.clearCurrentUser();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        darkMode, // 🌟 Added to provider
        setDarkMode // 🌟 Added to provider
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}