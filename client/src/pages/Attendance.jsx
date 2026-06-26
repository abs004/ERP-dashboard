const attendanceData = [
  { employee: "Alice Johnson", date: "2026-06-26", checkIn: "09:02 AM", checkOut: "06:05 PM", status: "Present" },
  { employee: "Bob Smith", date: "2026-06-26", checkIn: "08:55 AM", checkOut: "05:58 PM", status: "Present" },
  { employee: "Carol Davis", date: "2026-06-26", checkIn: "—", checkOut: "—", status: "Absent" },
  { employee: "David Lee", date: "2026-06-26", checkIn: "09:45 AM", checkOut: "06:00 PM", status: "Late" },
  { employee: "Eva Chen", date: "2026-06-26", checkIn: "—", checkOut: "—", status: "Leave" },
  { employee: "Frank Miller", date: "2026-06-26", checkIn: "08:48 AM", checkOut: "05:55 PM", status: "Present" },
  { employee: "Grace Kim", date: "2026-06-26", checkIn: "09:01 AM", checkOut: "06:10 PM", status: "Present" },
  { employee: "Henry Patel", date: "2026-06-26", checkIn: "10:15 AM", checkOut: "07:00 PM", status: "Late" },
  { employee: "Irene Watson", date: "2026-06-26", checkIn: "08:59 AM", checkOut: "06:02 PM", status: "Present" },
  { employee: "James Brown", date: "2026-06-26", checkIn: "—", checkOut: "—", status: "Absent" },
];

const statusCounts = attendanceData.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});

const badgeMap = {
  Present: "badge badge-present",
  Absent: "badge badge-absent",
  Late: "badge badge-late",
  Leave: "badge badge-leave",
};

function Attendance() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Attendance</div>
          <div className="page-subtitle">Today's attendance overview — {new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Summary */}
      <div className="card-grid card-grid-4 mb-6">
        {[
          { label: "Present", count: statusCounts.Present || 0, icon: "✅", color: "green" },
          { label: "Absent", count: statusCounts.Absent || 0, icon: "❌", color: "amber" },
          { label: "Late", count: statusCounts.Late || 0, icon: "⏰", color: "sky" },
          { label: "On Leave", count: statusCounts.Leave || 0, icon: "🏖️", color: "indigo" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-body">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.count}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--text-secondary)" }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 30, height: 30, borderRadius: "50%",
                          background: `hsl(${i * 37 + 200}, 70%, 55%)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontWeight: 700, fontSize: 11, flexShrink: 0,
                        }}
                      >
                        {row.employee.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span style={{ fontWeight: 500 }}>{row.employee}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{row.date}</td>
                  <td>{row.checkIn}</td>
                  <td>{row.checkOut}</td>
                  <td>
                    <span className={badgeMap[row.status]}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Attendance;
