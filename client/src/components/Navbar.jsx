import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const title = routeTitles[location.pathname] || "Dashboard";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/");
  };

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

        {/* Avatar with dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <div
            className="topbar-avatar"
            title="Account"
            onClick={() => setDropdownOpen((v) => !v)}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            A
          </div>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                right: 0,
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-lg)",
                minWidth: 180,
                zIndex: 300,
                overflow: "hidden",
                animation: "slideUp .15s ease",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg)",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 13 }}>Admin</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                  admin@test.com
                </div>
              </div>

              {/* Menu items */}
              <div style={{ padding: "4px 0" }}>
                <button
                  onClick={() => { setDropdownOpen(false); navigate("/dashboard"); }}
                  style={menuItemStyle}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  👤 &nbsp; My Profile
                </button>
                <button
                  onClick={() => { setDropdownOpen(false); navigate("/dashboard/salary"); }}
                  style={menuItemStyle}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  💰 &nbsp; Salary
                </button>

                <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />

                <button
                  onClick={handleLogout}
                  style={{ ...menuItemStyle, color: "var(--danger)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  🚪 &nbsp; Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const menuItemStyle = {
  display: "block",
  width: "100%",
  padding: "9px 16px",
  background: "transparent",
  border: "none",
  textAlign: "left",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
  color: "var(--text-primary)",
  transition: "background .15s",
};

export default Navbar;
