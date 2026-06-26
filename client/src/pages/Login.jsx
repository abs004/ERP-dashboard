import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/login", { email, password });
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left">
        <div className="login-brand">
          <div className="login-brand-icon">🏢</div>
          <span className="login-brand-name">ERP Portal</span>
        </div>
        <h1 className="login-headline">
          Manage Your <span>Workforce</span> Smarter
        </h1>
        <p className="login-tagline">
          A complete employee administration platform — tasks, attendance,
          payroll and performance, all in one place.
        </p>
        <div className="login-features">
          <div className="login-feature">
            <div className="login-feature-icon">✅</div>
            <span className="login-feature-text">Real-time Task Management</span>
          </div>
          <div className="login-feature">
            <div className="login-feature-icon">📊</div>
            <span className="login-feature-text">Insightful Performance Analytics</span>
          </div>
          <div className="login-feature">
            <div className="login-feature-icon">💰</div>
            <span className="login-feature-text">Automated Salary Computation</span>
          </div>
          <div className="login-feature">
            <div className="login-feature-icon">🗓️</div>
            <span className="login-feature-text">Smart Attendance Tracking</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome back 👋</h2>
          <p>Sign in to your admin account to continue</p>

          {error && (
            <div className="login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={login}>
            <div className="login-field">
              <label className="login-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                className="login-input"
                type="email"
                placeholder="admin@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="login-field">
              <label className="login-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="login-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <div className="login-hint">
            <strong>Demo credentials</strong><br />
            Email: <strong>admin@test.com</strong> · Password: <strong>123456</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;