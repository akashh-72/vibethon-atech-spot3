import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="home-nav">
      <div className="home-nav-inner">
        <Link to="/" className="home-nav-logo">
          <span className="logo-accent">Lear</span>Nova
        </Link>

        <nav className="home-nav-links" aria-label="Main navigation">
          <a href="/#features">Features</a>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/docs">Docs</Link>
        </nav>

        <div className="home-nav-actions">
          <Link to="/contact" className="nav-link-subtle">Talk to Us</Link>

          <Link to="/register" className="btn-ln-primary">
            <div className="btn-icon-circle black-circle">
              <ArrowRight size={14} />
            </div>
            Get Started
          </Link>
        </div>

        <button
          className="home-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="home-mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <a href="/#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/docs" onClick={() => setMobileMenuOpen(false)}>Docs</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

            <div className="home-mobile-actions">
              <Link to="/register" className="btn-ln-primary" style={{ width: "100%", justifyContent: "center" }}>
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
