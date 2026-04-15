import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginWithGoogle } from "../../services/auth";
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

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google registration failed.");
    }
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

        <button className="auth-google-btn" onClick={handleGoogleLogin} type="button">
          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Sign up with Google</span>
        </button>

        <div className="auth-divider">
          <span>or create with email</span>
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
