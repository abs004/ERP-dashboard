import { useLocation } from "react-router-dom";

const routeTitles = {
  "/dashboard": "Home",
  "/dashboard/tasks": "Task Management",
  "/dashboard/attendance": "Attendance",
  "/dashboard/reports": "Daily Report",
  "/dashboard/schedule": "Schedule",
  "/dashboard/performance": "Performance",
  "/dashboard/salary": "Salary",
};

function Navbar() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Dashboard";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">
        <div className="topbar-date">📅 {today}</div>
        <button className="topbar-icon-btn" title="Notifications">
          🔔
          <span className="notif-dot" />
        </button>
        <button className="topbar-icon-btn" title="Settings">⚙️</button>
        <div className="topbar-avatar" title="Admin">A</div>
      </div>
    </header>
  );
}

export default Navbar;
