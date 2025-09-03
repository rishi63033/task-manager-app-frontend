import TaskItem from "./TaskItem";

export default function TaskList({ tasks, setTasks, token, API_URL }) {
  // Handle update
  const handleUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };

  // Handle delete
  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            token={token}
            API_URL={API_URL}
            onUpdate={handleUpdate}   // ✅ Pass handler
            onDelete={handleDelete}   // ✅ Pass handler
          />
        ))
      )}
    </div>
  );
}
