import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      {/* 🛡️ CSS Grid/Flexbox wrapper: forces footer down to bottom on empty pages */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f8fafc" }}>
        
        <Navbar />
        
        {/* Main section expands to take up all empty room */}
        <main style={{ flex: "1 0 auto", paddingBottom: "3rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Fallback routing parameter */}
            <Route path="/applicants" element={<Dashboard />} />
            <Route path="/jobs-posted" element={<Dashboard />} />
            <Route path="/my-applications" element={<Dashboard />} />
          </Routes>
        </main>
        
        <Footer />
        
      </div>
    </Router>
  );
}