import { useState } from "react";
import { modules } from "../data/modules";
import { quizData } from "../data/quizData";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ref, update, get } from "firebase/database";
import { db } from "../services/firebase";
import "./Quiz.css";

export default function Quiz() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  // If no moduleId, show module selector
  if (!moduleId) return <QuizSelector />;

  const module = modules.find(m => m.id === moduleId);
  const questions = quizData[moduleId];

  if (!module || !questions) {
    return (
      <div className="quiz-page">
        <p style={{ color: "var(--text-secondary)" }}>No quiz found for this module.</p>
        <Link to="/quiz" className="btn btn-primary" style={{ marginTop: 16 }}>← Back to Quizzes</Link>
      </div>
    );
  }

  return <QuizRunner module={module} questions={questions} user={user} profile={profile} refreshProfile={refreshProfile} />;
}

function QuizSelector() {
  return (
    <div className="quiz-page animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">🧪 Quizzes & Assessments</h1>
        <p className="page-subtitle">Test your AIML knowledge with instant feedback</p>
      </div>
      <div className="quiz-selector-grid">
        {modules.map((m, i) => (
          <Link to={`/quiz/${m.id}`} key={m.id} className={`quiz-module-card glass-card animate-fade-in-up delay-${(i % 4) + 1}`}>
            <div className="qm-icon">{m.icon}</div>
            <div className="qm-info">
              <div className="qm-title">{m.title}</div>
              <div className="qm-meta">{quizData[m.id]?.length || 0} questions · {m.level}</div>
            </div>
            <div className="qm-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function QuizRunner({ module, questions, user, profile, refreshProfile }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const isCorrect = idx === q.answer;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, { questionId: q.id, correct: isCorrect, selected: idx }]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setFinished(true);
    if (!user) return;
    setSaving(true);
    try {
      const scorePercent = Math.round((score / questions.length) * 100);
      const xpGained = Math.round(scorePercent * 0.5);
      const prevScores = profile?.quizScores || {};
      const newScores = { ...prevScores, [module.id]: scorePercent };
      const newXp = (profile?.xp || 0) + xpGained;
      const newLevel = Math.floor(newXp / 200) + 1;
      const newBadges = [...(profile?.badges || [])];
      if (!newBadges.includes("quiz-master") && scorePercent === 100) newBadges.push("quiz-master");

      await update(ref(db, `users/${user.uid}`), {
        quizScores: newScores,
        xp: newXp,
        level: newLevel,
        badges: newBadges,
      });
      await refreshProfile();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 80 ? "🌟 Excellent!" : pct >= 60 ? "👍 Good Job!" : "📚 Keep Practicing!";
    return (
      <div className="quiz-page animate-fade-in">
        <div className="quiz-result-card glass-card">
          <div className="result-icon">{pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : "💪"}</div>
          <h2 className="result-title">{grade}</h2>
          <div className="result-score">
            <span className="score-big gradient-text">{pct}%</span>
            <span className="score-detail">{score} / {questions.length} correct</span>
          </div>
          <div className="result-xp">+{Math.round(pct * 0.5)} XP earned</div>
          <div className="answer-review">
            {questions.map((q, i) => (
              <div key={q.id} className={`answer-item ${answers[i]?.correct ? "correct" : "wrong"}`}>
                <div className="answer-status">{answers[i]?.correct ? "✅" : "❌"}</div>
                <div>
                  <div className="answer-q">{q.question}</div>
                  {!answers[i]?.correct && (
                    <div className="answer-explanation">💡 {q.explanation}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="result-actions">
            <button className="btn btn-secondary" onClick={() => navigate("/quiz")}>← All Quizzes</button>
            <button className="btn btn-primary" onClick={() => { setCurrent(0); setScore(0); setAnswers([]); setSelected(null); setAnswered(false); setFinished(false); }}>
              🔄 Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page animate-fade-in">
      <div className="quiz-breadcrumb">
        <Link to="/quiz" className="breadcrumb-link">🧪 Quizzes</Link>
        <span className="breadcrumb-sep">›</span>
        <span>{module.title}</span>
      </div>
      <div className="quiz-card glass-card">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-module-info">
            <span>{module.icon}</span>
            <span>{module.title}</span>
          </div>
          <div className="quiz-count">Question {current + 1} of {questions.length}</div>
        </div>

        {/* Progress */}
        <div className="progress-bar-container" style={{ marginBottom: 28 }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Question */}
        <h2 className="quiz-question">{q.question}</h2>

        {/* Options */}
        <div className="quiz-options">
          {q.options.map((opt, idx) => {
            let cls = "quiz-option";
            if (answered) {
              if (idx === q.answer) cls += " correct";
              else if (idx === selected) cls += " wrong";
            } else if (idx === selected) cls += " selected";
            return (
              <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className={`quiz-explanation ${selected === q.answer ? "exp-correct" : "exp-wrong"}`}>
            <span>{selected === q.answer ? "✅ Correct! " : "❌ Incorrect. "}</span>
            {q.explanation}
          </div>
        )}

        {/* Footer */}
        <div className="quiz-footer">
          <div className="quiz-score-live">Score: {score}/{current + (answered ? 1 : 0)}</div>
          {answered && (
            <button className="btn btn-primary" onClick={handleNext}>
              {current < questions.length - 1 ? "Next Question →" : "See Results 🏁"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
