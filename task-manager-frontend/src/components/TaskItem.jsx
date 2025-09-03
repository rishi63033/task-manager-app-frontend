import { useState } from "react";

export default function TaskItem({ task, token, API_URL, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  // Save edits
  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const updatedTask = await res.json();
      onUpdate(updatedTask);
      setIsEditing(false);
    } catch (err) {
      console.error("Update task error:", err.message);
    }
  };

  // Change status
  const handleStatusChange = async (status) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${task._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const updatedTask = await res.json();
      onUpdate(updatedTask); // 👈 updates immediately in UI
    } catch (err) {
      console.error("Status change error:", err.message);
    }
  };

  // Delete task
  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/api/tasks/${task._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(task._id);
    } catch (err) {
      console.error("Delete task error:", err.message);
    }
  };

  return (
    <div
      className="task-item"
      style={{
        backgroundColor: task.status === "completed" ? "#d4edda" : "#f8d7da", // ✅ green for completed, red for pending
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "6px",
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3
            style={{
              textDecoration: task.status === "completed" ? "" : "none", // ✅ strike completed title
            }}
          >
            {task.title}
          </h3>
          <p>{task.description}</p>
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}
