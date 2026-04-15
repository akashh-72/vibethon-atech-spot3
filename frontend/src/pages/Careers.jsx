import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, Globe, Book, ArrowRight, Sparkles } from 'lucide-react';
import "./Home.css";

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const ROLES = [
  { title: "Senior AI Instructor", dept: "Education", location: "Remote" },
  { title: "Full Stack Engineer", dept: "Engineering", location: "Remote" },
  { title: "Product Designer", dept: "Design", location: "Bangalore / Remote" },
  { title: "Content Strategist", dept: "Marketing", location: "Remote" }
];

export default function Careers() {
  return (
    <>

      <div className="home-hero" style={{ minHeight: '60vh', padding: '120px 20px 60px' }}>
        <FadeIn>
          <div className="home-section-tag" style={{ margin: '0 auto 20px' }}>
            <Sparkles size={13} />
            Join the movement
          </div>
          <h1 className="home-hero-title">Help us build the future of<br /><span className="logo-accent">AI Literacy</span></h1>
          <p className="home-hero-desc" style={{ maxWidth: '700px', margin: '24px auto' }}>
            We're a team of dreamers, educators, and engineers building the world's most interactive AI learning platform.
          </p>
        </FadeIn>
      </div>

      <section className="home-process" style={{ background: 'transparent' }}>
        <div className="home-section-inner">
          <div className="home-section-header">
            <h2 className="home-section-title">Perks & Benefits</h2>
            <p className="home-section-desc">More than just a job, it's a place to grow.</p>
          </div>

          <div className="home-process-grid">
            <FadeIn delay={0.1}>
              <div className="ln-card">
                <div className="ln-card-icon"><Globe size={22} /></div>
                <div className="ln-card-text">
                  <h3>Remote First</h3>
                  <p>Work from anywhere in the world. We value results over time zones.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="ln-card">
                <div className="ln-card-icon"><Book size={22} /></div>
                <div className="ln-card-text">
                  <h3>Learning Stipend</h3>
                  <p>$1000 annual budget for books, courses, and conferences.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="ln-card">
                <div className="ln-card-icon"><Heart size={22} /></div>
                <div className="ln-card-text">
                  <h3>Health & Wellness</h3>
                  <p>Comprehensive health insurance and mental health support.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="home-why" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '80px 20px' }}>
        <div className="home-section-inner">
          <div className="home-section-header">
            <h2 className="home-section-title">Open Positions</h2>
            <p className="home-section-desc">Find your next challenge.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
            {ROLES.map((role, i) => (
              <FadeIn key={role.title} delay={i * 0.1}>
                <div className="ln-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px' }}>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '4px' }}>{role.title}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{role.dept} • {role.location}</p>
                  </div>
                  <button className="nav-link-subtle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Apply <ArrowRight size={14} />
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

