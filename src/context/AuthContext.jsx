import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { 
  loginUser, 
  signupUser, 
  logoutUser, 
  getCurrentUser 
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

  // 1. Asynchronous Login connecting to the Express Server
  const login = async (email, password) => {
    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
    } catch (error) {
      // Passes the backend's error message (like "Incorrect account password") up to your Form components
      throw error;
    }
  };

  // 2. Asynchronous Signup connecting to the Express Server
  const signup = async (userData) => {
    try {
      const registeredUser = await signupUser(userData);
      setUser(registeredUser);
    } catch (error) {
      throw error;
    }
  };

  // 3. Logout handler to clear backend session state tokens
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Optimize the context value to prevent unnecessary re-renders across dashboard layouts
  const value = useMemo(() => ({
    currentUser,
    login,
    signup,
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