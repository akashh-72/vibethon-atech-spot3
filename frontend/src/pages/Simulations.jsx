import { useState } from "react";
import { Mail, Sliders, AlertCircle, CheckCircle, FlaskConical } from "lucide-react";
import "./Simulations.css";

/* ── Spam Detection ── */
const SPAM_KEYWORDS = ["free", "win", "winner", "click here", "limited offer", "congratulations", "prize", "claim now", "urgent", "cash"];
const SAMPLE_EMAILS = [
  { text: "Congratulations! You've won a FREE iPhone. Click here to claim your prize now!", label: "SPAM" },
  { text: "Hey, are we still on for the meeting tomorrow at 3pm?",                         label: "NOT SPAM" },
  { text: "URGENT: Your account compromised. Verify immediately to avoid suspension!",     label: "SPAM" },
  { text: "Please find the attached quarterly report for your review.",                    label: "NOT SPAM" },
  { text: "Limited time offer! 90% discount on all products. Buy now — claim now!",        label: "SPAM" },
  { text: "Hi, following up on our conversation from last week about the timeline.",       label: "NOT SPAM" },
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
  { sl: 4.9, sw: 3.0, pl: 1.4, pw: 0.2, species: "Setosa"     },
  { sl: 7.0, sw: 3.2, pl: 4.7, pw: 1.4, species: "Versicolor" },
  { sl: 6.4, sw: 3.2, pl: 4.5, pw: 1.5, species: "Versicolor" },
  { sl: 6.3, sw: 3.3, pl: 6.0, pw: 2.5, species: "Virginica"  },
  { sl: 5.8, sw: 2.7, pl: 5.1, pw: 1.9, species: "Virginica"  },
];
const SPECIES_COLOR = { Setosa: "#10b981", Versicolor: "#f59e0b", Virginica: "#8b5cf6" };
const classifyIris = (pl, pw) => {
  if (pl < 2.5) return "Setosa";
  if (pl < 5.0 && pw < 1.8) return "Versicolor";
  return "Virginica";
};

export default function Simulations() {
  const [tab, setTab] = useState("spam");

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Real-World Simulations</h1>
            <p className="page-subtitle">Run actual ML use-cases on real datasets with interactive controls</p>
          </div>
          <div className="filter-tabs">
            <button className={`filter-tab ${tab === "spam" ? "active" : ""}`} onClick={() => setTab("spam")}>
              <Mail size={13} /> Spam Detection
            </button>
            <button className={`filter-tab ${tab === "iris" ? "active" : ""}`} onClick={() => setTab("iris")}>
              <FlaskConical size={13} /> Iris Classification
            </button>
          </div>
        </div>
      </div>

      {tab === "spam" ? <SpamSim /> : <IrisSim />}
    </div>
  );
}

function SpamSim() {
  const [custom, setCustom] = useState("");
  const [result, setResult] = useState(null);

  return (
    <div className="sim-layout">
      {/* Info */}
      <div className="card sim-info">
        <div className="sim-info-header">
          <div className="sim-info-icon"><Mail size={18} /></div>
          <div>
            <h3>Keyword-Based Spam Detection</h3>
            <p>Uses a Naive Bayes-inspired approach — calculates a spam score based on the presence of known spam keywords. A foundational technique in NLP classification.</p>
          </div>
        </div>
      </div>

      {/* Dataset table */}
      <div className="card">
        <h4 className="sim-section-title">Sample Dataset — Model Predictions</h4>
        <div className="spam-table">
          {SAMPLE_EMAILS.map((e, i) => {
            const pred = analyzeSpam(e.text);
            const correct = pred.label === e.label;
            return (
              <div key={i} className={`spam-row ${e.label === "SPAM" ? "spam" : "ham"}`}>
                <div className={`spam-truth-badge ${e.label === "SPAM" ? "spam" : "ham"}`}>{e.label}</div>
                <p className="spam-text">{e.text}</p>
                <div className={`spam-pred ${correct ? "correct" : "wrong"}`}>
                  {correct ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
                  {pred.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Try your own */}
      <div className="card">
        <h4 className="sim-section-title">Try Your Own Email</h4>
        <div className="form-group" style={{ marginBottom: 14 }}>
          <textarea
            className="form-input sim-textarea"
            rows={4}
            placeholder="Paste an email message to classify..."
            value={custom}
            onChange={e => { setCustom(e.target.value); setResult(null); }}
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { if (custom.trim()) setResult(analyzeSpam(custom)); }}>
          Classify Email
        </button>

        {result && (
          <div className={`custom-result ${result.label === "SPAM" ? "spam" : "ham"} animate-slide-down`}>
            <div className="cr-label">{result.label}</div>
            <div className="cr-score">Spam Score: {result.score}%</div>
            {result.keywords.length > 0 && (
              <div className="cr-keywords">
                Keywords detected:
                {result.keywords.map(k => <span key={k} className="kw-chip">{k}</span>)}
              </div>
            )}
          </div>
        )}
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
      <div className="card sim-info">
        <div className="sim-info-header">
          <div className="sim-info-icon"><FlaskConical size={18} /></div>
          <div>
            <h3>Iris Flower Classification</h3>
            <p>One of ML's most famous datasets. Uses a simplified Decision Tree rule to classify flowers into 3 species based on petal measurements — a core supervised learning example.</p>
          </div>
        </div>
      </div>

      <div className="iris-main-grid">
        {/* Controls */}
        <div className="card">
          <h4 className="sim-section-title">Adjust Petal Measurements</h4>
          <div className="iris-sliders">
            {[
              { label: "Petal Length", val: pl, set: setPl, min: 1, max: 7, unit: "cm" },
              { label: "Petal Width",  val: pw, set: setPw, min: 0.1, max: 2.5, unit: "cm" },
            ].map(s => (
              <div key={s.label} className="iris-slider-row">
                <div className="iris-slider-label">
                  <span>{s.label}</span>
                  <span className="iris-slider-val">{s.val.toFixed(1)} {s.unit}</span>
                </div>
                <input type="range" min={s.min} max={s.max} step={0.1} value={s.val}
                  onChange={e => s.set(parseFloat(e.target.value))} className="nn-range" />
              </div>
            ))}
          </div>

          <div className="iris-prediction" style={{ borderColor: SPECIES_COLOR[pred] + "55", background: SPECIES_COLOR[pred] + "10" }}>
            <div className="iris-pred-label">Predicted Species</div>
            <div className="iris-pred-value" style={{ color: SPECIES_COLOR[pred] }}>Iris {pred}</div>
            <div className="iris-pred-rule">
              {pred === "Setosa"     ? "Petal Length < 2.5 cm" :
               pred === "Versicolor" ? "Petal Length 2.5–5.0 cm & Width < 1.8 cm" :
               "Petal Length >= 5.0 cm or Width >= 1.8 cm"}
            </div>
          </div>
        </div>

        {/* Dataset table */}
        <div className="card">
          <h4 className="sim-section-title">Sample Dataset</h4>
          <div className="iris-table-wrap">
            <table className="iris-table">
              <thead>
                <tr>
                  <th>Sepal L</th><th>Sepal W</th><th>Petal L</th><th>Petal W</th><th>Species</th>
                </tr>
              </thead>
              <tbody>
                {IRIS_SAMPLES.map((r, i) => (
                  <tr key={i}>
                    <td>{r.sl}</td><td>{r.sw}</td><td>{r.pl}</td><td>{r.pw}</td>
                    <td style={{ color: SPECIES_COLOR[r.species], fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>{r.species}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
