import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';
import API_URL from './config';

export default function App() {
  const [token, setToken] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Fetch tasks error:", err.message);
      }
    };

    fetchTasks();
  }, [token]);

  const handleTaskAdded = (newTask) => setTasks([...tasks, newTask]);

  return (
    <main className="app-container">
      {/* Always show heading */}
      <h1 className="app-title">Task Manager</h1>

      {/* Small triangle at top-right */}
      <div className="corner-triangle">
        <div className="corner-text">TM</div>
      </div>

      {!token ? (
        <div className="auth-container white-box">
          {showLogin ? (
            <>
              <Login setToken={setToken} setUserEmail={setUserEmail} />
              <p>
                Don't have an account?{" "}
                <button onClick={() => setShowLogin(false)}>Signup</button>
              </p>
            </>
          ) : (
            <>
              <Signup setToken={setToken} setUserEmail={setUserEmail} />
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowLogin(true)}>Login</button>
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <p>Welcome, {userEmail.split("@")[0]}</p>

          <div className="white-box">
            <AddTask token={token} API_URL={API_URL} onTaskAdded={handleTaskAdded} />
          </div>

          <div className="white-box">
            <TaskList tasks={tasks} setTasks={setTasks} token={token} API_URL={API_URL} />
          </div>

          <div className="white-box" style={{ textAlign: "right" }}>
            <button
              className="logout-button"
              style={{ backgroundColor: "lightcoral", color: "white" }}
              onClick={() => {
                setToken(null);
                setUserEmail("");
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
