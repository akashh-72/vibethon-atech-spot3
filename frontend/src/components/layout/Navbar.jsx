import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/auth";
import {
  LayoutDashboard, BookOpen, Code2, Gamepad2,
  FlaskConical, Trophy, Zap, LogOut, Brain,
  ChevronRight, User
} from "lucide-react";
import "./Navbar.css";

const NAV_ITEMS = [
  { to: "/dashboard",    icon: LayoutDashboard, label: "Dashboard" },
  { to: "/modules",      icon: BookOpen,        label: "Learn" },
  { to: "/quiz",         icon: Zap,             label: "Quizzes" },
  { to: "/playground",   icon: Code2,           label: "Playground" },
  { to: "/games",        icon: Gamepad2,        label: "Games" },
  { to: "/simulations",  icon: FlaskConical,    label: "Simulations" },
  { to: "/leaderboard",  icon: Trophy,          label: "Leaderboard" },
];

export default function Navbar() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = (userProfile?.displayName || user?.email || "U")
    .split(" ")
    .map(w => w[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  const xp    = userProfile?.xp    || 0;
  const level = userProfile?.level || 1;
  const xpInLevel   = xp % 200;
  const xpToNextLevel = 200;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Brain size={18} strokeWidth={2} />
        </div>
        <span className="sidebar-logo-text">LearNova</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">Navigation</div>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
            }
          >
            <Icon size={16} strokeWidth={2} />
            <span>{label}</span>
            <ChevronRight size={14} className="sidebar-link-arrow" />
          </NavLink>
        ))}
      </nav>

      {/* XP progress */}
      <div className="sidebar-xp-card">
        <div className="sidebar-xp-row">
          <span className="sidebar-xp-label">Level {level}</span>
          <span className="sidebar-xp-pts">{xpInLevel} / {xpToNextLevel} XP</span>
        </div>
        <div className="sidebar-xp-bar">
          <div
            className="sidebar-xp-fill"
            style={{ width: `${Math.min((xpInLevel / xpToNextLevel) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* User footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{userProfile?.displayName || "User"}</div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout} title="Logout">
          <LogOut size={15} strokeWidth={2} />
        </button>
      </div>
    </aside>
  );
}
