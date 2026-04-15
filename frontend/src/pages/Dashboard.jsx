import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { modules } from "../data/modules";
import {
  Zap, Trophy, BookOpen, Target, TrendingUp,
  ChevronRight, Award, Flame, Star, ArrowUpRight, Clock
} from "lucide-react";
import "./Dashboard.css";

const BADGES = [
  { id: "first-login",  icon: Star,    label: "First Login",   color: "#f59e0b" },
  { id: "beginner",     icon: BookOpen, label: "Beginner",     color: "#10b981" },
  { id: "intermediate", icon: Target,   label: "Intermediate", color: "#3b82f6" },
  { id: "quiz-master",  icon: Trophy,   label: "Quiz Master",  color: "#8b5cf6" },
  { id: "streak-3",     icon: Flame,    label: "3-Day Streak", color: "#f43f5e" },
  { id: "advanced",     icon: Award,    label: "Advanced",     color: "#6366f1" },
];

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const snap = await get(ref(db, "users"));
        if (snap.exists()) {
          const data = Object.entries(snap.val())
            .map(([uid, u]) => ({ uid, ...u }))
            .sort((a, b) => (b.xp || 0) - (a.xp || 0))
            .slice(0, 5);
          setLeaderboard(data);
        }
      } catch (e) {}
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  const xp              = userProfile?.xp || 0;
  const level           = userProfile?.level || 1;
  const streak          = userProfile?.streak || 0;
  const completedMods   = userProfile?.completedModules || [];
  const quizScores      = userProfile?.quizScores || {};
  const earnedBadges    = userProfile?.badges || [];
  const xpInLevel       = xp % 200;
  const totalQuizzesTaken = Object.keys(quizScores).length;
  const myRank = leaderboard.findIndex(u => u.uid === user?.uid) + 1;

  const stats = [
    { label: "Total XP",         value: xp.toLocaleString(),       icon: Zap,      color: "#f59e0b", bg: "rgba(245,158,11,0.1)"   },
    { label: "Current Level",    value: `Level ${level}`,          icon: Trophy,   color: "#6366f1", bg: "rgba(99,102,241,0.1)"   },
    { label: "Modules Done",     value: `${completedMods.length} / ${modules.length}`, icon: BookOpen, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    { label: "Day Streak",       value: streak,                    icon: Flame,    color: "#f43f5e", bg: "rgba(244,63,94,0.1)"    },
  ];

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div className="db-hero">
        <div>
          <h1 className="page-title">
            Welcome back, <span className="gradient-text">{userProfile?.displayName?.split(" ")[0] || "Learner"}</span>
          </h1>
          <p className="page-subtitle">Here's your learning progress at a glance.</p>
        </div>
        <Link to="/modules" className="btn btn-primary btn-sm">
          Continue Learning <ChevronRight size={15} />
        </Link>
      </div>

      {/* XP Level bar */}
      <div className="db-level-bar card card-sm">
        <div className="db-level-row">
          <div className="db-level-info">
            <span className="db-level-badge">Level {level}</span>
            <span className="db-level-text">{xpInLevel} / 200 XP to Level {level + 1}</span>
          </div>
          {myRank > 0 && (
            <span className="db-rank-badge">
              <Trophy size={12} />
              Rank #{myRank}
            </span>
          )}
        </div>
        <div className="progress-bar progress-bar-lg" style={{ marginTop: 10 }}>
          <div className="progress-bar-fill" style={{ width: `${Math.min((xpInLevel / 200) * 100, 100)}%` }} />
        </div>
      </div>

      {/* Stats grid */}
      <div className="db-stats-grid">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`stat-card animate-fade-in delay-${i + 1}`}>
              <div className="stat-icon-wrap" style={{ background: s.bg }}>
                <Icon size={18} color={s.color} strokeWidth={2} />
              </div>
              <div className="stat-card-label">{s.label}</div>
              <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
            </div>
          );
        })}
      </div>

      <div className="db-grid-2">
        {/* Module progress */}
        <div className="card">
          <div className="db-section-header">
            <h3>Module Progress</h3>
            <Link to="/modules" className="db-view-all">View all <ArrowUpRight size={13} /></Link>
          </div>
          <div className="db-module-list">
            {modules.map(m => {
              const done = completedMods.includes(m.id);
              const score = quizScores[m.id];
              return (
                <Link key={m.id} to={`/modules/${m.id}`} className="db-module-row">
                  <div className="db-module-left">
                    <div className={`db-mod-dot ${done ? "done" : ""}`} />
                    <div>
                      <div className="db-module-title">{m.title}</div>
                      <div className="db-module-meta">
                        <span className={`badge ${m.level === "Beginner" ? "badge-emerald" : m.level === "Intermediate" ? "badge-amber" : "badge-rose"}`}>
                          {m.level}
                        </span>
                        {score !== undefined && (
                          <span className="db-score">{score}% quiz</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="db-module-right">
                    <span className={`db-status ${done ? "done" : "pending"}`}>
                      {done ? "Completed" : "Pending"}
                    </span>
                    <ChevronRight size={14} className="db-chevron" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Leaderboard + Badges */}
        <div className="db-right-col">
          {/* Leaderboard preview */}
          <div className="card">
            <div className="db-section-header">
              <h3>Top Learners</h3>
              <Link to="/leaderboard" className="db-view-all">Full board <ArrowUpRight size={13} /></Link>
            </div>
            <div className="db-lb-list">
              {loading ? (
                <div className="db-lb-loading"><div className="spinner" style={{ width: 20, height: 20 }} /></div>
              ) : leaderboard.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem", textAlign: "center", padding: "16px 0" }}>
                  No data yet. Be the first!
                </p>
              ) : (
                leaderboard.map((u, i) => {
                  const isMe = u.uid === user?.uid;
                  const medals = ["#f59e0b", "#94a3b8", "#b45309"];
                  return (
                    <div key={u.uid} className={`db-lb-row ${isMe ? "db-lb-me" : ""}`}>
                      <div className="db-lb-rank" style={{ color: i < 3 ? medals[i] : "var(--text-muted)" }}>
                        {i + 1}
                      </div>
                      <div className="db-lb-avatar">
                        {(u.displayName || "?")[0].toUpperCase()}
                      </div>
                      <div className="db-lb-name">
                        {u.displayName || "Anonymous"}
                        {isMe && <span className="db-you-tag">You</span>}
                      </div>
                      <div className="db-lb-xp">
                        <Zap size={11} /> {u.xp || 0}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="card">
            <div className="db-section-header">
              <h3>Badges</h3>
              <span className="db-badge-count">{earnedBadges.length}/{BADGES.length} earned</span>
            </div>
            <div className="db-badges-grid">
              {BADGES.map(b => {
                const Icon = b.icon;
                const earned = earnedBadges.includes(b.id);
                return (
                  <div key={b.id} className={`db-badge-item ${earned ? "earned" : "locked"}`} title={b.label}>
                    <Icon size={18} color={earned ? b.color : "var(--text-disabled)"} strokeWidth={2} />
                    <span className="db-badge-label">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
