import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getUsers, saveUsers } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    company: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const users = getUsers();

    // Check if a user with the same email already exists
    const userExists = users.some(
      (u) => u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (userExists) {
      toast.error("User Exists with this email address");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      ...form,
    };

    users.push(newUser);
    saveUsers(users);
    login(newUser);

    toast.success("Account Created Successfully!");
    navigate("/dashboard");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        required
      />

      <select
        value={form.role}
        onChange={(e) =>
          setForm({ ...form, role: e.target.value, company: "" })
        }
      >
        <option value="candidate">Candidate</option>
        <option value="employer">Employer</option>
      </select>

      {form.role === "employer" && (
        <input
          placeholder="Company Name"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
          required
        />
      )}

      <button type="submit">Signup</button>
    </form>
  );
}