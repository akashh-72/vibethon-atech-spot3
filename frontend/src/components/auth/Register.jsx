import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { Mail, Lock, Eye, EyeOff, User, Brain, ArrowRight, AlertCircle } from "lucide-react";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ displayName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await registerUser(form.email, form.password, form.displayName);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
        <div className="auth-card-header">
          <div className="auth-logo">
            <Brain size={22} strokeWidth={2} />
          </div>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start mastering AI & Machine Learning today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Full name</label>
            <div className="form-input-icon-wrap">
              <User size={15} className="form-icon" />
              <input
                className="form-input"
                type="text"
                name="displayName"
                value={form.displayName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
          </div>

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
              />
            </div>
          </div>

          <div className="auth-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-icon-wrap">
                <Lock size={15} className="form-icon" />
                <input
                  className="form-input auth-password-input"
                  type={showPw ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="auth-eye-btn" onClick={() => setShowPw(s => !s)}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm password</label>
              <div className="form-input-icon-wrap">
                <Lock size={15} className="form-icon" />
                <input
                  className="form-input"
                  type={showPw ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-lg auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : <><span>Create Account</span><ArrowRight size={16}/></>}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
