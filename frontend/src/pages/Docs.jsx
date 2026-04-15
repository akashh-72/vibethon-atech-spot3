import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, ChevronRight, Search, Zap, Code, Shield, HelpCircle, HardDrive } from 'lucide-react';
import "./Home.css";

const DOCS_NAV = [
  { group: "Getting Started", items: ["Introduction", "Quick Start Guide", "Architecture"] },
  { group: "Core Concepts", items: ["Linear Regression", "Neural Networks", "Decision Trees", "Backpropagation"] },
  { group: "Tools", items: ["Code Playground", "Training Models", "Exporting Data"] },
  { group: "Advanced", items: ["API Reference", "Deployment", "Best Practices"] }
];

export default function Docs() {
  const [activeItem, setActiveItem] = useState("Introduction");

  return (
    <>

      <div style={{ display: 'flex', position: 'relative', zIndex: 10, minHeight: '100vh', paddingTop: '80px' }}>

        {/* Sidebar */}
        <aside style={{ width: '300px', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px', height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search docs..." style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 12px 10px 36px', borderRadius: '8px', fontSize: '13px', color: '#fff', outline: 'none' }} />
          </div>

          {DOCS_NAV.map((group) => (
            <div key={group.group}>
              <h5 style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>{group.group}</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {group.items.map(item => (
                  <button
                    key={item}
                    onClick={() => setActiveItem(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      textAlign: 'left',
                      background: activeItem === item ? 'rgba(34,211,238,0.1)' : 'transparent',
                      color: activeItem === item ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '60px 80px', maxWidth: '900px' }}>
          <motion.div
            key={activeItem}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Docs <ChevronRight size={12} /> Getting Started <ChevronRight size={12} /> <span style={{ color: 'var(--accent-cyan)' }}>{activeItem}</span>
            </div>

            <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#fff', marginBottom: '24px' }}>{activeItem}</h1>

            <div className="docs-content" style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '18px' }}>
              <p style={{ marginBottom: '24px' }}>
                Welcome to the LearNova {activeItem} guide. This section provides an in-depth understanding of how to leverage
                interactive tools to master Artificial Intelligence and Machine Learning fundamentals.
              </p>

              <div style={{ background: 'rgba(34,211,238,0.05)', borderLeft: '4px solid var(--accent-cyan)', padding: '24px', borderRadius: '0 12px 12px 0', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-cyan)', fontWeight: '700', marginBottom: '8px' }}>
                  <Zap size={18} /> Pro Tip
                </div>
                Use the Code Playground while following these guides to see the concepts in action immediately.
              </div>

              <h3>Overview</h3>
              <p style={{ marginBottom: '24px' }}>
                Artificial Intelligence is not just about writing code; it's about understanding data relationships and model architectures.
                LearNova guides you through these complexities using a practical-first approach.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
                <div className="ln-card" style={{ padding: '24px' }}>
                  <Code size={20} color="var(--accent-cyan)" style={{ marginBottom: '12px' }} />
                  <h4>Live Coding</h4>
                  <p style={{ fontSize: '14px' }}>Execute Python ML code directly in the browser.</p>
                </div>
                <div className="ln-card" style={{ padding: '24px' }}>
                  <HardDrive size={20} color="var(--accent-cyan)" style={{ marginBottom: '12px' }} />
                  <h4>Curated Datasets</h4>
                  <p style={{ fontSize: '14px' }}>Train your models on professional-grade datasets.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

      </div>
    </>
  );
}
