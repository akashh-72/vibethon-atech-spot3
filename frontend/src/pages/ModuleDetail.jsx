import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { modules } from "../data/modules";
import { useAuth } from "../context/AuthContext";
import { ref, update } from "firebase/database";
import { db } from "../services/firebase";
import "./ModuleDetail.css";

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState(false);

  const module = modules.find((m) => m.id === moduleId);

  useEffect(() => {
    if (!module) navigate("/modules");
    if (profile?.completedModules?.includes(moduleId)) setCompleted(true);
  }, [moduleId, profile]);

  const handleComplete = async () => {
    if (!user || completed) return;
    const prev = profile?.completedModules || [];
    const newCompleted = [...new Set([...prev, moduleId])];
    const newXp = (profile?.xp || 0) + module.xp;
    const newLevel = Math.floor(newXp / 200) + 1;
    const newBadges = [...(profile?.badges || [])];
    if (newXp >= 100 && !newBadges.includes("beginner")) newBadges.push("beginner");
    if (newXp >= 300 && !newBadges.includes("intermediate")) newBadges.push("intermediate");
    if (newXp >= 600 && !newBadges.includes("advanced")) newBadges.push("advanced");

    await update(ref(db, `users/${user.uid}`), {
      completedModules: newCompleted,
      xp: newXp,
      level: newLevel,
      badges: newBadges,
    });
    await refreshProfile();
    setCompleted(true);
  };

  if (!module) return null;
  const lesson = module.lessons[activeLesson];

  return (
    <div className="module-detail animate-fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/modules" className="breadcrumb-link">📚 Modules</Link>
        <span className="breadcrumb-sep">›</span>
        <span>{module.title}</span>
      </div>

      <div className="module-detail-layout">
        {/* Sidebar - Lessons */}
        <aside className="lessons-sidebar glass-card">
          <div className="lessons-header">
            <div className="lessons-module-icon">{module.icon}</div>
            <div>
              <div className="lessons-module-title">{module.title}</div>
              <div className="lessons-module-meta">{module.lessons.length} lessons · {module.xp} XP</div>
            </div>
          </div>
          <ul className="lessons-list">
            {module.lessons.map((l, i) => (
              <li key={l.id}>
                <button
                  className={`lesson-btn ${activeLesson === i ? "active" : ""}`}
                  onClick={() => setActiveLesson(i)}
                >
                  <span className="lesson-num">{i + 1}</span>
                  <span>{l.title}</span>
                </button>
              </li>
            ))}
          </ul>
          {completed ? (
            <div className="completed-badge-full">✅ Module Completed! +{module.xp} XP</div>
          ) : (
            activeLesson === module.lessons.length - 1 && (
              <button className="btn btn-primary complete-btn" onClick={handleComplete}>
                🏁 Complete Module
              </button>
            )
          )}
        </aside>

        {/* Content */}
        <div className="lesson-content glass-card">
          <h2 className="lesson-title">{lesson.title}</h2>
          <div className="lesson-body">
            <div className="lesson-text">
              {lesson.content.split("\n\n").map((para, i) => {
                if (para.startsWith("**") || para.includes("**")) {
                  return (
                    <p key={i} className="para"
                      dangerouslySetInnerHTML={{
                        __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  );
                }
                return <p key={i} className="para">{para}</p>;
              })}
            </div>

            {lesson.example && (
              <div className="code-block-wrapper">
                <div className="code-block-header">
                  <span>💻 Code Example</span>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(lesson.example);
                    }}
                  >
                    Copy
                  </button>
                </div>
                <pre className="code-block"><code>{lesson.example}</code></pre>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="lesson-nav">
            <button
              className="btn btn-secondary"
              disabled={activeLesson === 0}
              onClick={() => setActiveLesson(activeLesson - 1)}
            >
              ← Previous
            </button>
            <div className="lesson-progress-dots">
              {module.lessons.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${activeLesson === i ? "active" : ""}`}
                  onClick={() => setActiveLesson(i)}
                />
              ))}
            </div>
            <button
              className="btn btn-primary"
              disabled={activeLesson === module.lessons.length - 1}
              onClick={() => setActiveLesson(activeLesson + 1)}
            >
              Next →
            </button>
          </div>

          {/* Quiz link */}
          <div className="quiz-prompt">
            <span>📝 Ready to test your knowledge?</span>
            <Link to={`/quiz/${module.id}`} className="btn btn-secondary btn-sm">Take Quiz</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
