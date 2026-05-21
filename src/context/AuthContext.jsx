import { createContext, useContext, useState, useEffect } from "react";
import * as storage from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return storage.getCurrentUser();
    } catch (e) {
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const login = (user) => {
    // Force role strings to match exactly what our templates expect
    const normalizedUser = {
      ...user,
      role: user.role.trim().toLowerCase() === "employer" ? "employer" : "candidate"
    };
    setCurrentUser(normalizedUser);
    storage.setCurrentUser(normalizedUser);
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem("hireflow_users") || "[]");

    if (users.some((u) => u.email.trim().toLowerCase() === userData.email.trim().toLowerCase())) {
      throw new Error("This email is already registered inside our routing logs.");
    }

    const newUser = {
      ...userData,
      id: "user_" + Math.random().toString(36).substr(2, 9),
      role: userData.role.toLowerCase() === "employer" ? "employer" : "candidate", 
    };

    users.push(newUser);
    localStorage.setItem("hireflow_users", JSON.stringify(users));

    setCurrentUser(newUser);
    storage.setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
    storage.clearCurrentUser();
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, darkMode, setDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}