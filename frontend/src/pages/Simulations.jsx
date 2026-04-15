import { useState } from "react";
import "./Simulations.css";

// ===== SPAM DETECTION SIMULATION =====
const SPAM_DATASET = [
  { text: "Congratulations! You've won a FREE iPhone. Click here to claim your prize now!", label: "SPAM" },
  { text: "Hey, are we still on for the meeting tomorrow at 3pm?", label: "NOT SPAM" },
  { text: "URGENT: Your account has been compromised. Verify immediately to avoid suspension!", label: "SPAM" },
  { text: "Please find attached the quarterly report for your review.", label: "NOT SPAM" },
  { text: "Limited time offer! Get 90% discount on all products. Buy now before it's too late!", label: "SPAM" },
  { text: "Hi, I wanted to follow up on our conversation from last week about the project timeline.", label: "NOT SPAM" },
  { text: "You are selected as a lucky winner! Send your bank details to claim $10,000 cash prize!", label: "SPAM" },
  { text: "The team lunch is scheduled for Friday. Please confirm your attendance.", label: "NOT SPAM" },
];

const SPAM_KEYWORDS = ["free", "win", "winner", "click", "prize", "urgent", "offer", "discount", "buy now", "claim", "congratulations", "cash", "selected", "lucky"];

// ===== CLASSIFICATION SIMULATION =====
const IRIS_DATA = [
  { sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2, species: "Setosa" },
  { sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2, species: "Setosa" },
  { sepalLength: 7.0, sepalWidth: 3.2, petalLength: 4.7, petalWidth: 1.4, species: "Versicolor" },
  { sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5, species: "Versicolor" },
  { sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5, species: "Virginica" },
  { sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9, species: "Virginica" },
];

function classifyIris(pl, pw) {
  if (pl < 2.5) return "Setosa";
  if (pl < 5.0 && pw < 1.8) return "Versicolor";
  return "Virginica";
}

const SPECIES_COLORS = { Setosa: "#10b981", Versicolor: "#f59e0b", Virginica: "#a78bfa" };

export default function Simulations() {
  const [activeTab, setActiveTab] = useState("spam");

  return (
    <div className="simulations-page animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">🔬 Real-World Simulations</h1>
        <p className="page-subtitle">Run actual AIML use-cases on real data</p>
      </div>

      <div className="sim-tabs">
        <button className={`sim-tab ${activeTab === "spam" ? "active" : ""}`} onClick={() => setActiveTab("spam")}>
          📧 Spam Detection
        </button>
        <button className={`sim-tab ${activeTab === "iris" ? "active" : ""}`} onClick={() => setActiveTab("iris")}>
          🌸 Iris Classification
        </button>
      </div>

      {activeTab === "spam" ? <SpamDetection /> : <IrisClassification />}
    </div>
  );
}

function SpamDetection() {
  const [customText, setCustomText] = useState("");
  const [customResult, setCustomResult] = useState(null);

  const analyzeSpam = (text) => {
    const lower = text.toLowerCase();
    const found = SPAM_KEYWORDS.filter(kw => lower.includes(kw));
    const score = found.length / SPAM_KEYWORDS.length;
    return {
      label: score > 0.12 ? "SPAM" : "NOT SPAM",
      score: Math.min(score * 100 / 0.3, 100).toFixed(1),
      keywords: found,
    };
  };

  const handleCustom = () => {
    if (!customText.trim()) return;
    setCustomResult(analyzeSpam(customText));
  };

  return (
    <div className="spam-sim">
      <div className="sim-info glass-card">
        <h3>📨 How It Works</h3>
        <p>This simulation uses a <strong>keyword-based Naive Bayes-inspired</strong> approach. It calculates a spam score based on the presence of known spam keywords in the email text — a simple but effective baseline for spam detection.</p>
      </div>

      {/* Dataset Examples */}
      <div className="sim-section glass-card">
        <h3>Dataset Examples</h3>
        <p className="sim-desc">Below is a sample of labeled emails. The classifier detects spam keywords to make predictions.</p>
        <div className="spam-examples">
          {SPAM_DATA_SET.map((item, i) => {
            const result = analyzeSpam(item.text);
            const isCorrect = result.label === item.label;
            return (
              <div key={i} className={`spam-row ${item.label === "SPAM" ? "spam" : "ham"}`}>
                <div className="spam-label-badge">{item.label}</div>
                <div className="spam-text">{item.text}</div>
                <div className={`spam-predict ${isCorrect ? "correct" : "wrong"}`}>
                  Predicted: {result.label} {isCorrect ? "✅" : "❌"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Try Your Own */}
      <div className="sim-section glass-card">
        <h3>🧪 Try Your Own Email</h3>
        <textarea
          className="form-input spam-textarea"
          placeholder="Type an email text to classify..."
          value={customText}
          onChange={e => setCustomText(e.target.value)}
          rows={4}
        />
        <button className="btn btn-primary" onClick={handleCustom}>Classify Email →</button>

        {customResult && (
          <div className={`custom-result ${customResult.label === "SPAM" ? "spam-result" : "ham-result"}`}>
            <div className="custom-result-label">{customResult.label === "SPAM" ? "🚨" : "✅"} {customResult.label}</div>
            <div className="custom-result-score">Spam Score: {customResult.score}%</div>
            {customResult.keywords.length > 0 && (
              <div className="custom-keywords">
                Keywords found: {customResult.keywords.map(k => (
                  <span key={k} className="kw-chip">{k}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Fix variable name
const SPAM_DATA_SET = SPAM_DATASET;

function IrisClassification() {
  const [petalLength, setPetalLength] = useState(3.5);
  const [petalWidth, setPetalWidth]   = useState(1.2);
  const prediction = classifyIris(petalLength, petalWidth);

  return (
    <div className="iris-sim">
      <div className="sim-info glass-card">
        <h3>🌸 Iris Flower Classification</h3>
        <p>The Iris dataset is one of the most famous ML datasets. This simulation uses a simplified <strong>Decision Tree</strong> rule to classify Iris flowers into 3 species based on petal measurements.</p>
      </div>

      <div className="iris-layout">
        <div className="sim-section glass-card">
          <h3>Tune Petal Measurements</h3>
          <div className="iris-controls">
            <div className="iris-control">
              <div className="iris-control-label">
                <span>Petal Length (cm)</span>
                <span className="iris-val">{petalLength.toFixed(1)} cm</span>
              </div>
              <input type="range" min={1} max={7} step={0.1} value={petalLength} onChange={e => setPetalLength(parseFloat(e.target.value))} className="nn-slider" />
            </div>
            <div className="iris-control">
              <div className="iris-control-label">
                <span>Petal Width (cm)</span>
                <span className="iris-val">{petalWidth.toFixed(1)} cm</span>
              </div>
              <input type="range" min={0.1} max={2.5} step={0.1} value={petalWidth} onChange={e => setPetalWidth(parseFloat(e.target.value))} className="nn-slider" />
            </div>
          </div>

          <div className="iris-prediction" style={{ borderColor: SPECIES_COLORS[prediction] + "66", background: SPECIES_COLORS[prediction] + "18" }}>
            <div className="iris-pred-label">Predicted Species</div>
            <div className="iris-pred-value" style={{ color: SPECIES_COLORS[prediction] }}>
              🌸 Iris {prediction}
            </div>
            <div className="iris-pred-rule">
              {prediction === "Setosa" ? "Rule: Petal Length < 2.5 cm" :
               prediction === "Versicolor" ? "Rule: Petal Length 2.5–5.0 cm & Width < 1.8 cm" :
               "Rule: Petal Length ≥ 5.0 cm or Width ≥ 1.8 cm"}
            </div>
          </div>
        </div>

        {/* Dataset table */}
        <div className="sim-section glass-card">
          <h3>Sample Dataset</h3>
          <div className="iris-table-wrapper">
            <table className="iris-table">
              <thead>
                <tr>
                  <th>Sepal L</th>
                  <th>Sepal W</th>
                  <th>Petal L</th>
                  <th>Petal W</th>
                  <th>Species</th>
                </tr>
              </thead>
              <tbody>
                {IRIS_DATA.map((row, i) => (
                  <tr key={i}>
                    <td>{row.sepalLength}</td>
                    <td>{row.sepalWidth}</td>
                    <td>{row.petalLength}</td>
                    <td>{row.petalWidth}</td>
                    <td style={{ color: SPECIES_COLORS[row.species], fontWeight: 700 }}>
                      {row.species}
                    </td>
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
