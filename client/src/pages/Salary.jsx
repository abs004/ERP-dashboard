const salaryData = {
  employee: "Admin",
  month: "June 2026",
  designation: "Administrator",
  department: "Management",
  basic: 50000,
  hra: 20000,
  bonus: 5000,
  tax: 7500,
  pf: 3000,
};

const net = salaryData.basic + salaryData.hra + salaryData.bonus - salaryData.tax - salaryData.pf;

const breakdownHistory = [
  { month: "January 2026", basic: 50000, hra: 20000, bonus: 3000, tax: 7200, pf: 3000, net: 62800 },
  { month: "February 2026", basic: 50000, hra: 20000, bonus: 3000, tax: 7200, pf: 3000, net: 62800 },
  { month: "March 2026", basic: 50000, hra: 20000, bonus: 4000, tax: 7350, pf: 3000, net: 63650 },
  { month: "April 2026", basic: 50000, hra: 20000, bonus: 4500, tax: 7425, pf: 3000, net: 64075 },
  { month: "May 2026", basic: 50000, hra: 20000, bonus: 4500, tax: 7425, pf: 3000, net: 64075 },
  { month: "June 2026", basic: 50000, hra: 20000, bonus: 5000, tax: 7500, pf: 3000, net: 64500 },
];

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

const breakdown = [
  { label: "Basic Salary", amount: salaryData.basic, type: "credit", icon: "💼" },
  { label: "House Rent Allowance (HRA)", amount: salaryData.hra, type: "credit", icon: "🏠" },
  { label: "Performance Bonus", amount: salaryData.bonus, type: "credit", icon: "🏆" },
  { label: "Provident Fund (PF)", amount: -salaryData.pf, type: "debit", icon: "🔐" },
  { label: "Income Tax (TDS)", amount: -salaryData.tax, type: "debit", icon: "📋" },
];

function Salary() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Salary</div>
          <div className="page-subtitle">
            Payroll details for {salaryData.employee} · {salaryData.month}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => window.print()}>
          🖨️ Download Slip
        </button>
      </div>

      {/* Summary Strip */}
      <div className="salary-summary mb-6">
        {[
          { label: "Basic Salary", value: fmt(salaryData.basic), cls: "" },
          { label: "HRA", value: fmt(salaryData.hra), cls: "" },
          { label: "Bonus", value: fmt(salaryData.bonus), cls: "" },
          { label: "Tax & PF", value: fmt(salaryData.tax + salaryData.pf), cls: "tax" },
          { label: "Net Salary", value: fmt(net), cls: "net" },
        ].map((item) => (
          <div key={item.label} className="salary-item">
            <div className="salary-label">{item.label}</div>
            <div className={`salary-amount ${item.cls}`}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="card-grid card-grid-2">
        {/* Salary Breakdown */}
        <div className="card">
          <div style={{ marginBottom: 16, fontWeight: 700, fontSize: 15 }}>
            Current Month Breakdown
          </div>
          {breakdown.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ flex: 1, fontWeight: 500, fontSize: 13 }}>{item.label}</span>
              <span
                style={{
                  fontWeight: 700,
                  color: item.type === "credit" ? "var(--success)" : "var(--danger)",
                }}
              >
                {item.type === "credit" ? "+" : "-"}{fmt(Math.abs(item.amount))}
              </span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              padding: "14px 16px",
              background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
              borderRadius: 10,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 15 }}>Net Salary</span>
            <span style={{ fontWeight: 800, fontSize: 22, color: "#065f46" }}>{fmt(net)}</span>
          </div>
        </div>

        {/* Employee Info */}
        <div className="card">
          <div style={{ marginBottom: 16, fontWeight: 700, fontSize: 15 }}>
            Employee Information
          </div>
          {[
            { label: "Employee Name", value: salaryData.employee },
            { label: "Designation", value: salaryData.designation },
            { label: "Department", value: salaryData.department },
            { label: "Pay Period", value: salaryData.month },
            { label: "Payment Mode", value: "Bank Transfer" },
            { label: "Account No.", value: "XXXX XXXX 4521" },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: 13,
              }}
            >
              <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{row.label}</span>
              <span style={{ fontWeight: 600 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="card mt-4">
        <div style={{ marginBottom: 16, fontWeight: 700, fontSize: 15 }}>Salary History</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Basic</th>
                <th>HRA</th>
                <th>Bonus</th>
                <th>Tax</th>
                <th>PF</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {breakdownHistory.map((row) => (
                <tr key={row.month}>
                  <td style={{ fontWeight: 500 }}>{row.month}</td>
                  <td>{fmt(row.basic)}</td>
                  <td>{fmt(row.hra)}</td>
                  <td style={{ color: "var(--success)" }}>{fmt(row.bonus)}</td>
                  <td style={{ color: "var(--danger)" }}>{fmt(row.tax)}</td>
                  <td style={{ color: "var(--danger)" }}>{fmt(row.pf)}</td>
                  <td style={{ fontWeight: 700, color: "var(--success)" }}>{fmt(row.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Salary;
