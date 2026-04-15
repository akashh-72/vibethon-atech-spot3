import React from "react";
import PublicNavbar from "./PublicNavbar";
import PublicFooter from "./PublicFooter";

export default function PublicLayout({ children }) {
  return (
    <div className="home">
      {/* ── Animated Background ── */}
      <div className="home-bg" aria-hidden="true">
        <div className="home-bg-grid" />
        <div className="home-bg-orb home-bg-orb-1" />
        <div className="home-bg-orb home-bg-orb-2" />
        <div className="home-bg-orb home-bg-orb-3" />
      </div>

      {/* ── Announcement Bar ── */}
      <div className="home-announce">
        <span>🚀 New: Interactive Neural Network game is now live — try it free</span>
        <span className="home-announce-arrow">→</span>
      </div>

      <PublicNavbar />
      
      <main className="public-content">
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
