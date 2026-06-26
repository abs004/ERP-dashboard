import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/dashboard", icon: "🏠", label: "Home", end: true },
  { to: "/dashboard/tasks", icon: "✅", label: "Task Management" },
  { to: "/dashboard/attendance", icon: "📅", label: "Attendance" },
  { to: "/dashboard/reports", icon: "📋", label: "Daily Report" },
  { to: "/dashboard/schedule", icon: "🗓️", label: "Schedule" },
  { to: "/dashboard/performance", icon: "📈", label: "Performance" },
  { to: "/dashboard/salary", icon: "💰", label: "Salary" },
];

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🏢</div>
        <div>
          <span>ERP Portal</span>
          <small>Admin Dashboard</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <div className="user-name">Admin</div>
            <div className="user-role">Administrator</div>
          </div>
          <button
            className="logout-btn"
            title="Logout"
            onClick={() => navigate("/")}
          >
            ⎋
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
