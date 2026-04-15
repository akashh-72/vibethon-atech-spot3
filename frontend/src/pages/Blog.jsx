import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, User, Search, ArrowRight, Rss } from 'lucide-react';
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

const POSTS = [
  {
    title: "Understanding Transformer Networks",
    excerpt: "A deep dive into the architecture that powered the LLM revolution.",
    date: "April 12, 2026",
    author: "Dr. Sarah Chen",
    category: "Deep Learning",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Python for Data Science in 2026",
    excerpt: "The tools and libraries you need to master for effective data analysis.",
    date: "April 08, 2026",
    author: "James Wilson",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI Ethics: Building Responsible Systems",
    excerpt: "Why fairness and transparency are non-negotiable in modern AI.",
    date: "March 29, 2026",
    author: "Maya Patel",
    category: "Ethics",
    image: "https://images.unsplash.com/photo-1485827404703-89ca55917820?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Blog() {
  return (
    <>

      <div className="home-hero" style={{ minHeight: '60vh', padding: '120px 20px 60px' }}>
        <FadeIn>
          <div className="home-section-tag" style={{ margin: '0 auto 20px' }}>
            <Rss size={13} />
            Learning Blog
          </div>
          <h1 className="home-hero-title">Insights from the<br /><span className="logo-accent">Frontiers of AI</span></h1>
          <p className="home-hero-desc" style={{ maxWidth: '750px', margin: '24px auto' }}>
            Deep dives, tutorials, and industry news curated for the modern AI learner.
          </p>
        </FadeIn>
      </div>

      <section style={{ padding: '0 20px 100px', position: 'relative', zIndex: 10 }}>
        <div className="home-section-inner">
          
          {/* Featured Post */}
          <FadeIn delay={0.1}>
            <div className="ln-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', padding: '0', overflow: 'hidden', marginBottom: '60px', minHeight: '400px' }}>
              <div style={{ height: '100%', minHeight: '300px', background: `url(${POSTS[0].image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="ln-badge" style={{ alignSelf: 'flex-start', marginBottom: '20px', background: 'rgba(34,211,238,0.1)', color: 'var(--accent-cyan)' }}>Featured Post</span>
                <h2 style={{ fontSize: '32px', color: '#fff', marginBottom: '16px', lineHeight: '1.2' }}>{POSTS[0].title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '32px' }}>{POSTS[0].excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> {POSTS[0].author}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {POSTS[0].date}</span>
                </div>
                <button className="btn-ln-primary" style={{ alignSelf: 'flex-start' }}>Read Article <ArrowRight size={16} /></button>
              </div>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {POSTS.slice(1).map((post, i) => (
              <FadeIn key={post.title} delay={0.2 + (i * 0.1)}>
                <div className="ln-card" style={{ padding: '0', overflow: 'hidden', height: '100%' }}>
                  <div style={{ height: '200px', background: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ padding: '32px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '0.1em' }}>{post.category}</span>
                    <h3 style={{ fontSize: '22px', margin: '12px 0', color: '#fff' }}>{post.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '24px' }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{post.date}</span>
                      <button className="nav-link-subtle" style={{ color: 'var(--accent-cyan)' }}>Read More</button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

