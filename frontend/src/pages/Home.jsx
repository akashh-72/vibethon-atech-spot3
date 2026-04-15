import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, BookOpen, Code2, Gamepad2, Trophy, Zap, Brain,
  FlaskConical, Target, Sparkles, CheckCircle2, ShieldCheck,
  LineChart, Rocket, Play, Star, Users, Award, TrendingUp,
  ChevronRight, MousePointerClick, Layers, GraduationCap, Menu, X
} from "lucide-react";
import "./Home.css";

/* ── Animated Counter ── */
import { useMotionValueEvent } from "framer-motion";

function AnimatedCounter({ target, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplay(latest);
  });

  useEffect(() => {
    if (isInView) {
      const num = parseInt(target);
      if (!isNaN(num)) {
        const controls = animate(count, num, { duration: 2, ease: "easeOut" });
        return () => controls.stop();
      }
    }
  }, [isInView, target, count]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Section Reveal Wrapper ── */
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      scale: direction === "scale" ? 0.92 : 1,
    },
    visible: {
      opacity: 1, y: 0, x: 0, scale: 1,
      transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

const FEATURES = [
  { icon: BookOpen, title: "Structured Curriculum", desc: "Progressive learning paths from fundamentals to advanced AI & ML concepts, designed by experts.", color: "#818cf8", gradient: "linear-gradient(135deg, #6366f1, #818cf8)" },
  { icon: Code2, title: "Code Playground", desc: "Write and execute Python-style AI code directly in your browser with real-time output.", color: "#22d3ee", gradient: "linear-gradient(135deg, #06b6d4, #22d3ee)" },
  { icon: Target, title: "Adaptive Quizzes", desc: "Test your understanding with module-based assessments and receive instant, detailed feedback.", color: "#34d399", gradient: "linear-gradient(135deg, #10b981, #34d399)" },
  { icon: Gamepad2, title: "Interactive Games", desc: "Learn Decision Trees, Neural Networks, and Classification through hands-on interactive games.", color: "#fbbf24", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
  { icon: FlaskConical, title: "Real-World Simulations", desc: "Run actual ML use-cases like spam detection and Iris classification on real datasets.", color: "#a78bfa", gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)" },
  { icon: Trophy, title: "Gamified Progress", desc: "Earn XP, unlock badges, level up, and compete on live leaderboards with other learners.", color: "#fb7185", gradient: "linear-gradient(135deg, #f43f5e, #fb7185)" },
];

const STATS = [
  { value: "4", label: "Core Modules", icon: Layers, suffix: "" },
  { value: "20", label: "Lessons", icon: GraduationCap, suffix: "+" },
  { value: "3", label: "Mini-Games", icon: Gamepad2, suffix: "" },
  { value: "2", label: "Simulations", icon: FlaskConical, suffix: "" },
];

const LEARNING_FLOW = [
  { step: "01", icon: BookOpen, title: "Learn Fundamentals", desc: "Start with curated, guided modules built by experienced mentors.", color: "#818cf8", bg: "rgba(129,140,248,0.1)" },
  { step: "02", icon: LineChart, title: "Practice & Measure", desc: "Apply concepts through quizzes, playground tasks, and real-time feedback.", color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
  { step: "03", icon: Rocket, title: "Advance with Confidence", desc: "Track growth through levels, leaderboard rankings, and simulation-based mastery.", color: "#22d3ee", bg: "rgba(34,211,238,0.1)" },
];

const TESTIMONIALS = [
  { name: "Rahul Sharma", role: "CS Student", quote: "LearNova made complex ML concepts feel approachable. The interactive games are genius!", avatar: "RS" },
  { name: "Priya Patel", role: "Data Analyst", quote: "The structured curriculum and real-world simulations are exactly what I needed to upskill.", avatar: "PP" },
  { name: "Arjun Mehta", role: "AI Enthusiast", quote: "Competing on leaderboards keeps me motivated. Best AI learning platform I've found.", avatar: "AM" },
];

const WHY_POINTS = [
  { icon: CheckCircle2, text: "Structured lessons with practical coding tasks" },
  { icon: MousePointerClick, text: "Interactive visual learning for difficult AI concepts" },
  { icon: TrendingUp, text: "Progress tracking, XP levels, and leaderboard motivation" },
  { icon: Award, text: "Earn badges and certificates as you progress" },
  { icon: Users, text: "Community-driven learning with peer competition" },
  { icon: Star, text: "Expert-curated content updated regularly" },
];

const TRUST_ITEMS = [
  { text: "Structured Curriculum", icon: BookOpen },
  { text: "Project-Based", icon: Code2 },
  { text: "Progress Analytics", icon: LineChart },
  { text: "Interactive Assessments", icon: Target },
];

export default function Home() {
  return (
    <>
      {/* ── Hero Section ── */}


      {/* ── Hero Section ── */}
      <section className="home-hero">
        <div className="hero-glow-left" aria-hidden="true" />
        <div className="hero-glow-right" aria-hidden="true" />
        <div className="hero-mesh-decoration" aria-hidden="true" />
        
        <div className="home-hero-inner">
          <motion.h1
            className="home-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Master AI & Machine<br />
            Learning Interactively
          </motion.h1>

          <motion.p
            className="home-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Master Artificial Intelligence and Machine Learning through<br />
            guided lessons, interactive playground, and real-world simulations.
          </motion.p>

          <motion.div
            className="home-hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/register" className="btn-ln-primary hero-cta">
              <div className="btn-icon-circle black-circle">
                <ArrowRight size={16} />
              </div>
              Get Started
            </Link>
          </motion.div>

      {/* Stats Strip */}
          <motion.div
            className="home-stats"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
          >
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="home-stat">
                  <div className="home-stat-icon"><Icon size={24} strokeWidth={1.5} /></div>
                  <div className="home-stat-value">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="home-stat-label">{s.label}</div>
                </div>
              );
            })}
          </motion.div>

          {/* Dashboard Preview Panel */}
          <motion.div
            className="home-hero-panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.78 }}
          >
            <div className="home-hero-panel-head">
              <div className="home-panel-title">
                <ShieldCheck size={15} />
                <span>Professional Learning Stack</span>
              </div>
              <span className="home-panel-chip">
                <span className="home-panel-chip-dot" />
                Live Preview
              </span>
            </div>
            <div className="home-hero-panel-grid">
              {[
                { label: "Curriculum Completion", value: "82%", fill: 82, icon: TrendingUp, iconColor: "rgba(37,99,235,0.12)", iconText: "#818cf8", gradient: "linear-gradient(90deg,#6366f1,#818cf8)" },
                { label: "Quiz Accuracy", value: "91%", fill: 91, icon: Target, iconColor: "rgba(16,185,129,0.1)", iconText: "#34d399", gradient: "linear-gradient(90deg,#10b981,#34d399)" },
                { label: "Active Learners", value: "1.2k+", fill: 75, icon: Users, iconColor: "rgba(139,92,246,0.1)", iconText: "#a78bfa", gradient: "linear-gradient(90deg,#8b5cf6,#a78bfa)" },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    className="home-panel-card"
                    whileHover={{ y: -2 }}
                  >
                    <div className="home-panel-card-icon" style={{ background: card.iconColor, color: card.iconText }}>
                      <Icon size={15} />
                    </div>
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                    <div className="home-panel-progress">
                      <motion.div
                        className="home-panel-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${card.fill}%` }}
                        transition={{ duration: 1.4, delay: 1.1 + i * 0.15, ease: "easeOut" }}
                        style={{ background: card.gradient }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section className="home-trust-strip">
        <Reveal>
          <div className="home-trust-inner">
            <p className="home-trust-label">Trusted by serious learners for structured AI/ML growth</p>
            <div className="home-trust-list">
              {TRUST_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.span
                    key={item.text}
                    whileHover={{ scale: 1.04, y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <Icon size={12} />
                    {item.text}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Core Products ── */}
      <section id="features" className="home-products">
        <div className="home-section-inner">
          <Reveal>
            <div className="home-section-header">
              <h2 className="home-section-title">Core Modules</h2>
              <p className="home-section-desc">
                Interactive tools designed to take you from a curious learner<br />
                to a confident AI professional.
              </p>
            </div>
          </Reveal>

          <div className="ln-grid">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 0.05}>
                  <div className="ln-card">
                    <div className="ln-card-icon">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="ln-card-text">
                      <h3>
                        {f.title}
                        {i === 0 && <span className="ln-badge">FEATURED</span>}
                      </h3>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="home-process">
        <div className="home-section-inner">
          <Reveal>
            <div className="home-section-header">
              <div className="home-section-tag">
                <Layers size={13} />
                How It Works
              </div>
              <h2 className="home-section-title">A professional learning workflow</h2>
              <p className="home-section-desc">
                Built to help you move from learning to applying concepts with measurable progress.
              </p>
            </div>
          </Reveal>

          <div className="home-process-grid">
            {LEARNING_FLOW.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.15}>
                  <motion.div
                    className="home-process-card"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="home-process-step">{item.step}</div>
                    <div className="home-process-icon" style={{ background: item.bg, color: item.color }}>
                      <Icon size={21} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why LearNova ── */}
      <section id="why" className="home-why">
        <div className="home-section-inner">
          <div className="home-why-layout">
            <Reveal direction="right" className="home-why-content">
              <div className="home-section-tag">
                <Award size={13} />
                Why LearNova
              </div>
              <h2 className="home-section-title">Designed for focused<br />and modern learning</h2>
              <p className="home-section-desc">
                LearNova combines clean UI, curated content, and interactive practice so learners
                can move from fundamentals to confidence faster.
              </p>
              <Link to="/register" className="btn-hero-primary" style={{ marginTop: 8, alignSelf: "flex-start" }}>
                Join Now <ArrowRight size={15} />
              </Link>
            </Reveal>

            <div className="home-why-grid">
              {WHY_POINTS.map((point, i) => {
                const Icon = point.icon;
                return (
                  <Reveal key={point.text} delay={i * 0.08}>
                    <motion.div
                      className="home-why-item"
                      whileHover={{ x: 4 }}
                    >
                      <div className="home-why-icon"><Icon size={17} /></div>
                      <span>{point.text}</span>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="home-testimonials">
        <div className="home-section-inner">
          <Reveal>
            <div className="home-section-header">
              <div className="home-section-tag">
                <Star size={13} />
                What Learners Say
              </div>
              <h2 className="home-section-title">Trusted by aspiring AI professionals</h2>
              <p className="home-section-desc">
                Hear from learners who transformed their understanding of AI & ML with LearNova.
              </p>
            </div>
          </Reveal>

          <div className="home-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <motion.div className="home-testimonial-card" whileHover={{ y: -4 }}>
                  <div className="home-testimonial-stars">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p className="home-testimonial-quote">"{t.quote}"</p>
                  <div className="home-testimonial-author">
                    <div className="home-testimonial-avatar">{t.avatar}</div>
                    <div>
                      <div className="home-testimonial-name">{t.name}</div>
                      <div className="home-testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="home-cta">
        <Reveal direction="scale">
          <div className="home-cta-inner">
            <div className="home-cta-glow" aria-hidden="true" />
            <motion.div
              className="home-cta-icon"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={28} />
            </motion.div>
            <h2 className="home-cta-title">Ready to start your AI journey?</h2>
            <p className="home-cta-desc">
              Join LearNova and start mastering Artificial Intelligence and Machine Learning today.
              It's completely free to get started.
            </p>
            <div className="home-cta-actions">
              <Link to="/register" className="home-cta-btn">
                Create Free Account <ArrowRight size={17} />
              </Link>
              <p className="home-cta-note">No credit card required · Free forever</p>
            </div>
          </div>
        </Reveal>
      </section>

    </>
  );
}

