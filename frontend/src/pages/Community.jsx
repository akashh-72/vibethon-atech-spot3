import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, MessageCircle, Heart, Share2, ArrowRight, MessageSquare } from 'lucide-react';
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

export default function Community() {
  return (
    <>

      <div className="home-hero" style={{ minHeight: '60vh', padding: '120px 20px 60px' }}>
        <FadeIn>
          <div className="home-section-tag" style={{ margin: '0 auto 20px' }}>
            <Users size={13} />
            Community Space
          </div>
          <h1 className="home-hero-title">Learn Together, <br /><span className="logo-accent">Grow Together</span></h1>
          <p className="home-hero-desc" style={{ maxWidth: '750px', margin: '24px auto' }}>
            Join a vibrant ecosystem of AI enthusiasts, developers, and lifelong learners. Share projects, solve challenges, and find your tribe.
          </p>
        </FadeIn>
      </div>

      <section className="home-stats" style={{ margin: '0 0 100px' }}>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="home-stat">
              <div className="home-stat-value">50k+</div>
              <div className="home-stat-label">Active Members</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-value">120+</div>
              <div className="home-stat-label">Local Chapters</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-value">2k+</div>
              <div className="home-stat-label">Projects Shared</div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="home-process" style={{ background: 'transparent' }}>
        <div className="home-section-inner">
          <div className="home-section-header">
            <h2 className="home-section-title">Where we hang out</h2>
            <p className="home-section-desc">Connect with the community across different platforms.</p>
          </div>

          <div className="home-process-grid">
            <FadeIn delay={0.1}>
              <div className="ln-card" style={{ padding: '40px' }}>
                <div className="ln-card-icon" style={{ background: '#5865F2' }}><MessageCircle size={24} /></div>
                <div className="ln-card-text">
                  <h3>Discord Server</h3>
                  <p>Our main hub for real-time discussions, project help, and weekly events.</p>
                  <button className="btn-ln-primary" style={{ marginTop: '20px', background: '#5865F2', color: '#fff', border: 'none' }}>Join Discord</button>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="ln-card" style={{ padding: '40px' }}>
                <div className="ln-card-icon" style={{ background: '#00ACEE' }}><Share2 size={24} /></div>
                <div className="ln-card-text">
                  <h3>Twitter Community</h3>
                  <p>Stay updated with AI news and participate in tech discussions.</p>
                  <button className="btn-ln-primary" style={{ marginTop: '20px', background: '#00ACEE', color: '#fff', border: 'none' }}>Follow @LearNova</button>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="ln-card" style={{ padding: '40px' }}>
                <div className="ln-card-icon" style={{ background: '#E02424' }}><Heart size={24} /></div>
                <div className="ln-card-text">
                  <h3>Collaborative Hub</h3>
                  <p>A place to contribute to open-source projects and find study partners.</p>
                  <button className="btn-ln-primary" style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>Volunteer</button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="home-why" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '100px 20px' }}>
        <div className="home-section-inner">
          <div className="home-section-header">
            <h2 className="home-section-title">Upcoming Community Events</h2>
            <p className="home-section-desc">Don't miss out on our upcoming workshops and meetups.</p>
          </div>

          <div style={{ display: 'grid', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { title: "Weekly AI Paper Review", date: "April 20, 7:00 PM UTC", type: "Workshop" },
              { title: "LearNova Hackathon 2026", date: "May 15-17", type: "Competition" },
              { title: "AMA with AI Engineers", date: "June 2, 5:00 PM UTC", type: "Q&A Session" }
            ].map((event, i) => (
              <FadeIn key={event.title} delay={i * 0.1}>
                <div className="ln-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px' }}>
                  <div>
                    <span className="ln-badge" style={{ marginBottom: '8px', background: 'rgba(34,211,238,0.1)', color: 'var(--accent-cyan)' }}>{event.type}</span>
                    <h4 style={{ color: '#fff', fontSize: '20px', margin: '4px 0' }}>{event.title}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{event.date}</p>
                  </div>
                  <button className="nav-link-subtle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    RSVP <ArrowRight size={14} />
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

