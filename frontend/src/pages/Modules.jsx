import { Link } from "react-router-dom";
import { modules } from "../data/modules";
import { useAuth } from "../context/AuthContext";
import { BookOpen, CheckCircle, ChevronRight, Lock, Zap } from "lucide-react";
import "./Modules.css";

const LEVEL_BADGE = {
  Beginner:     "badge-emerald",
  Intermediate: "badge-amber",
  Advanced:     "badge-rose",
};

export default function Modules() {
  const { userProfile } = useAuth();
  const completedMods = userProfile?.completedModules || [];

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Learning Modules</h1>
            <p className="page-subtitle">Structured curriculum from fundamentals to advanced AI & ML concepts</p>
          </div>
          <div className="modules-progress-pill">
            <CheckCircle size={15} style={{ opacity: 0.8 }} />
            <span>{completedMods.length} / {modules.length} modules completed</span>
          </div>
        </div>
      </div>

      <div className="modules-grid">
        {modules.map((m, i) => {
          const done = completedMods.includes(m.id);
          return (
            <Link
              key={m.id}
              to={`/modules/${m.id}`}
              className={`mod-card animate-fade-in delay-${Math.min(i + 1, 5)}`}
            >
              <div className="mod-card-top">
                <div className={`mod-icon-wrap mod-icon-${m.level.toLowerCase()}`}>
                  <BookOpen size={20} strokeWidth={1.75} />
                </div>
                {done && (
                  <div className="mod-done-badge">
                    <CheckCircle size={14} />
                    <span>Completed</span>
                  </div>
                )}
              </div>

              <div className="mod-card-body">
                <div className="mod-level-row">
                  <span className={`badge ${LEVEL_BADGE[m.level]}`}>{m.level}</span>
                  <span className="mod-xp"><Zap size={12} /> {m.xp} XP</span>
                </div>
                <h3 className="mod-title">{m.title}</h3>
                <p className="mod-desc">{m.description}</p>
              </div>

              <div className="mod-card-footer">
                <span className="mod-lessons-count">
                  {m.lessons.length} {m.lessons.length === 1 ? "lesson" : "lessons"}
                </span>
                <div className="mod-arrow">
                  <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
