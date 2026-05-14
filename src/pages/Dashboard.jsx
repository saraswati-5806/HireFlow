import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <h2>Welcome {currentUser.name}</h2>

      <p>Role: {currentUser.role}</p>
    </div>
  );
}