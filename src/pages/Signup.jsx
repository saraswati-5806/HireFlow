import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const newUser = {
      id: Date.now().toString(),
      ...form,
    };

    users.push(newUser);

    saveUsers(users);

    login(newUser);

    navigate("/dashboard");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <select
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="candidate">Candidate</option>
        <option value="employer">Employer</option>
      </select>

      {form.role === "employer" && (
        <input
          placeholder="Company"
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
        />
      )}

      <button type="submit">Signup</button>
    </form>
  );
}