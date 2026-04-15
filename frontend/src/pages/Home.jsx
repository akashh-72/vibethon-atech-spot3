import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, Gamepad2, Trophy, Zap, Brain, FlaskConical, Target, Users } from "lucide-react";
import "./Home.css";

const FEATURES = [
  { icon: BookOpen,    title: "Structured Curriculum",    desc: "Progressive learning paths from fundamentals to advanced AI & ML concepts, designed by experts.",  color: "#6366f1" },
  { icon: Code2,       title: "Code Playground",          desc: "Write and execute Python-style AI code directly in your browser with real-time output.",              color: "#06b6d4" },
  { icon: Target,      title: "Adaptive Quizzes",         desc: "Test your understanding with module-based assessments and receive instant, detailed feedback.",        color: "#10b981" },
  { icon: Gamepad2,    title: "Interactive Games",        desc: "Learn Decision Trees, Neural Networks, and Classification through hands-on interactive games.",        color: "#f59e0b" },
  { icon: FlaskConical,title: "Real-World Simulations",   desc: "Run actual ML use-cases like spam detection and Iris classification on real datasets.",               color: "#8b5cf6" },
  { icon: Trophy,      title: "Gamified Progress",        desc: "Earn XP, unlock badges, level up, and compete on live leaderboards with other learners.",             color: "#f43f5e" },
];

const STATS = [
  { value: "4", label: "Core Modules" },
  { value: "20+", label: "Lessons" },
  { value: "3", label: "Mini-Games" },
  { value: "2", label: "Simulations" },
];

export default function Home() {
  return (
    <div className="home">
      {/* Background */}
      <div className="home-bg">
        <div className="home-bg-grid" />
        <div className="home-glow home-glow-1" />
        <div className="home-glow home-glow-2" />
      </div>

      {/* Navbar */}
      <header className="home-nav">
        <div className="home-nav-inner">
          <div className="home-nav-logo">
            <div className="home-logo-icon"><Brain size={18} /></div>
            <span>LearNova</span>
          </div>
          <div className="home-nav-actions">
            <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-badge">
            <Zap size={13} />
            <span>AI-Powered Learning Platform</span>
          </div>

          <h1 className="home-hero-title">
            Master AI & Machine
            <br />
            <span className="gradient-text">Learning Interactively</span>
          </h1>

          <p className="home-hero-desc">
            LearNova transforms complex AIML concepts into an engaging, hands-on experience.
            Learn, practice, and compete — all in one unified platform.
          </p>

          <div className="home-hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Learning Free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>

          {/* Stats row */}
          <div className="home-stats">
            {STATS.map(s => (
              <div key={s.label} className="home-stat">
                <div className="home-stat-value">{s.value}</div>
                <div className="home-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <div className="home-section-inner">
          <div className="home-section-tag">Platform Features</div>
          <h2 className="home-section-title">Everything you need to learn AI/ML</h2>
          <p className="home-section-desc">
            A complete learning ecosystem built for both beginners and advanced learners.
          </p>

          <div className="home-features-grid">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="home-feature-card" style={{ "--feat-color": f.color }}>
                  <div className="home-feat-icon">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="home-feat-title">{f.title}</h3>
                  <p className="home-feat-desc">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="home-cta-inner">
          <div className="home-cta-icon"><Brain size={28} /></div>
          <h2 className="home-cta-title">Ready to start your AI journey?</h2>
          <p className="home-cta-desc">Join LearNova and start mastering Artificial Intelligence and Machine Learning today.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-nav-logo" style={{ justifyContent: "center" }}>
          <div className="home-logo-icon" style={{ width: 24, height: 24 }}><Brain size={14} /></div>
          <span>LearNova</span>
        </div>
        <p className="home-footer-copy">© 2025 LearNova. Built for VIBETHON.</p>
      </footer>
    </div>
  );
}
