import { useAuth } from "../context/AuthContext";

export default function InfoModals({ type, onClose }) {
  const { currentUser } = useAuth();

  const getContent = () => {
    switch (type) {
      case "profile":
        return {
          title: "My Profile Details",
          body: currentUser ? (
            <div>
              <p><strong>Full Name:</strong> {currentUser.name || currentUser.username || "Candidate User"}</p>
              <p><strong>Email Address:</strong> {currentUser.email || "student@hireflow.edu"}</p>
              <p><strong>System Role:</strong> {currentUser.role}</p>
              <p><strong>Account Status:</strong> Active Local Thread Instance</p>
            </div>
          ) : (
            <p>Please log in to view profile details.</p>
          )
        };
      case "about":
        return {
          title: "About HireFlow",
          body: <p>HireFlow is a zero-latency workspace mapping tool that pairs talent pipelines directly with corporate hiring parameters.</p>
        };
      case "contact":
        return {
          title: "Contact Support",
          body: <p>Reach engineering logs electronically at: <strong>support@hireflow.edu</strong></p>
        };
      case "privacy":
        return {
          title: "Isolated Privacy Policy",
          body: <p>Data indices are processed and cached strictly within local hardware modules.</p>
        };
      default:
        return { title: "", body: null };
    }
  };

  const content = getContent();

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, color: "#1e293b" }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "8px", width: "90%", maxWidth: "450px" }}>
        <h3 style={{ marginTop: 0, color: "#0d9488" }}>{content.title}</h3>
        <div style={{ margin: "1rem 0", lineHeight: "1.5" }}>{content.body}</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "#0d9488", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}>Close</button>
        </div>
      </div>
    </div>
  );
}