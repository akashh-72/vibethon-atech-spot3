import { useState, useEffect } from "react";
import { Mail, Sliders, AlertCircle, CheckCircle, FlaskConical, Search, Camera, Brain, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Simulations.css";

/* ── Spam Detection ── */
const SPAM_KEYWORDS = ["free", "win", "winner", "click here", "limited offer", "congratulations", "prize", "claim now", "urgent", "cash"];
const SAMPLE_EMAILS = [
  { text: "Congratulations! You've won a FREE iPhone. Click here to claim your prize now!", label: "SPAM" },
  { text: "Hey, are we still on for the meeting tomorrow at 3pm?",                         label: "NOT SPAM" },
  { text: "URGENT: Your account compromised. Verify immediately to avoid suspension!",     label: "SPAM" },
  { text: "Limited time offer! 90% discount on all products. Buy now — claim now!",        label: "SPAM" },
];

const analyzeSpam = (text) => {
  const lower = text.toLowerCase();
  const found = SPAM_KEYWORDS.filter(kw => lower.includes(kw));
  const score = found.length / SPAM_KEYWORDS.length;
  return { label: score > 0.12 ? "SPAM" : "NOT SPAM", score: Math.min(score * 100 / 0.3, 100).toFixed(1), keywords: found };
};

/* ── Iris Classification ── */
const IRIS_SAMPLES = [
  { sl: 5.1, sw: 3.5, pl: 1.4, pw: 0.2, species: "Setosa"     },
  { sl: 7.0, sw: 3.2, pl: 4.7, pw: 1.4, species: "Versicolor" },
  { sl: 6.3, sw: 3.3, pl: 6.0, pw: 2.5, species: "Virginica"  },
];
const SPECIES_COLOR = { Setosa: "#10b981", Versicolor: "#f59e0b", Virginica: "#8b5cf6" };
const classifyIris = (pl, pw) => {
  if (pl < 2.5) return "Setosa";
  if (pl < 5.0 && pw < 1.8) return "Versicolor";
  return "Virginica";
};

/* ── Vision AI (New) ── */
const VISION_DATA = [
  { id: "cat", label: "Cat", confidence: 98.4, features: ["Pointy ears", "Whiskers", "Slit pupils"] },
  { id: "dog", label: "Dog", confidence: 95.2, features: ["Floppy ears", "Snout", "Tail texture"] },
  { id: "car", label: "Car", confidence: 99.1, features: ["Wheels", "Headlights", "Metallic edge"] },
  { id: "tree", label: "Tree", confidence: 92.8, features: ["Leaves", "Branch patterns", "Trunk texture"] },
];

export default function Simulations() {
  const [tab, setTab] = useState("spam");

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">ML Simulations</h1>
            <p className="page-subtitle">Interactive demos of real-world AI applications and logic</p>
          </div>
          <div className="filter-tabs">
            <button className={`filter-tab ${tab === "spam" ? "active" : ""}`} onClick={() => setTab("spam")}>
              <Mail size={13} /> Spam Filter
            </button>
            <button className={`filter-tab ${tab === "iris" ? "active" : ""}`} onClick={() => setTab("iris")}>
              <FlaskConical size={13} /> Flower Logic
            </button>
            <button className={`filter-tab ${tab === "vision" ? "active" : ""}`} onClick={() => setTab("vision")}>
              <Camera size={13} /> Vision AI
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "spam" && <SpamSim />}
          {tab === "iris" && <IrisSim />}
          {tab === "vision" && <VisionSim />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SpamSim() {
  const [custom, setCustom] = useState("");
  const [result, setResult] = useState(null);

  return (
    <div className="sim-layout">
      <div className="card sim-hero-card">
        <div className="sim-info-header">
          <div className="sim-icon-circle"><Mail size={20} /></div>
          <h3>NLP: Keyword Spam Detection</h3>
          <p>This simulation demonstrates how basic Natural Language Processing (NLP) models detect spam by analyzing keyword frequency and weighting.</p>
        </div>
        
        <div className="spam-input-box">
          <textarea
            className="sim-textarea"
            placeholder="Type or paste a message (e.g., 'You won a prize!')..."
            value={custom}
            onChange={e => { setCustom(e.target.value); setResult(null); }}
          />
          <button className="btn btn-primary" onClick={() => custom && setResult(analyzeSpam(custom))}>
            Analyze Text
          </button>
        </div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`spam-result-pnl ${result.label === "SPAM" ? "spam" : "ham"}`}
          >
            <div className="res-tag">{result.label}</div>
            <div className="res-score">Confidence Score: {result.score}%</div>
            {result.keywords.length > 0 && (
              <div className="res-kws">
                {result.keywords.map(k => <span key={k} className="kw-chip">{k}</span>)}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <div className="card">
        <h4 className="sim-subtitle">Model Accuracy Test</h4>
        <div className="spam-test-rows">
          {SAMPLE_EMAILS.map((e, i) => {
            const pred = analyzeSpam(e.text);
            return (
              <div key={i} className="test-row">
                <span className={`truth ${e.label === "SPAM" ? "spam" : "ham"}`}>{e.label}</span>
                <p>{e.text}</p>
                <span className="pred">Pred: {pred.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function IrisSim() {
  const [pl, setPl] = useState(3.5);
  const [pw, setPw] = useState(1.2);
  const pred = classifyIris(pl, pw);

  return (
    <div className="sim-layout">
      <div className="card sim-hero-card">
        <div className="sim-info-header">
          <div className="sim-icon-circle"><FlaskConical size={20} /></div>
          <h3>Supervised: Iris Classification</h3>
          <p>Adjust petal features to see how a Decision Tree classifies different species of Iris flowers based on physical measurements.</p>
        </div>

        <div className="iris-controls-grid">
          <div className="iris-sliders">
            <div className="slider-group">
              <label>Petal Length ({pl.toFixed(1)}cm)</label>
              <input type="range" min="1" max="7" step="0.1" value={pl} onChange={e => setPl(Number(e.target.value))} />
            </div>
            <div className="slider-group">
              <label>Petal Width ({pw.toFixed(1)}cm)</label>
              <input type="range" min="0.1" max="2.5" step="0.1" value={pw} onChange={e => setPw(Number(e.target.value))} />
            </div>
          </div>
          
          <div className="iris-result-card" style={{ background: SPECIES_COLOR[pred] + "20" }}>
            <span className="iris-res-label">Species Prediction</span>
            <div className="iris-res-val" style={{ color: SPECIES_COLOR[pred] }}>{pred}</div>
            <div className="iris-res-logic">Logic: {pl < 2.5 ? "Width < 2.5" : pl < 5 ? "Length 2.5-5" : "Length > 5"}</div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h4 className="sim-subtitle">Decision Boundary Visualization</h4>
        <div className="iris-viz-box">
          <div className="viz-marker" style={{ left: `${(pl/7)*100}%`, bottom: `${(pw/2.5)*100}%` }}>
            <Search size={20} />
          </div>
          <div className="viz-zones">
            <div className="zone setosa">Setosa</div>
            <div className="zone versicolor">Versicolor</div>
            <div className="zone virginica">Virginica</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisionSim() {
  const [selected, setSelected] = useState(VISION_DATA[0]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleSelect = (item) => {
    setAnalyzing(true);
    setTimeout(() => {
      setSelected(item);
      setAnalyzing(false);
    }, 800);
  };

  return (
    <div className="sim-layout">
      <div className="card sim-hero-card">
        <div className="sim-info-header">
          <div className="sim-icon-circle"><Camera size={20} /></div>
          <h3>Computer Vision: Image Classification</h3>
          <p>Select an object to simulate how a Convolutional Neural Network (CNN) extracts features to identify objects with high confidence.</p>
        </div>

        <div className="vision-picker-grid">
          {VISION_DATA.map(item => (
            <button 
              key={item.id} 
              className={`vision-pick-btn ${selected.id === item.id ? "active" : ""}`}
              onClick={() => handleSelect(item)}
            >
              <div className="vision-pick-icon">{item.label[0]}</div>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="vision-main-grid">
        <div className="card vision-analysis-card">
          <div className="vision-viz-pnl">
            {analyzing ? (
              <div className="vision-loader">
                <Brain className="vision-brain-anim" size={40} />
                <span>Feature Extraction...</span>
              </div>
            ) : (
              <div className="vision-analysis-view">
                <div className="vision-img-mock">🔍 {selected.label}</div>
                <div className="vision-feature-overlay">
                  {selected.features.map((f, i) => (
                    <motion.div 
                      key={f} 
                      className="feat-box"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="vision-results-col">
          <div className="card">
            <h4 className="sim-subtitle">Detection Results</h4>
            <div className="vis-res-row">
              <span className="vis-res-label">Object Type</span>
              <span className="vis-res-val">{selected.label}</span>
            </div>
            <div className="vis-res-row">
              <span className="vis-res-label">Confidence</span>
              <span className="vis-res-val highlight">{selected.confidence}%</span>
            </div>
            
            <div className="vis-features-list">
              <span className="vis-feat-header">Extracted Features:</span>
              {selected.features.map(f => (
                <div key={f} className="vis-feat-item">
                  <CheckCircle size={12} /> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-accent">
            <div className="vis-pro-tip">
              <Zap size={16} />
              <p>CNNs use "filters" to detect shapes. The first layers see <strong>edges</strong>, while deeper layers see <strong>objects</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
