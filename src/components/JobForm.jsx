import { useState } from "react";

export default function JobForm({
  onSave,
  initialData,
}) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      location: "",
      type: "Full Time",
      salary: "",
      description: "",
      requirements: "",
    }
  );

  function handleSubmit(e) {
    e.preventDefault();

    onSave(form);

    setForm({
      title: "",
      location: "",
      type: "Full Time",
      salary: "",
      description: "",
      requirements: "",
    });
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>

      <input
        placeholder="Job Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        placeholder="Location"
        value={form.location}
        onChange={(e) =>
          setForm({
            ...form,
            location: e.target.value,
          })
        }
      />

      <select
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
      >
        <option>Full Time</option>
        <option>Part Time</option>
        <option>Remote</option>
        <option>Internship</option>
      </select>

      <input
        placeholder="Salary"
        value={form.salary}
        onChange={(e) =>
          setForm({ ...form, salary: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <input
        placeholder="Requirements comma separated"
        value={form.requirements}
        onChange={(e) =>
          setForm({
            ...form,
            requirements: e.target.value,
          })
        }
      />

      <button type="submit">
        {initialData ? "Update Job" : "Post Job"}
      </button>

    </form>
  );
}