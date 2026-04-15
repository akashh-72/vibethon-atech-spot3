import React from "react";
import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer-inner">
        <div className="footer-top">
          <div className="footer-logo">
            <span className="logo-accent">Lear</span>Nova
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>LEARNING</h4>
              <Link to="/modules">Core Modules</Link>
              <Link to="/playground">Code Playground</Link>
              <Link to="/simulations">Simulations</Link>
              <Link to="/leaderboard">Leaderboard</Link>
            </div>
            <div className="footer-col">
              <h4>RESOURCES</h4>
              <Link to="/docs">Documentation</Link>
              <Link to="/quiz">Adaptive Quizzes</Link>
              <Link to="/community">Community Space</Link>
              <Link to="/blog">Learning Blog</Link>
            </div>

            <div className="footer-col">
              <h4>COMPANY</h4>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact Support</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
          <p className="footer-copy">© 2026 <span>LearNova</span>. Professional AI & ML learning platform.</p>
        </div>
      </div>
    </footer>
  );
}
