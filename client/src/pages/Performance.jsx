const kpis = [
  { label: "Avg Performance Score", value: "87%", icon: "🏆", color: "#6366f1", bg: "#e0e7ff" },
  { label: "Tasks Completed", value: "342", icon: "✅", color: "#10b981", bg: "#d1fae5" },
  { label: "On-time Delivery", value: "92%", icon: "⏱️", color: "#0ea5e9", bg: "#e0f2fe" },
  { label: "Team Efficiency", value: "88%", icon: "⚡", color: "#f59e0b", bg: "#fef3c7" },
];

const employees = [
  { name: "Alice Johnson", role: "Frontend Dev", projects: 8, score: 94, rating: "Excellent" },
  { name: "Bob Smith", role: "Backend Dev", projects: 7, score: 89, rating: "Very Good" },
  { name: "Carol Davis", role: "UI/UX Designer", projects: 6, score: 91, rating: "Excellent" },
  { name: "David Lee", role: "QA Engineer", projects: 9, score: 78, rating: "Good" },
  { name: "Eva Chen", role: "DevOps", projects: 5, score: 85, rating: "Very Good" },
  { name: "Frank Miller", role: "Data Analyst", projects: 6, score: 72, rating: "Good" },
  { name: "Grace Kim", role: "Project Manager", projects: 12, score: 96, rating: "Outstanding" },
  { name: "Henry Patel", role: "Backend Dev", projects: 4, score: 68, rating: "Average" },
];

const ratingConfig = {
  Outstanding: { bg: "#d1fae5", color: "#065f46" },
  Excellent: { bg: "#e0e7ff", color: "#4338ca" },
  "Very Good": { bg: "#dbeafe", color: "#1e40af" },
  Good: { bg: "#fef3c7", color: "#92400e" },
  Average: { bg: "#fee2e2", color: "#991b1b" },
};

function ScoreBar({ score }) {
  const color =
    score >= 90 ? "#10b981" :
    score >= 80 ? "#6366f1" :
    score >= 70 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div className="kpi-bar-wrap" style={{ flex: 1 }}>
        <div className="kpi-bar-track">
          <div
            className="kpi-bar-fill"
            style={{ width: `${score}%`, background: color }}
          />
        </div>
      </div>
      <span style={{ fontWeight: 700, fontSize: 13, color, minWidth: 34 }}>{score}</span>
    </div>
  );
}

function Performance() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Performance</div>
          <div className="page-subtitle">Team KPIs and individual performance metrics</div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="card-grid card-grid-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="stat-card">
            <div className="stat-icon" style={{ background: k.bg }}>{k.icon}</div>
            <div className="stat-body">
              <div className="stat-label">{k.label}</div>
              <div className="stat-value" style={{ color: k.color }}>{k.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Employee performance table */}
      <div className="card">
        <div style={{ marginBottom: 16, fontWeight: 700, fontSize: 15 }}>Employee Performance</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Role</th>
                <th>Projects</th>
                <th style={{ minWidth: 180 }}>Score</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {employees
                .sort((a, b) => b.score - a.score)
                .map((emp, i) => {
                  const rc = ratingConfig[emp.rating] || ratingConfig.Good;
                  return (
                    <tr key={emp.name}>
                      <td style={{ color: "var(--text-secondary)" }}>{i + 1}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div
                            style={{
                              width: 30, height: 30, borderRadius: "50%",
                              background: `hsl(${i * 47 + 210}, 65%, 55%)`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#fff", fontWeight: 700, fontSize: 11, flexShrink: 0,
                            }}
                          >
                            {emp.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span style={{ fontWeight: 500 }}>{emp.name}</span>
                        </div>
                      </td>
                      <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{emp.role}</td>
                      <td style={{ textAlign: "center" }}>{emp.projects}</td>
                      <td><ScoreBar score={emp.score} /></td>
                      <td>
                        <span className="badge" style={{ background: rc.bg, color: rc.color }}>
                          {emp.rating}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Performance;
