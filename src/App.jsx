import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* The Flexbox wrapper pushes the footer to the bottom */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
          
          <Navbar />
          
          {/* Main content takes up all available vertical space */}
          <main style={{ flex: "1 0 auto", width: "100%" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Short-cut fallbacks for footer links */}
              <Route path="/applicants" element={<Dashboard />} />
              <Route path="/jobs-posted" element={<Dashboard />} />
              <Route path="/my-applications" element={<Dashboard />} />
            </Routes>
          </main>
          
          <Footer />
          
        </div>
      </Router>
    </AuthProvider>
  );
}