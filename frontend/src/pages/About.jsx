import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, Zap, Award, ArrowRight, Brain } from 'lucide-react';
import "./Home.css"; // Reuse home styles for consistency

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const values = [
    { icon: Target, title: "Practical First", desc: "We believe in learning by doing. Our simulations and playgrounds ensure you apply every concept you learn." },
    { icon: Users, title: "Community Driven", desc: "Learning AI is better together. We foster a community where seekers and experts collaborate." },
    { icon: Zap, title: "Modern Approach", desc: "Traditional education is slow. LearNova uses gamified, fast-paced modules to keep you engaged." },
    { icon: Award, title: "Excellence", desc: "We don't just teach tools; we build foundations. Our curriculum is vetted by industry professionals." }
  ];

  return (
    <>

      <div className="home-hero" style={{ minHeight: '60vh', padding: '120px 20px 60px' }}>
        <FadeIn>
          <div className="home-section-tag" style={{ margin: '0 auto 20px' }}>
            <Brain size={13} />
            Our Mission
          </div>
          <h1 className="home-hero-title">Revolutionizing<br /><span className="logo-accent">AI Education</span></h1>
          <p className="home-hero-desc" style={{ maxWidth: '700px', margin: '24px auto' }}>
            LearNova was founded on a simple idea: Artificial Intelligence should be accessible, interactive, and fun for everyone.
          </p>
        </FadeIn>
      </div>

      <section className="home-process" style={{ background: 'transparent' }}>
        <div className="home-section-inner">
          <div className="home-section-header">
            <h2 className="home-section-title">Why we exist</h2>
            <p className="home-section-desc">
              The gap between theory and practice in AI is growing. We are here to bridge it<br />
              with tools that let you build while you learn.
            </p>
          </div>

          <div className="home-process-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeIn key={v.title} delay={i * 0.1}>
                  <div className="ln-card" style={{ height: '100%', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                    <div className="ln-card-icon" style={{ marginBottom: '16px' }}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="ln-card-text">
                      <h3 style={{ justifyContent: 'center' }}>{v.title}</h3>
                      <p>{v.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-cta" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="home-cta-inner">
          <h2>Ready to start your journey?</h2>
          <p>Join thousands of learners who are mastering the future with LearNova.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
            <Link to="/register" className="btn-ln-primary">
              <div className="btn-icon-circle black-circle">
                <ArrowRight size={16} />
              </div>
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

