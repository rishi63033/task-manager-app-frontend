import { useState } from "react";

export default function AddTask({ token, API_URL, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, status: "pending" })
      });
      const data = await res.json();
      onTaskAdded(data);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("AddTask error:", err.message);
      alert("Failed to add task");
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          rows={3}
        />
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
