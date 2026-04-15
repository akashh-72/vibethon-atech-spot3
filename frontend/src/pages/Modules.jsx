import { useState } from "react";
import { Link } from "react-router-dom";
import { modules, getLevelColor } from "../data/modules";
import { useAuth } from "../context/AuthContext";
import "./Modules.css";

export default function Modules() {
  const { profile } = useAuth();
  const [filter, setFilter] = useState("All");
  const completedModules = profile?.completedModules || [];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const filtered = filter === "All" ? modules : modules.filter(m => m.level === filter);

  return (
    <div className="modules-page animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">📚 Learning Modules</h1>
        <p className="page-subtitle">Structured AIML content from Beginner to Advanced</p>
      </div>

      {/* Level Filter */}
      <div className="level-filters">
        {levels.map((l) => (
          <button
            key={l}
            className={`filter-btn ${filter === l ? "active" : ""}`}
            onClick={() => setFilter(l)}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Module Cards */}
      <div className="modules-grid">
        {filtered.map((m, i) => {
          const done = completedModules.includes(m.id);
          const color = getLevelColor(m.level);
          return (
            <Link
              to={`/modules/${m.id}`}
              key={m.id}
              className={`module-card glass-card animate-fade-in-up delay-${(i % 4) + 1}`}
            >
              <div className="module-card-header">
                <div className="module-card-icon">{m.icon}</div>
                <div className="module-level-badge" style={{ color, borderColor: `${color}44`, background: `${color}18` }}>
                  {m.level}
                </div>
                {done && <div className="module-done-badge">✅ Done</div>}
              </div>
              <h3 className="module-card-title">{m.title}</h3>
              <p className="module-card-desc">{m.description}</p>
              <div className="module-card-footer">
                <span className="module-lessons">📖 {m.lessons.length} Lessons</span>
                <span className="module-xp">⚡ {m.xp} XP</span>
              </div>
              <div className="module-card-arrow">Start Learning →</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
