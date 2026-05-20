import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

// 🌟 Safe inner wrapper that reads context variables cleanly without crashing
function AppContent() {
  const { darkMode } = useAuth();

  return (
    <div className={darkMode ? "dark" : ""} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <main style={{ flex: "1 0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Fallback routes */}
          <Route path="/applicants" element={<Dashboard />} />
          <Route path="/jobs-posted" element={<Dashboard />} />
          <Route path="/my-applications" element={<Dashboard />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

// 🛡️ The master component only sets up providers, it doesn't call useAuth() directly
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}