const schedule = [
  { day: "Monday", shift: "Morning", time: "09:00 AM – 06:00 PM", location: "HQ – Floor 3", status: "Regular" },
  { day: "Tuesday", shift: "Morning", time: "09:00 AM – 06:00 PM", location: "HQ – Floor 3", status: "Regular" },
  { day: "Wednesday", shift: "Work From Home", time: "10:00 AM – 07:00 PM", location: "Remote", status: "WFH" },
  { day: "Thursday", shift: "Morning", time: "09:00 AM – 06:00 PM", location: "HQ – Floor 3", status: "Regular" },
  { day: "Friday", shift: "Half Day", time: "09:00 AM – 01:00 PM", location: "HQ – Floor 2", status: "Half Day" },
  { day: "Saturday", shift: "Off", time: "—", location: "—", status: "Off" },
  { day: "Sunday", shift: "Off", time: "—", location: "—", status: "Off" },
];

const shiftColors = {
  Regular: { bg: "#dbeafe", color: "#1e40af" },
  WFH: { bg: "#d1fae5", color: "#065f46" },
  "Half Day": { bg: "#fef3c7", color: "#92400e" },
  Off: { bg: "#f1f5f9", color: "#64748b" },
};

const team = [
  { name: "Alice Johnson", role: "Frontend Dev", mon: "Morning", tue: "Morning", wed: "WFH", thu: "Morning", fri: "Half Day" },
  { name: "Bob Smith", role: "Backend Dev", mon: "Morning", tue: "WFH", wed: "Morning", thu: "Morning", fri: "Morning" },
  { name: "Carol Davis", role: "UI/UX Designer", mon: "Morning", tue: "Morning", wed: "Morning", thu: "WFH", fri: "Half Day" },
  { name: "David Lee", role: "QA Engineer", mon: "WFH", tue: "Morning", wed: "Morning", thu: "Morning", fri: "Off" },
];

function Schedule() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Weekly Schedule</div>
          <div className="page-subtitle">Work schedule for the current week</div>
        </div>
      </div>

      {/* Admin schedule */}
      <div className="card mb-6">
        <div style={{ marginBottom: 16, fontWeight: 700, fontSize: 15 }}>My Schedule</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Shift</th>
                <th>Time</th>
                <th>Location</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => {
                const c = shiftColors[row.status];
                return (
                  <tr key={row.day}>
                    <td style={{ fontWeight: 600 }}>{row.day}</td>
                    <td>{row.shift}</td>
                    <td style={{ fontFamily: "monospace", fontSize: 13 }}>{row.time}</td>
                    <td>{row.location}</td>
                    <td>
                      <span
                        className="badge"
                        style={{ background: c.bg, color: c.color }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team schedule matrix */}
      <div className="card">
        <div style={{ marginBottom: 16, fontWeight: 700, fontSize: 15 }}>Team Schedule</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
              </tr>
            </thead>
            <tbody>
              {team.map((row) => (
                <tr key={row.name}>
                  <td style={{ fontWeight: 500 }}>{row.name}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{row.role}</td>
                  {[row.mon, row.tue, row.wed, row.thu, row.fri].map((s, i) => {
                    const c = shiftColors[s] || shiftColors.Regular;
                    return (
                      <td key={i}>
                        <span className="badge" style={{ background: c.bg, color: c.color }}>
                          {s}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Schedule;
