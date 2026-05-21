import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      // ── Background Image Layout Settings ──
      width: "100%",
      minHeight: "90vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
      padding: "4rem 2rem",
      boxSizing: "border-box",
      // Points directly to public/bg-hero.jpg securely with zero reference errors!
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('/bg-hero.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      
      {/* Wrapper to restrict content width exactly like your original design */}
      <div style={{ maxWidth: "900px", width: "100%", textAlign: "center" }}>
        
        <h1 style={{ fontSize: "3rem", color: "#0d9488", marginBottom: "1rem" }}>Streamline Your Engineering Placement Loop</h1>
        
        <p style={{ fontSize: "1.2rem", color: "#e2e8f0", marginBottom: "2.5rem", lineHeight: "1.6" }}>
          HireFlow bridges the gap between software engineering candidates and active technical placement matrices using client-side memory spaces.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "4rem" }}>
          <button onClick={() => navigate("/jobs")} style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
            Explore Openings
          </button>
          <button onClick={() => navigate("/signup")} style={{ padding: "1rem 2rem", fontSize: "1.1rem", background: "#115e59" }}>
            Register Node
          </button>
        </div>

        <div style={{ background: "rgba(224, 242, 254, 0.9)", padding: "2rem", borderRadius: "8px", border: "1px solid #0d9488", color: "#0f172a" }}>
          <h3>💡 Engineering Architecture Directive</h3>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.95rem", lineHeight: "1.5" }}>
            This interface compiles and maps operations straight to browser local memory cells. No isolated backend runtime engine threads are required to sustain current mock validation testing.
          </p>
        </div>

      </div>
    </div>
  );
}