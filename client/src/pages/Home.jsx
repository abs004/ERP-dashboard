import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Employees", value: "124", change: "+4 this month", trend: "up", icon: "👥", color: "indigo" },
  { label: "Pending Tasks", value: "18", change: "3 due today", trend: "down", icon: "📋", color: "amber" },
  { label: "Attendance", value: "91%", change: "+2% vs last week", trend: "up", icon: "✅", color: "green" },
  { label: "Open Positions", value: "7", change: "2 interviews today", trend: "up", icon: "💼", color: "sky" },
];

const recentActivity = [
  { user: "Alice Johnson", action: "Completed task 'Q2 Report'", time: "2 min ago", avatar: "AJ", color: "#6366f1" },
  { user: "Bob Smith", action: "Marked attendance", time: "15 min ago", avatar: "BS", color: "#0ea5e9" },
  { user: "Carol Davis", action: "Submitted daily report", time: "32 min ago", avatar: "CD", color: "#10b981" },
  { user: "David Lee", action: "Updated task status to In Progress", time: "1 hr ago", avatar: "DL", color: "#f59e0b" },
  { user: "Eva Chen", action: "Requested leave for Jul 5", time: "2 hr ago", avatar: "EC", color: "#8b5cf6" },
];

const quickLinks = [
  { label: "Add Task", icon: "➕", path: "/dashboard/tasks", bg: "#e0e7ff", color: "#4338ca" },
  { label: "Attendance", icon: "📅", path: "/dashboard/attendance", bg: "#d1fae5", color: "#065f46" },
  { label: "Reports", icon: "📋", path: "/dashboard/reports", bg: "#fef3c7", color: "#92400e" },
  { label: "Salary", icon: "💰", path: "/dashboard/salary", bg: "#ede9fe", color: "#5b21b6" },
];

function Home() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      {/* Welcome Banner */}
      <div
        className="card mb-6"
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #a78bfa 100%)",
          border: "none",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 32px",
        }}
      >
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            Good morning, Admin! 👋
          </h2>
          <p style={{ opacity: 0.85, fontSize: 14 }}>
            {today} · Here&apos;s your workplace overview
          </p>
        </div>
        <div style={{ fontSize: 64, opacity: 0.2 }}>🏢</div>
      </div>

      {/* Stat Cards */}
      <div className="card-grid card-grid-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-body">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <span className={`stat-change ${s.trend}`}>
                {s.trend === "up" ? "↑" : "↓"} {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links + Activity */}
      <div className="card-grid card-grid-2">
        {/* Quick Actions */}
        <div className="card">
          <div className="page-header" style={{ marginBottom: 16 }}>
            <div>
              <div className="page-title" style={{ fontSize: 16 }}>Quick Actions</div>
              <div className="page-subtitle">Jump to key sections</div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
            }}
          >
            {quickLinks.map((q) => (
              <button
                key={q.label}
                onClick={() => navigate(q.path)}
                style={{
                  background: q.bg,
                  border: "none",
                  borderRadius: 10,
                  padding: "18px 14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "transform .18s, box-shadow .18s",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <span style={{ fontSize: 22 }}>{q.icon}</span>
                <span style={{ fontWeight: 600, color: q.color, fontSize: 13 }}>
                  {q.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="page-header" style={{ marginBottom: 16 }}>
            <div>
              <div className="page-title" style={{ fontSize: 16 }}>Recent Activity</div>
              <div className="page-subtitle">Latest updates from your team</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: a.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 11,
                    flexShrink: 0,
                  }}
                >
                  {a.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{a.user}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {a.action}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", flexShrink: 0 }}>
                  {a.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
