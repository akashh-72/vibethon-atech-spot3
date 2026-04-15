import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import "./Leaderboard.css";

const BADGES = [
  { id: "first-login",  icon: "🌟" },
  { id: "beginner",     icon: "📗" },
  { id: "intermediate", icon: "📘" },
  { id: "quiz-master",  icon: "🧠" },
  { id: "streak-3",     icon: "🔥" },
  { id: "advanced",     icon: "🏅" },
];

export default function Leaderboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("xp");

  useEffect(() => {
    const fetch = async () => {
      const snap = await get(ref(db, "users"));
      if (snap.exists()) {
        const data = Object.entries(snap.val()).map(([uid, u]) => ({ uid, ...u }));
        setUsers(data);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const sorted = [...users].sort((a, b) => {
    if (sortBy === "xp")      return (b.xp || 0) - (a.xp || 0);
    if (sortBy === "level")   return (b.level || 1) - (a.level || 1);
    if (sortBy === "modules") return (b.completedModules?.length || 0) - (a.completedModules?.length || 0);
    return 0;
  });

  const myRank = sorted.findIndex(u => u.uid === user?.uid) + 1;

  if (loading) return <div className="loading-screen"><div className="spinner"/></div>;

  return (
    <div className="leaderboard-page animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">🏆 Leaderboard</h1>
        <p className="page-subtitle">Compete, earn XP, and rise through the ranks</p>
      </div>

      {/* My rank card */}
      {myRank > 0 && (
        <div className="my-rank-card glass-card">
          <div className="my-rank-inner">
            <div className="my-rank-label">Your Rank</div>
            <div className="my-rank-num gradient-text">#{myRank}</div>
          </div>
          <div className="my-rank-inner">
            <div className="my-rank-label">Your XP</div>
            <div className="my-rank-num" style={{ color: "var(--accent-amber)" }}>
              ⚡ {sorted.find(u => u.uid === user?.uid)?.xp || 0}
            </div>
          </div>
          <div className="my-rank-inner">
            <div className="my-rank-label">Modules</div>
            <div className="my-rank-num" style={{ color: "var(--accent-green)" }}>
              📚 {sorted.find(u => u.uid === user?.uid)?.completedModules?.length || 0}
            </div>
          </div>
        </div>
      )}

      {/* Sort tabs */}
      <div className="lb-sort">
        <span className="lb-sort-label">Sort by:</span>
        {[
          { key: "xp", label: "⚡ XP" },
          { key: "level", label: "🎯 Level" },
          { key: "modules", label: "📚 Modules" },
        ].map(s => (
          <button key={s.key} className={`filter-btn ${sortBy === s.key ? "active" : ""}`} onClick={() => setSortBy(s.key)}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Podium: Top 3 */}
      {sorted.length >= 3 && (
        <div className="podium">
          {[sorted[1], sorted[0], sorted[2]].map((u, i) => {
            const ranks = [2, 1, 3];
            const rank = ranks[i];
            const medals = ["🥈", "🥇", "🥉"];
            const heights = [160, 200, 140];
            return (
              <div key={u.uid} className={`podium-slot rank-${rank}`} style={{ height: heights[i] }}>
                <div className="podium-medal">{medals[i]}</div>
                <div className="podium-avatar">{u.displayName?.[0]?.toUpperCase() || "?"}</div>
                <div className="podium-name">{u.displayName?.split(" ")[0] || "User"}</div>
                <div className="podium-xp">⚡ {u.xp || 0}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="lb-table glass-card">
        <div className="lb-table-header">
          <div className="lb-col rank">Rank</div>
          <div className="lb-col user">Learner</div>
          <div className="lb-col xp">XP</div>
          <div className="lb-col level">Level</div>
          <div className="lb-col modules">Modules</div>
          <div className="lb-col badges">Badges</div>
        </div>
        {sorted.map((u, i) => {
          const isMe = u.uid === user?.uid;
          const earnedBadges = BADGES.filter(b => (u.badges || []).includes(b.id));
          return (
            <div key={u.uid} className={`lb-table-row ${isMe ? "lb-me-row" : ""}`}>
              <div className="lb-col rank">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span className="rank-num">#{i + 1}</span>}
              </div>
              <div className="lb-col user">
                <div className="lb-user-avatar">{u.displayName?.[0]?.toUpperCase() || "?"}</div>
                <div>
                  <div className="lb-user-name">{u.displayName || "Anonymous"} {isMe && <span className="you-tag">You</span>}</div>
                  <div className="lb-user-streak">🔥 {u.streak || 0} day streak</div>
                </div>
              </div>
              <div className="lb-col xp" style={{ color: "var(--accent-amber)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                ⚡ {u.xp || 0}
              </div>
              <div className="lb-col level">
                <span className="level-pill">Lv.{u.level || 1}</span>
              </div>
              <div className="lb-col modules" style={{ color: "var(--accent-green)", fontWeight: 600 }}>
                {u.completedModules?.length || 0}
              </div>
              <div className="lb-col badges">
                {earnedBadges.map(b => (
                  <span key={b.id} title={b.id} className="lb-badge-icon">{b.icon}</span>
                ))}
                {earnedBadges.length === 0 && <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>—</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
