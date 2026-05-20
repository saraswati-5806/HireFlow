export default function InfoModals({ type, onClose }) {
  const getContent = () => {
    switch (type) {
      case "advice":
        return {
          title: "Career Advice Portal",
          body: (
            <div>
              <p><strong>1. Continuous Skill Accumulation:</strong> Focus on refining technical fundamentals in Software Engineering and system-level architectures daily.</p>
              <p><strong>2. Network Orchestration:</strong> Engage with active open-source ecosystems and maintain high visibility repositories on GitHub.</p>
              <p><strong>3. Mock Evaluation Runs:</strong> Dedicate routine cycles to timed programmatic challenges to sharpen runtime efficiency logic.</p>
            </div>
          )
        };
      case "tips":
        return {
          title: "Resume Refinement Guidelines",
          body: (
            <div>
              <p>• <strong>Quantify Output Metrics:</strong> Replace basic objective statements with structural production metrics (e.g., 'Optimized state queries by 40%').</p>
              <p>• <strong>Prioritize Tech Stack Layouts:</strong> Dedicate an upper-tier indexing grid for programming languages and modeling standards like UML.</p>
              <p>• <strong>Keep It Monolithic:</strong> Maintain a single-page layout hierarchy containing active hyperlinks directly targeting your portfolio.</p>
            </div>
          )
        };
      case "about":
        return {
          title: "About HireFlow Framework",
          body: (
            <p>HireFlow is an independent client-driven system developed to remove complex overhead from initial student placement workflows. Operating entirely inside native browser memory layers, the platform delivers zero-latency workspace routing for candidates and recruiters alike.</p>
          )
        };
      case "contact":
        return {
          title: "Contact Engineering Support",
          body: (
            <div>
              <p><strong>Corporate Workspace Hub:</strong> Tech Core Park, Phase II, Bangalore, KA</p>
              <p><strong>Electronic Communication Logs:</strong> support@hireflow.edu</p>
              <p><strong>System Assistance Channels:</strong> +91 80 4912 7000 (Mon-Fri, 09:00 - 18:00 IST)</p>
            </div>
          )
        };
      case "privacy":
        return {
          title: "Privacy & Memory Isolation Architecture",
          body: (
            <p>HireFlow secures user parameters by maintaining execution threads completely inside isolated client hardware. No persistent profiling strings or session tracking histories are compiled or transmitted over tracking networks. Clearing browser memory logs securely purges all data instances instantly.</p>
          )
        };
      default:
        return { title: "", body: null };
    }
  };

  const content = getContent();

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(15, 23, 42, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, color: "#1e293b" }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "500px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)" }}>
        <h3 style={{ marginTop: 0, color: "#115e59", fontSize: "1.4rem", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem" }}>{content.title}</h3>
        <div style={{ margin: "1.5rem 0", lineHeight: "1.5", fontSize: "0.95rem" }}>{content.body}</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "#0d9488", color: "white", border: "none", padding: "0.5rem 1.25rem", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            Dismiss View
          </button>
        </div>
      </div>
    </div>
  );
}