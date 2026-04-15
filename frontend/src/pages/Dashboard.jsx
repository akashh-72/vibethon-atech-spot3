import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, get, update } from "firebase/database";
import { db } from "../services/firebase";
import { modules } from "../data/modules";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const BADGES = [
  { id: "first-login",   icon: "🌟", label: "First Login",    xp: 0 },
  { id: "beginner",      icon: "📗", label: "Beginner",       xp: 100 },
  { id: "intermediate",  icon: "📘", label: "Intermediate",   xp: 300 },
  { id: "quiz-master",   icon: "🧠", label: "Quiz Master",    xp: 400 },
  { id: "streak-3",      icon: "🔥", label: "3-Day Streak",   xp: 0 },
  { id: "advanced",      icon: "🏅", label: "Advanced",       xp: 600 },
];

export default function Dashboard() {
  const { user, profile, refreshProfile } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const snap = await get(ref(db, "users"));
      if (snap.exists()) {
        const data = Object.entries(snap.val())
          .map(([uid, u]) => ({ uid, ...u }))
          .sort((a, b) => (b.xp || 0) - (a.xp || 0))
          .slice(0, 5);
        setLeaderboard(data);
      }
    };
    fetchLeaderboard();
    // Award first-login badge
    if (user && profile && !profile.badges?.includes("first-login")) {
      update(ref(db, `users/${user.uid}`), {
        badges: [...(profile.badges || []), "first-login"],
      }).then(refreshProfile);
    }
  }, [user]);

  if (!profile) return (
    <div className="loading-screen">
      <div className="spinner" />
      <p style={{ color: "var(--text-secondary)", marginTop: 12 }}>Loading dashboard...</p>
    </div>
  );

  const completedModules = profile.completedModules || [];
  const totalXP = profile.xp || 0;
  const level = profile.level || 1;
  const xpToNext = level * 200;
  const xpProgress = Math.min((totalXP % xpToNext) / xpToNext * 100, 100);
  const earnedBadges = BADGES.filter(b => (profile.badges || []).includes(b.id));

  return (
    <div className="dashboard animate-fade-in">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-left">
          <div className="welcome-avatar">{profile.displayName?.[0]?.toUpperCase() || "U"}</div>
          <div>
            <h1 className="welcome-title">Welcome back, <span className="gradient-text">{profile.displayName}</span>!</h1>
            <p className="welcome-sub">Keep pushing — every module brings you closer to mastery 🚀</p>
          </div>
        </div>
        <div className="level-badge">
          <div className="level-number gradient-text">Lv.{level}</div>
          <div className="level-label">Current Level</div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="xp-card glass-card">
        <div className="xp-header">
          <span>⚡ XP Progress — Level {level} → {level + 1}</span>
          <span className="xp-nums">{totalXP % xpToNext} / {xpToNext} XP</span>
        </div>
        <div className="progress-bar-container" style={{ height: 10 }}>
          <div className="progress-bar-fill" style={{ width: `${xpProgress}%` }} />
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        {[
          { icon: "📚", value: completedModules.length, label: "Modules Completed", color: "var(--accent-green)" },
          { icon: "⚡", value: totalXP, label: "Total XP Earned", color: "var(--accent-amber)" },
          { icon: "🏆", value: level, label: "Current Level", color: "var(--accent-primary)" },
          { icon: "🔥", value: profile.streak || 0, label: "Day Streak", color: "var(--accent-red)" },
        ].map((s) => (
          <div key={s.label} className="stat-card glass-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Modules Progress */}
        <div className="glass-card dash-card">
          <div className="dash-card-header">
            <h2>📚 Learning Modules</h2>
            <Link to="/modules" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="modules-list">
            {modules.map((m) => {
              const done = completedModules.includes(m.id);
              return (
                <Link to={`/modules/${m.id}`} key={m.id} className="module-row">
                  <div className="module-row-icon">{m.icon}</div>
                  <div className="module-row-info">
                    <div className="module-row-title">{m.title}</div>
                    <div className="module-row-level">{m.level} · {m.xp} XP</div>
                  </div>
                  <div className={`module-row-status ${done ? "done" : ""}`}>
                    {done ? "✅" : "→"}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="dash-right">
          {/* Badges */}
          <div className="glass-card dash-card">
            <div className="dash-card-header">
              <h2>🏅 Badges Earned</h2>
              <span className="badge badge-primary">{earnedBadges.length}/{BADGES.length}</span>
            </div>
            <div className="badges-grid">
              {BADGES.map((b) => {
                const earned = (profile.badges || []).includes(b.id);
                return (
                  <div key={b.id} className={`badge-item ${earned ? "earned" : "locked"}`} title={b.label}>
                    <div className="badge-emoji">{earned ? b.icon : "🔒"}</div>
                    <div className="badge-name">{b.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mini Leaderboard */}
          <div className="glass-card dash-card">
            <div className="dash-card-header">
              <h2>🏆 Top Learners</h2>
              <Link to="/leaderboard" className="btn btn-ghost btn-sm">See All</Link>
            </div>
            <div className="leaderboard-list">
              {leaderboard.map((u, i) => (
                <div key={u.uid} className={`lb-row ${u.uid === user?.uid ? "lb-me" : ""}`}>
                  <div className="lb-rank">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </div>
                  <div className="lb-avatar">{u.displayName?.[0]?.toUpperCase() || "?"}</div>
                  <div className="lb-name">{u.displayName || "Anonymous"}</div>
                  <div className="lb-xp">⚡ {u.xp || 0}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
