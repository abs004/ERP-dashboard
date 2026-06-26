import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000";
const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];

function badgeClass(status) {
  if (status === "Pending") return "badge badge-pending";
  if (status === "In Progress") return "badge badge-progress";
  return "badge badge-completed";
}

function TaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task?.title || "");
  const [status, setStatus] = useState(task?.status || "Pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), status });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{task ? "Edit Task" : "Add New Task"}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task description…"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {task ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "add" | task object
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (data) => {
    const res = await axios.post(`${API}/tasks`, data);
    setTasks((prev) => [...prev, res.data]);
    setModal(null);
  };

  const editTask = async (data) => {
    await axios.put(`${API}/tasks/${modal.id}`, data);
    setTasks((prev) => prev.map((t) => t.id === modal.id ? { ...t, ...data } : t));
    setModal(null);
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await axios.delete(`${API}/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const changeStatus = async (task, status) => {
    await axios.put(`${API}/tasks/${task.id}`, { status });
    setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, status } : t));
  };

  const filtered = filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = tasks.filter((t) => t.status === s).length;
    return acc;
  }, {});

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Task Management</div>
          <div className="page-subtitle">{tasks.length} total tasks · {counts["Pending"]} pending</div>
        </div>
        <button className="btn btn-primary" onClick={() => setModal("add")}>
          ➕ Add Task
        </button>
      </div>

      {/* Summary */}
      <div className="card-grid card-grid-3 mb-6">
        {STATUS_OPTIONS.map((s) => (
          <div key={s} className="stat-card" style={{ cursor: "pointer" }} onClick={() => setFilter(s)}>
            <div className={`stat-icon ${s === "Pending" ? "amber" : s === "In Progress" ? "sky" : "green"}`}>
              {s === "Pending" ? "⏳" : s === "In Progress" ? "🔄" : "✅"}
            </div>
            <div className="stat-body">
              <div className="stat-label">{s}</div>
              <div className="stat-value">{counts[s]}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="card">
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {["All", ...STATUS_OPTIONS].map((f) => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {error && <p style={{ color: "var(--danger)", marginBottom: 12 }}>{error}</p>}

        {loading ? (
          <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: 40 }}>
            Loading tasks…
          </p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 48, color: "var(--text-secondary)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <p>No tasks found. Click <strong>Add Task</strong> to get started.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task Title</th>
                  <th>Status</th>
                  <th>Change Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((task, idx) => (
                  <tr key={task.id}>
                    <td style={{ color: "var(--text-secondary)" }}>{idx + 1}</td>
                    <td style={{ fontWeight: 500 }}>{task.title}</td>
                    <td>
                      <span className={badgeClass(task.status)}>{task.status}</span>
                    </td>
                    <td>
                      <select
                        value={task.status}
                        onChange={(e) => changeStatus(task, e.target.value)}
                        style={{ width: "auto", padding: "5px 8px" }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => setModal(task)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTask(task.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <TaskModal
          task={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={modal === "add" ? addTask : editTask}
        />
      )}
    </>
  );
}

export default Tasks;
