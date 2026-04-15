import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { modules } from "../data/modules";
import { useAuth } from "../context/AuthContext";
import { ref, update } from "firebase/database";
import { db } from "../services/firebase";
import {
  ChevronLeft, ChevronRight, CheckCircle, BookOpen,
  Code2, Zap, ArrowRight, List
} from "lucide-react";
import "./ModuleDetail.css";

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, userProfile, refreshProfile } = useAuth();
  const [lessonIdx, setLessonIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const module = modules.find(m => m.id === moduleId);

  useEffect(() => {
    if (!module) navigate("/modules");
    setLessonIdx(0);
    setCompleted(false);
  }, [moduleId]);

  useEffect(() => {
    if (userProfile?.completedModules?.includes(moduleId)) setCompleted(true);
  }, [userProfile, moduleId]);

  if (!module) return null;

  const lesson = module.lessons[lessonIdx];
  const isFirst = lessonIdx === 0;
  const isLast = lessonIdx === module.lessons.length - 1;

  const handleComplete = async () => {
    if (!user || completed) return;
    setSaving(true);
    try {
      const prev = userProfile?.completedModules || [];
      if (!prev.includes(moduleId)) {
        const newMods = [...prev, moduleId];
        const newXP = (userProfile?.xp || 0) + module.xp;
        const newLevel = Math.floor(newXP / 200) + 1;
        await update(ref(db, `users/${user.uid}`), {
          completedModules: newMods,
          xp: newXP,
          level: newLevel,
        });
        if (refreshProfile) await refreshProfile();
        setCompleted(true);
      }
    } catch (e) {}
    setSaving(false);
  };

  return (
    <div className="md-page page-wrapper animate-fade-in">
      {/* Top nav */}
      <div className="md-topnav">
        <Link to="/modules" className="btn btn-ghost btn-sm">
          <ChevronLeft size={15} /> Back to Modules
        </Link>
        <div className="md-breadcrumb">
          <span className="md-breadcrumb-module">{module.title}</span>
          <ChevronRight size={14} className="md-breadcrumb-sep" />
          <span className="md-breadcrumb-lesson">{lesson.title}</span>
        </div>
      </div>

      <div className="md-layout">
        {/* Sidebar */}
        <aside className="md-sidebar">
          <div className="md-sidebar-header">
            <div className="md-sidebar-icon">
              <BookOpen size={16} strokeWidth={2} />
            </div>
            <div>
              <div className="md-sidebar-module">{module.title}</div>
              <div className="md-sidebar-meta">
                {module.lessons.length} lessons · <span style={{ color: "var(--accent-amber)" }}>{module.xp} XP</span>
              </div>
            </div>
          </div>

          <div className="md-sidebar-lessons">
            {module.lessons.map((l, i) => (
              <button
                key={l.id}
                className={`md-lesson-btn ${i === lessonIdx ? "active" : ""} ${i < lessonIdx ? "done" : ""}`}
                onClick={() => setLessonIdx(i)}
              >
                <div className="md-lesson-num">
                  {i < lessonIdx ? <CheckCircle size={14} /> : <span>{i + 1}</span>}
                </div>
                <span className="md-lesson-title">{l.title}</span>
              </button>
            ))}
          </div>

          {completed ? (
            <div className="md-completed-badge">
              <CheckCircle size={16} />
              <span>Module Completed</span>
            </div>
          ) : (
            <button className="btn btn-primary md-take-quiz" onClick={() => navigate(`/quiz/${moduleId}`)}>
              Take Quiz <ArrowRight size={15} />
            </button>
          )}
        </aside>

        {/* Main content */}
        <main className="md-content">
          <div className="md-lesson-header">
            <span className="md-lesson-number">Lesson {lessonIdx + 1} of {module.lessons.length}</span>
            <h2 className="md-lesson-title-main">{lesson.title}</h2>
          </div>

          {/* Content */}
          <div className="md-lesson-body card">
            <div className="md-content-section">
              <div className="md-content-label">
                <BookOpen size={13} />
                <span>Lesson Content</span>
              </div>
              <div className="md-prose">
                {lesson.content.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return <h4 key={i} className="md-prose-h4">{line.replace(/\*\*/g, "")}</h4>;
                  }
                  if (line.startsWith("- **")) {
                    const [bold, rest] = line.slice(4).split("** –");
                    return (
                      <div key={i} className="md-prose-point">
                        <div className="md-bullet" />
                        <p><strong>{bold}</strong>{rest ? ` — ${rest}` : ""}</p>
                      </div>
                    );
                  }
                  if (line.match(/^\d+\./)) {
                    return <div key={i} className="md-prose-step"><span className="md-step-num">{line[0]}</span><p>{line.slice(3)}</p></div>;
                  }
                  if (line.trim() === "") return <div key={i} className="md-spacer" />;
                  return <p key={i} className="md-prose-p">{line}</p>;
                })}
              </div>
            </div>

            {/* Code example */}
            {lesson.example && (
              <div className="md-content-section">
                <div className="md-content-label">
                  <Code2 size={13} />
                  <span>Code Example</span>
                </div>
                <div className="code-block">
                  <pre>{lesson.example}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Nav buttons */}
          <div className="md-nav-btns">
            <button
              className="btn btn-secondary"
              disabled={isFirst}
              onClick={() => setLessonIdx(i => i - 1)}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {isLast ? (
              <button
                className="btn btn-primary"
                onClick={handleComplete}
                disabled={saving || completed}
              >
                {saving ? "Saving..." : completed ? <><CheckCircle size={16} /> Completed</> : <><Zap size={16} /> Complete & Earn {module.xp} XP</>}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setLessonIdx(i => i + 1)}>
                Next Lesson <ChevronRight size={16} />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
