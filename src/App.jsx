import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Applicants from "./pages/Applicants";
import MyApplications from "./pages/MyApplications";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* 💡 THE FOOTER PROTECTION WRAPPER CONTAINER */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          
          <Navbar />
          
          {/* Main page content auto-expands to push footer down */}
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applicants" element={<Applicants />} />
              <Route path="/my-applications" element={<MyApplications />} />
            </Routes>
          </main>
          
          <Footer />
          
        </div>
      </Router>
    </AuthProvider>
  );
}