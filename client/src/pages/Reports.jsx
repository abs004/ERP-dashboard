const reports = [
  {
    title: "Tasks Completed",
    value: "14",
    sub: "out of 18 assigned",
    icon: "✅",
    bg: "#d1fae5",
    color: "#065f46",
    detail: "3 critical tasks resolved before deadline.",
  },
  {
    title: "Meetings Attended",
    value: "5",
    sub: "4 hrs total",
    icon: "🤝",
    bg: "#dbeafe",
    color: "#1e40af",
    detail: "Stand-up, sprint review, client sync, HR, team retro.",
  },
  {
    title: "Work Hours Logged",
    value: "9.5 hrs",
    sub: "Target: 8 hrs",
    icon: "⏱️",
    bg: "#fef3c7",
    color: "#92400e",
    detail: "Overtime approved for critical bug fix.",
  },
  {
    title: "Project Updates",
    value: "3",
    sub: "Milestones hit",
    icon: "🚀",
    bg: "#ede9fe",
    color: "#5b21b6",
    detail: "Phase 1 delivered, Phase 2 kicked off, Phase 3 scoped.",
  },
  {
    title: "Emails Handled",
    value: "42",
    sub: "Avg response: 18 min",
    icon: "📧",
    bg: "#e0f2fe",
    color: "#0369a1",
    detail: "All priority emails responded within SLA.",
  },
  {
    title: "Issues Resolved",
    value: "8",
    sub: "2 escalated",
    icon: "🛠️",
    bg: "#fee2e2",
    color: "#991b1b",
    detail: "Customer complaints reduced by 22% this week.",
  },
];

const timeline = [
  { time: "09:00 AM", event: "Morning stand-up meeting", type: "meeting" },
  { time: "10:00 AM", event: "Completed Q2 budget review task", type: "task" },
  { time: "11:30 AM", event: "Client sync call – Project Aurora", type: "meeting" },
  { time: "01:30 PM", event: "Reviewed 3 pull requests", type: "task" },
  { time: "03:00 PM", event: "HR policy update briefing", type: "meeting" },
  { time: "04:30 PM", event: "Resolved critical production bug", type: "task" },
  { time: "05:30 PM", event: "Submitted end-of-day report", type: "report" },
];

const typeColor = { meeting: "#6366f1", task: "#10b981", report: "#f59e0b" };

function Reports() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Daily Report</div>
          <div className="page-subtitle">
            Summary for {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="card-grid card-grid-3 mb-6">
        {reports.map((r) => (
          <div key={r.title} className="report-card">
            <div className="report-card-icon" style={{ background: r.bg }}>
              {r.icon}
            </div>
            <div className="report-card-title">{r.title}</div>
            <div className="report-card-value" style={{ color: r.color }}>{r.value}</div>
            <div className="report-card-sub">{r.sub}</div>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 10, lineHeight: 1.5 }}>
              {r.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="card">
        <div className="page-header" style={{ marginBottom: 20 }}>
          <div className="page-title" style={{ fontSize: 16 }}>Today&apos;s Activity Timeline</div>
        </div>
        <div style={{ position: "relative", paddingLeft: 24 }}>
          <div
            style={{
              position: "absolute",
              left: 7,
              top: 0,
              bottom: 0,
              width: 2,
              background: "var(--border)",
              borderRadius: 2,
            }}
          />
          {timeline.map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20, position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -20,
                  top: 3,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: typeColor[item.type],
                  border: "2px solid #fff",
                  boxShadow: "0 0 0 2px " + typeColor[item.type] + "33",
                }}
              />
              <div style={{ fontSize: 12, color: "var(--text-secondary)", flexShrink: 0, width: 80 }}>
                {item.time}
              </div>
              <div style={{ fontWeight: 500, fontSize: 13 }}>{item.event}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Reports;
