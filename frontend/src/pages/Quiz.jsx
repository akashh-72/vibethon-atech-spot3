import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { quizData } from "../data/quizData";
import { modules } from "../data/modules";
import { useAuth } from "../context/AuthContext";
import { ref, update } from "firebase/database";
import { db } from "../services/firebase";
import {
  ChevronLeft, ChevronRight, CheckCircle, XCircle,
  Trophy, RotateCcw, BookOpen, Zap, Target
} from "lucide-react";
import "./Quiz.css";

export default function Quiz() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const [selectedModule, setSelectedModule] = useState(moduleId || null);
  const [qIdx, setQIdx]           = useState(0);
  const [selected, setSelected]   = useState(null);
  const [answered, setAnswered]   = useState(false);
  const [answers, setAnswers]     = useState([]);
  const [finished, setFinished]   = useState(false);
  const [saving, setSaving]       = useState(false);

  const quiz = selectedModule ? quizData[selectedModule] : null;

  const handleSelect = (m) => setSelectedModule(m);

  const handleAnswer = (opt) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    setAnswers(prev => [...prev, { q: qIdx, chosen: opt, correct: quiz[qIdx].answer }]);
  };

  const handleNext = () => {
    if (qIdx < quiz.length - 1) {
      setQIdx(q => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      saveScore();
    }
  };

  const saveScore = async () => {
    if (!user) return;
    const correct = answers.filter(a => a.chosen === a.correct).length + (selected === quiz[qIdx].answer ? 1 : 0);
    const total = quiz.length;
    const score = Math.round((correct / total) * 100);
    const xpGain = Math.round(score * 0.5);
    setSaving(true);
    try {
      const prevScores = userProfile?.quizScores || {};
      const prevXP = userProfile?.xp || 0;
      const newXP = prevXP + xpGain;
      await update(ref(db, `users/${user.uid}`), {
        [`quizScores/${selectedModule}`]: score,
        xp: newXP,
        level: Math.floor(newXP / 200) + 1,
      });
    } catch (e) {}
    setSaving(false);
  };

  const correct = answers.filter(a => a.chosen === a.correct).length;
  const scorePercent = quiz ? Math.round((correct / quiz.length) * 100) : 0;

  // Module selector
  if (!selectedModule) {
    return (
      <div className="page-wrapper animate-fade-in">
        <div className="page-header">
          <h1 className="page-title">Quizzes</h1>
          <p className="page-subtitle">Test your knowledge after completing each module</p>
        </div>
        <div className="quiz-select-grid">
          {modules.map(m => {
            const prevScore = userProfile?.quizScores?.[m.id];
            return (
              <button key={m.id} className="quiz-pick-card" onClick={() => handleSelect(m.id)}>
                <div className="quiz-pick-icon">
                  <Target size={20} strokeWidth={1.75} />
                </div>
                <div className="quiz-pick-body">
                  <h3 className="quiz-pick-title">{m.title}</h3>
                  <p className="quiz-pick-meta">{m.level} · {quizData[m.id]?.length || 0} questions</p>
                </div>
                <div className="quiz-pick-right">
                  {prevScore !== undefined && (
                    <span className={`badge ${prevScore >= 80 ? "badge-emerald" : prevScore >= 50 ? "badge-amber" : "badge-rose"}`}>
                      {prevScore}%
                    </span>
                  )}
                  <ChevronRight size={16} className="quiz-pick-arrow" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Results
  if (finished) {
    const letter = scorePercent >= 80 ? "A" : scorePercent >= 60 ? "B" : scorePercent >= 40 ? "C" : "D";
    const modName = modules.find(m => m.id === selectedModule)?.title;
    return (
      <div className="page-wrapper animate-fade-in">
        <div className="quiz-result-card card card-lg">
          <div className="qr-header">
            <div className={`qr-score-ring ${scorePercent >= 60 ? "pass" : "fail"}`}>
              <svg viewBox="0 0 80 80" className="qr-ring-svg">
                <circle cx="40" cy="40" r="34" className="qr-ring-bg" />
                <circle cx="40" cy="40" r="34" className="qr-ring-fill"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - scorePercent / 100)}`}
                />
              </svg>
              <div className="qr-score-center">
                <span className="qr-score-pct">{scorePercent}%</span>
                <span className="qr-score-grade">{letter}</span>
              </div>
            </div>
            <div className="qr-meta">
              <h2 className="qr-title">{scorePercent >= 60 ? "Quiz Passed!" : "Keep Practicing"}</h2>
              <p className="qr-subtitle">{modName}</p>
            </div>
          </div>

          <div className="qr-stats">
            <div className="qr-stat">
              <CheckCircle size={18} color="var(--accent-emerald)" />
              <div>
                <div className="qr-stat-val">{correct}</div>
                <div className="qr-stat-label">Correct</div>
              </div>
            </div>
            <div className="qr-stat">
              <XCircle size={18} color="var(--accent-rose)" />
              <div>
                <div className="qr-stat-val">{quiz.length - correct}</div>
                <div className="qr-stat-label">Wrong</div>
              </div>
            </div>
            <div className="qr-stat">
              <Zap size={18} color="var(--accent-amber)" />
              <div>
                <div className="qr-stat-val">+{Math.round(scorePercent * 0.5)}</div>
                <div className="qr-stat-label">XP Earned</div>
              </div>
            </div>
          </div>

          <div className="qr-actions">
            <button className="btn btn-secondary" onClick={() => { setQIdx(0); setAnswers([]); setSelected(null); setAnswered(false); setFinished(false); }}>
              <RotateCcw size={15} /> Retry
            </button>
            <Link to={`/modules/${selectedModule}`} className="btn btn-ghost">
              <BookOpen size={15} /> Review Module
            </Link>
            <Link to="/leaderboard" className="btn btn-primary">
              <Trophy size={15} /> Leaderboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active quiz
  const question = quiz[qIdx];
  const isCorrect = selected === question.answer;

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="quiz-header">
        <div className="quiz-progress-info">
          <span className="quiz-q-count">Question {qIdx + 1} / {quiz.length}</span>
          <div className="quiz-progress-track">
            <div className="quiz-progress-fill" style={{ width: `${((qIdx + 1) / quiz.length) * 100}%` }} />
          </div>
        </div>
        <button className="btn-agora-secondary btn-sm" onClick={() => setSelectedModule(null)}>
          Exit Quiz
        </button>
      </div>

      <motion.div 
        key={qIdx}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="stat-card quiz-card"
        style={{ padding: '32px 40px' }}
      >
        <span className="quiz-q-label">Current Question</span>
        <h2 className="quiz-question">{question.question}</h2>

        <div className="quiz-options">
          {question.options.map((opt, i) => {
            const marker = ["A", "B", "C", "D"][i];
            return (
              <button
                key={i}
                className={`quiz-option ${answered ? (i === question.answer ? "correct" : selected === i ? "wrong" : "dimmed") : ""}`}
                onClick={() => handleAnswer(i)}
                disabled={answered}
              >
                <div className="quiz-opt-marker">{marker}</div>
                <span className="quiz-opt-text">{opt}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`quiz-explanation ${selected === question.answer ? "correct" : "wrong"}`}
          >
            <div className="quiz-exp-label">
              {selected === question.answer ? (
                <><CheckCircle size={15} /> Correct Answer</>
              ) : (
                <><XCircle size={15} /> Not quite right</>
              )}
            </div>
            <p>{question.explanation}</p>
          </motion.div>
        )}

        <div className="quiz-nav">
          {answered && (
            <button className="btn-agora-primary" onClick={handleNext}>
              {qIdx === quiz.length - 1 ? "View Results" : "Next Question"}
              <div className="btn-icon-circle black-circle">
                <ChevronRight size={14} />
              </div>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
