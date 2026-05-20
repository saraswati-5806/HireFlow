export default function InfoModals({ type, onClose }) {
  const getContent = () => {
    switch (type) {
      case "recruiters":
        return {
          title: "Find Recruiters Directory",
          body: (
            <div>
              <p>Connect with active corporate talent acquisition pipelines looking for engineering talent:</p>
              <ul>
                <li><strong>Acme Corporate Tech:</strong> Cloud infrastructure development loops.</li>
                <li><strong>NexGen Systems Group:</strong> Interactive web frontend engineering pipelines.</li>
                <li><strong>Global Data Nodes:</strong> Core system optimizations and data structures.</li>
              </ul>
            </div>
          )
        };
      case "about":
        return {
          title: "About HireFlow Framework",
          body: (
            <p>HireFlow is an independent client-driven platform designed to remove complex overhead from entry-level engineering placement workflows. Operating inside isolated local memory layers, the framework delivers zero-latency workspace configurations instantly.</p>
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
          title: "Privacy & Memory Isolation Guidelines",
          body: (
            <p>HireFlow secures parameters by running execution scripts entirely within separate client memory modules. No personal usage profiling sequences or session analytics indices are collected, recorded, or transmitted outside your workspace environment.</p>
          )
        };
      default:
        return { title: "", body: null };
    }
  };

  const content = getContent();

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(15, 23, 42, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, color: "#1e293b", fontFamily: "sans-serif" }}>
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