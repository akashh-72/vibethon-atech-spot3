import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { Trophy, Zap, BookOpen, Star, Flame, Award, Target, ArrowUp } from "lucide-react";
import "./Leaderboard.css";

const BADGE_META = [
  { id: "first-login",  icon: Star,    label: "First Login",   color: "#f59e0b" },
  { id: "beginner",     icon: BookOpen, label: "Beginner",     color: "#10b981" },
  { id: "intermediate", icon: Target,   label: "Intermediate", color: "#3b82f6" },
  { id: "quiz-master",  icon: Trophy,   label: "Quiz Master",  color: "#8b5cf6" },
  { id: "streak-3",     icon: Flame,    label: "3-Day Streak", color: "#f43f5e" },
  { id: "advanced",     icon: Award,    label: "Advanced",     color: "#6366f1" },
];

export default function Leaderboard() {
  const { user } = useAuth();
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("xp");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await get(ref(db, "users"));
        if (snap.exists()) {
          setUsers(Object.entries(snap.val()).map(([uid, u]) => ({ uid, ...u })));
        }
      } catch (e) {}
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const sorted = [...users].sort((a, b) => {
    if (sortBy === "xp")      return (b.xp || 0) - (a.xp || 0);
    if (sortBy === "level")   return (b.level || 1) - (a.level || 1);
    if (sortBy === "modules") return ((b.completedModules || []).length) - ((a.completedModules || []).length);
    return 0;
  });

  const myRank = sorted.findIndex(u => u.uid === user?.uid) + 1;
  const me     = sorted.find(u => u.uid === user?.uid);

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Leaderboard</h1>
            <p className="page-subtitle">Compete with fellow learners and track your global ranking</p>
          </div>
          <div className="filter-tabs">
            {[
              { key: "xp",      label: "By XP"      },
              { key: "level",   label: "By Level"   },
              { key: "modules", label: "By Modules" },
            ].map(s => (
              <button key={s.key} className={`filter-tab ${sortBy === s.key ? "active" : ""}`} onClick={() => setSortBy(s.key)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* My rank banner */}
      {me && myRank > 0 && (
        <div className="lb-my-rank card">
          <div className="lb-my-rank-left">
            <div className="lb-my-avatar">{(me.displayName || "?")[0].toUpperCase()}</div>
            <div>
              <div className="lb-my-name">{me.displayName || "You"}</div>
              <div className="lb-my-sub">Your current position</div>
            </div>
          </div>
          <div className="lb-my-stats">
            <div className="lb-my-stat">
              <div className="lb-my-stat-val">#{myRank}</div>
              <div className="lb-my-stat-label">Rank</div>
            </div>
            <div className="lb-my-stat">
              <div className="lb-my-stat-val" style={{ color: "var(--accent-amber)" }}>{me.xp || 0}</div>
              <div className="lb-my-stat-label">XP</div>
            </div>
            <div className="lb-my-stat">
              <div className="lb-my-stat-val" style={{ color: "var(--accent-secondary)" }}>Lv.{me.level || 1}</div>
              <div className="lb-my-stat-label">Level</div>
            </div>
            <div className="lb-my-stat">
              <div className="lb-my-stat-val" style={{ color: "var(--accent-emerald)" }}>{(me.completedModules || []).length}</div>
              <div className="lb-my-stat-label">Modules</div>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Podium */}
      {sorted.length >= 3 && (
        <div className="lb-podium">
          {[sorted[1], sorted[0], sorted[2]].map((u, i) => {
            const rankNum = [2, 1, 3][i];
            const colors  = ["#94a3b8", "#f59e0b", "#b45309"];
            const bgs     = ["rgba(148,163,184,0.08)", "rgba(245,158,11,0.08)", "rgba(180,83,9,0.08)"];
            const borders = ["rgba(148,163,184,0.2)",  "rgba(245,158,11,0.3)",  "rgba(180,83,9,0.2)"];
            return (
              <div key={u.uid} className={`podium-slot rank-${rankNum}`}
                style={{ background: bgs[i], borderColor: borders[i], '--h': [180, 220, 160][i] + 'px' }}>
                <div className="podium-rank-num" style={{ color: colors[i] }}>#{rankNum}</div>
                <div className="podium-avatar" style={{ borderColor: colors[i] + "60" }}>
                  {(u.displayName || "?")[0].toUpperCase()}
                </div>
                <div className="podium-name">{(u.displayName || "User").split(" ")[0]}</div>
                <div className="podium-xp" style={{ color: colors[i] }}>
                  <Zap size={11} /> {u.xp || 0} XP
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
          <div className="spinner" />
        </div>
      ) : (
        <div className="lb-table card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="lb-table-head">
            <div className="lb-col lc-rank">Rank</div>
            <div className="lb-col lc-user">Learner</div>
            <div className="lb-col lc-xp">XP</div>
            <div className="lb-col lc-level">Level</div>
            <div className="lb-col lc-mods">Modules</div>
            <div className="lb-col lc-badges">Badges</div>
          </div>
          {sorted.map((u, i) => {
            const isMe = u.uid === user?.uid;
            const earnedBadges = BADGE_META.filter(b => (u.badges || []).includes(b.id));
            const medals = ["#f59e0b", "#94a3b8", "#b45309"];
            return (
              <div key={u.uid} className={`lb-table-row ${isMe ? "lb-me" : ""}`}>
                <div className="lb-col lc-rank">
                  {i < 3
                    ? <Trophy size={16} color={medals[i]} />
                    : <span className="lb-rank-num">#{i + 1}</span>
                  }
                </div>
                <div className="lb-col lc-user">
                  <div className="lb-avatar">{(u.displayName || "?")[0].toUpperCase()}</div>
                  <div className="lb-user-info">
                    <span className="lb-user-name">
                      {u.displayName || "Anonymous"}
                      {isMe && <span className="lb-you-tag">You</span>}
                    </span>
                    <span className="lb-streak"><Flame size={11} /> {u.streak || 0} day streak</span>
                  </div>
                </div>
                <div className="lb-col lc-xp">
                  <span className="lb-xp-val"><Zap size={12} /> {u.xp || 0}</span>
                </div>
                <div className="lb-col lc-level">
                  <span className="lb-level-pill">Lv.{u.level || 1}</span>
                </div>
                <div className="lb-col lc-mods" style={{ color: "var(--accent-emerald)", fontWeight: 600, fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
                  {(u.completedModules || []).length}
                </div>
                <div className="lb-col lc-badges">
                  {earnedBadges.slice(0, 4).map(b => {
                    const Icon = b.icon;
                    return <Icon key={b.id} size={14} color={b.color} strokeWidth={2} title={b.label} />;
                  })}
                  {earnedBadges.length === 0 && <span style={{ color: "var(--text-disabled)", fontSize: "0.75rem" }}>—</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
