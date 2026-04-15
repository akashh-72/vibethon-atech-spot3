import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { modules } from "../data/modules";
import { useAuth } from "../context/AuthContext";
import { ref, update } from "firebase/database";
import { db } from "../services/firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, CheckCircle, BookOpen,
  Code2, Zap, ArrowRight, Play, ExternalLink
} from "lucide-react";
import "./ModuleDetail.css";

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, userProfile, refreshProfile } = useAuth();
  const [lessonIdx, setLessonIdx] = useState(0);
  const [saving, setSaving] = useState(false);

  const module = modules.find(m => m.id === moduleId);

  useEffect(() => {
    if (!module) navigate("/modules");
    setLessonIdx(0);
  }, [moduleId]);

  if (!module) return null;

  const lesson = module.lessons[lessonIdx];
  const completedLessons = userProfile?.completedLessons?.[moduleId] || [];
  const isLessonDone = completedLessons.includes(lesson.id);

  const progressPercent = Math.round((completedLessons.length / module.lessons.length) * 100);
  const isModuleDone = progressPercent === 100;

  const handleLessonComplete = async () => {
    if (!user || isLessonDone) return;
    setSaving(true);
    try {
      const newCompleted = [...completedLessons, lesson.id];
      const updates = {
        [`users/${user.uid}/completedLessons/${moduleId}`]: newCompleted,
      };

      // If all lessons done, mark module as completed and add initial XP
      if (newCompleted.length === module.lessons.length) {
        const prevMods = userProfile?.completedModules || [];
        if (!prevMods.includes(moduleId)) {
          updates[`users/${user.uid}/completedModules`] = [...prevMods, moduleId];
          updates[`users/${user.uid}/xp`] = (userProfile?.xp || 0) + module.xp;
        }
      }

      await update(ref(db), updates);
      if (refreshProfile) await refreshProfile();
    } catch (e) {
      console.error("Save error:", e);
    }
    setSaving(false);
  };

  return (
    <div className="md-page page-wrapper animate-fade-in">
      <div className="md-topnav">
        <div className="md-topnav-left">
          <Link to="/modules" className="btn btn-ghost btn-sm">
            <ChevronLeft size={15} /> Back
          </Link>
          <div className="md-breadcrumb">
            <span className="md-breadcrumb-module">{module.title}</span>
            <ChevronRight size={14} className="md-breadcrumb-sep" />
            <span className="md-breadcrumb-lesson">{lesson.title}</span>
          </div>
        </div>

        <div className="md-module-progress-header">
          <div className="md-progress-text">
            <span>{completedLessons.length} / {module.lessons.length} Lessons</span>
            <strong>{progressPercent}% Complete</strong>
          </div>
          <div className="md-progress-bar-wrap">
            <motion.div
              className="md-progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <div className="md-layout">
        <aside className="md-sidebar card">
          <div className="md-sidebar-header">
            <div className="md-sidebar-icon">
              <BookOpen size={16} strokeWidth={2} />
            </div>
            <div>
              <div className="md-sidebar-module">{module.title}</div>
              <div className="md-sidebar-meta">
                {module.level} · {module.xp} XP
              </div>
            </div>
          </div>

          <div className="md-sidebar-lessons">
            {module.lessons.map((l, i) => {
              const isDone = completedLessons.includes(l.id);
              return (
                <button
                  key={l.id}
                  className={`md-lesson-btn ${i === lessonIdx ? "active" : ""} ${isDone ? "done" : ""}`}
                  onClick={() => setLessonIdx(i)}
                >
                  <div className="md-lesson-num">
                    {isDone ? <CheckCircle size={14} /> : <span>{i + 1}</span>}
                  </div>
                  <span className="md-lesson-title">{l.title}</span>
                </button>
              );
            })}
          </div>

          <div className="md-sidebar-footer">
            {isModuleDone ? (
              <div className="md-status-pill completed">
                <CheckCircle size={14} /> Module Finished
              </div>
            ) : (
              <button
                className="btn btn-primary w-full"
                onClick={() => navigate(`/quiz/${moduleId}`)}
                disabled={completedLessons.length < module.lessons.length}
              >
                Start Final Quiz <ArrowRight size={14} />
              </button>
            )}
          </div>
        </aside>

        <main className="md-main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md-lesson-card card"
            >
              <div className="md-lesson-header">
                <div className="md-lesson-meta">Lesson {lessonIdx + 1} of {module.lessons.length}</div>
                <h1 className="md-lesson-title-main">{lesson.title}</h1>
              </div>

              <div className="md-lesson-body">
                <div className="md-prose">
                  {lesson.content.split("\n").map((line, i) => {
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return <h4 key={i} className="md-prose-h4">{line.replace(/\*\*/g, "")}</h4>;
                    }
                    if (line.startsWith("- **")) {
                      const parts = line.split("** –");
                      const bold = parts[0].replace("- **", "");
                      const rest = parts[1];
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

                {lesson.example && (
                  <div className="md-example-section">
                    <div className="md-section-label">
                      <Code2 size={13} /> Code Implementation
                    </div>
                    <div className="code-block">
                      <pre>{lesson.example}</pre>
                    </div>
                  </div>
                )}
              </div>

              <div className="md-lesson-footer">
                <button
                  className="btn btn-ghost"
                  disabled={lessonIdx === 0}
                  onClick={() => setLessonIdx(i => i - 1)}
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                <div className="md-footer-actions">
                  {!isLessonDone ? (
                    <button className="btn btn-primary" onClick={handleLessonComplete} disabled={saving}>
                      {saving ? "Saving..." : <><Zap size={15} /> Mark as Complete</>}
                    </button>
                  ) : (
                    <div className="md-lesson-done-indicator">
                      <CheckCircle size={16} /> Lesson Completed
                    </div>
                  )}
                  {lessonIdx < module.lessons.length - 1 ? (
                    <button className="btn btn-secondary" onClick={() => setLessonIdx(i => i + 1)}>
                      Next <ChevronRight size={16} />
                    </button>
                  ) : isModuleDone ? (
                    <button className="btn btn-emerald" onClick={() => navigate("/modules")}>
                      Return to Dashboard <ArrowRight size={14} />
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Resources Section */}
          <section className="md-resources-section animate-fade-in delay-2">
            <div className="md-section-header">
              <Play size={20} color="#ff0000" />
              <h2 className="md-section-title">Curated Learning Resources</h2>
            </div>
            <div className="md-resources-grid">
              {module.resources?.map((res, i) => (
                <div key={i} className="md-resource-card card card-interactive">
                  <div className="md-res-thumb">
                    <img src={res.thumbnail} alt={res.title} />
                    <div className="md-res-play-overlay">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                  <div className="md-res-body">
                    <h4 className="md-res-title">{res.title}</h4>
                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="md-res-link">
                      Watch on YouTube <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
