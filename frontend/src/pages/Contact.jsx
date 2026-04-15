import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
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

export default function Contact() {

  return (
    <>

      <div className="home-hero" style={{ minHeight: '60vh', padding: '120px 20px 60px' }}>
        <FadeIn>
          <div className="home-section-tag" style={{ margin: '0 auto 20px' }}>
            <MessageSquare size={13} />
            Support Center
          </div>
          <h1 className="home-hero-title">We're here to<br /><span className="logo-accent">Help You</span></h1>
          <p className="home-hero-desc" style={{ maxWidth: '700px', margin: '24px auto' }}>
            Have questions about our curriculum or technical issues? Our team is available 24/7 to ensure your learning never stops.
          </p>
        </FadeIn>
      </div>

      <section style={{ padding: '0 20px 100px', position: 'relative', zIndex: 10 }}>
        <div className="home-section-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>

          {/* Contact Form */}
          <FadeIn delay={0.1}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '48px', borderRadius: '32px', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Send us a message</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Fill out the form below and we'll get back to you within 24 hours.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                  <input type="text" placeholder="John Doe" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                  <input type="email" placeholder="john@example.com" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>Message</label>
                  <textarea rows="4" placeholder="How can we help?" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '12px', color: '#fff', outline: 'none', resize: 'none' }}></textarea>
                </div>
                <button className="btn-ln-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                  Send Message <Send size={15} style={{ marginLeft: '8px' }} />
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <FadeIn delay={0.2}>
              <div className="ln-card" style={{ padding: '32px' }}>
                <div className="ln-card-icon" style={{ background: 'rgba(255,255,255,0.05)' }}><Mail size={20} /></div>
                <div className="ln-card-text">
                  <h3>Email Support</h3>
                  <p>General: info@learnova.edu<br />Support: support@learnova.edu</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="ln-card" style={{ padding: '32px' }}>
                <div className="ln-card-icon" style={{ background: 'rgba(255,255,255,0.05)' }}><Twitter size={20} /></div>
                <div className="ln-card-text">
                  <h3>Social Channels</h3>
                  <p>Follow us on Twitter @LearNovaAI for the latest updates and AI news.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

