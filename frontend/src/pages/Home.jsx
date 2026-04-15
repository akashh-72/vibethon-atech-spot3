import { Link } from "react-router-dom";
import "./Home.css";

const features = [
  { icon: "📚", title: "Structured Modules", desc: "Beginner to Advanced AIML content with real examples and code snippets." },
  { icon: "🎮", title: "Mini-Games", desc: "Learn Decision Trees and Neural Networks through interactive visual games." },
  { icon: "💻", title: "Code Playground", desc: "Write and execute Python-style AIML code right in your browser." },
  { icon: "🧪", title: "Quizzes & Assessments", desc: "Test your knowledge with instant feedback and module-wise scoring." },
  { icon: "🔬", title: "Real Simulations", desc: "Run spam detection and classification demos on real datasets." },
  { icon: "🏆", title: "Leaderboard", desc: "Compete with peers, earn XP, badges, and climb the ranks." },
];

export default function Home() {
  return (
    <div className="home-page">
      {/* Background orbs */}
      <div className="home-bg">
        <div className="home-orb orb-1" />
        <div className="home-orb orb-2" />
        <div className="home-orb orb-3" />
      </div>

      {/* Header */}
      <header className="home-header">
        <Link to="/" className="home-brand">
          <span>🚀</span>
          <span className="gradient-text">LearNova</span>
        </Link>
        <div className="home-nav-links">
          <Link to="/login" className="btn btn-ghost">Sign In</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge badge badge-primary animate-fade-in-up">
          🎓 AI/ML Learning Platform · VIBETHON 2025
        </div>
        <h1 className="hero-title animate-fade-in-up delay-1">
          Learn <span className="gradient-text">Artificial Intelligence</span><br />
          the Smarter Way
        </h1>
        <p className="hero-subtitle animate-fade-in-up delay-2">
          Interactive modules, hands-on coding, mini-games & real-world simulations —<br />
          all in one unified platform designed for the next generation of AI practitioners.
        </p>
        <div className="hero-actions animate-fade-in-up delay-3">
          <Link to="/register" className="btn btn-primary btn-lg">
            🚀 Start Learning Free
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg">
            Sign In →
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats animate-fade-in-up delay-4">
          {[
            { value: "4+", label: "Learning Modules" },
            { value: "20+", label: "Quiz Questions" },
            { value: "3+", label: "Mini-Games" },
            { value: "∞", label: "Possibilities" },
          ].map((s) => (
            <div key={s.label} className="hero-stat">
              <div className="stat-value gradient-text">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Everything You Need to Master AI/ML</h2>
          <p className="section-subtitle">
            A complete learning ecosystem built for speed, depth, and engagement.
          </p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={f.title} className={`feature-card glass-card animate-fade-in-up delay-${(i % 4) + 1}`}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to dive in?</h2>
          <p>Join learners mastering AI and ML — one module at a time.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create Free Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>Built with 💜 for VIBETHON · <span className="gradient-text">LearNova</span></p>
      </footer>
    </div>
  );
}
