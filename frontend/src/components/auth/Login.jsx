import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import { Mail, Lock, Eye, EyeOff, Brain, ArrowRight, AlertCircle } from "lucide-react";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await loginUser(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg-grid" />
        <div className="auth-bg-glow auth-bg-glow-1" />
        <div className="auth-bg-glow auth-bg-glow-2" />
      </div>

      <div className="auth-card animate-scale-in">
        {/* Header */}
        <div className="auth-card-header">
          <div className="auth-logo">
            <Brain size={22} strokeWidth={2} />
          </div>
          <h1 className="auth-title">Sign in to LearNova</h1>
          <p className="auth-subtitle">Continue your AI & ML learning journey</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Error */}
          {error && (
            <div className="auth-error">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email address</label>
            <div className="form-input-icon-wrap">
              <Mail size={15} className="form-icon" />
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="auth-label-row">
              <label className="form-label">Password</label>
            </div>
            <div className="form-input-icon-wrap">
              <Lock size={15} className="form-icon" />
              <input
                className="form-input auth-password-input"
                type={show ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button type="button" className="auth-eye-btn" onClick={() => setShow(s => !s)}>
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button className="btn btn-primary btn-lg auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : <><span>Sign In</span><ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register" className="auth-link">Create account</Link>
        </div>
      </div>
    </div>
  );
}
