import { useState, useEffect, useRef } from "react";
import { TreeDeciduous, Brain, Target, ChevronLeft, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import "./Games.css";

const GAMES = [
  { id: "decision-tree", icon: TreeDeciduous, title: "Decision Tree Builder",   desc: "Classify mystery animals using yes/no questions. Visualize the decision path in real time.", difficulty: "Beginner",     color: "#10b981" },
  { id: "neural-net",   icon: Brain,          title: "Neural Network Trainer",   desc: "Tune weights and biases interactively. Watch how the sigmoid neuron responds.",               difficulty: "Intermediate", color: "#6366f1" },
  { id: "classify",     icon: Target,         title: "Classification Challenge", desc: "Identify fruit categories from feature descriptors. Test your ML intuition.",                 difficulty: "Beginner",     color: "#f59e0b" },
];

export default function Games() {
  const [active, setActive] = useState(null);

  if (active === "decision-tree") return <DecisionTreeGame onBack={() => setActive(null)} />;
  if (active === "neural-net")   return <NeuralNetGame    onBack={() => setActive(null)} />;
  if (active === "classify")     return <ClassifyGame     onBack={() => setActive(null)} />;

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Learning Games</h1>
        <p className="page-subtitle">Reinforce AI & ML concepts through interactive, gamified experiences</p>
      </div>
      <div className="games-grid">
        {GAMES.map((g, i) => {
          const Icon = g.icon;
          return (
            <div key={g.id} className={`game-card card card-interactive animate-fade-in delay-${i + 1}`} onClick={() => setActive(g.id)}>
              <div className="game-card-icon" style={{ background: `${g.color}18`, border: `1px solid ${g.color}30` }}>
                <Icon size={24} color={g.color} strokeWidth={1.75} />
              </div>
              <div className="game-card-body">
                <div className="game-card-level">
                  <span className={`badge ${g.difficulty === "Beginner" ? "badge-emerald" : "badge-amber"}`}>{g.difficulty}</span>
                </div>
                <h3 className="game-card-title">{g.title}</h3>
                <p className="game-card-desc">{g.desc}</p>
              </div>
              <div className="game-card-footer">
                <span className="game-play-btn">Play now</span>
                <ChevronLeft size={16} style={{ transform: "rotate(180deg)" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── GAME RUNNER SHELL ── */
function GameShell({ title, score, total, onBack, children }) {
  return (
    <div className="page-wrapper animate-fade-in">
      <div className="game-run-header">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <ChevronLeft size={15} /> Games
        </button>
        <h2 className="game-run-title">{title}</h2>
        {total > 0 && (
          <div className="game-score-pill">
            <CheckCircle size={13} /> {score} / {total}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

/* ── DECISION TREE GAME ── */
const ANIMALS = [
  { name: "Dolphin",   hasFur: false, canFly: false, livesInWater: true,  mammal: true  },
  { name: "Eagle",     hasFur: false, canFly: true,  livesInWater: false, mammal: false },
  { name: "Elephant",  hasFur: false, canFly: false, livesInWater: false, mammal: true  },
  { name: "Lion",      hasFur: true,  canFly: false, livesInWater: false, mammal: true  },
  { name: "Clownfish", hasFur: false, canFly: false, livesInWater: true,  mammal: false },
  { name: "Butterfly", hasFur: false, canFly: true,  livesInWater: false, mammal: false },
  { name: "Wolf",      hasFur: true,  canFly: false, livesInWater: false, mammal: true  },
  { name: "Duck",      hasFur: false, canFly: true,  livesInWater: false, mammal: false },
];

const DT_QUESTIONS = [
  { q: "Does it have fur?",       key: "hasFur"       },
  { q: "Can it fly?",             key: "canFly"        },
  { q: "Does it live in water?",  key: "livesInWater"  },
  { q: "Is it a mammal?",         key: "mammal"        },
];

function DecisionTreeGame({ onBack }) {
  const [current, setCurrent] = useState(null);
  const [qIdx, setQIdx]       = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult]   = useState(null);
  const [score, setScore]     = useState(0);
  const [rounds, setRounds]   = useState(0);

  useEffect(() => { startRound(); }, []);

  const startRound = () => {
    setCurrent(ANIMALS[Math.floor(Math.random() * ANIMALS.length)]);
    setQIdx(0); setAnswers([]); setResult(null);
  };

  const handleAnswer = (val) => {
    const newAnswers = [...answers, { key: DT_QUESTIONS[qIdx].key, val }];
    setAnswers(newAnswers);
    if (qIdx < DT_QUESTIONS.length - 1) {
      setQIdx(qIdx + 1);
    } else {
      const correct = newAnswers.filter(a => current[a.key] === a.val).length;
      const perfect = correct === DT_QUESTIONS.length;
      setResult({ perfect, correct, total: DT_QUESTIONS.length });
      setRounds(r => r + 1);
      if (perfect) setScore(s => s + 1);
    }
  };

  return (
    <GameShell title="Decision Tree Builder" score={score} total={rounds} onBack={onBack}>
      {current && (
        <div className="dt-layout">
          <div className="card dt-main">
            <div className="dt-animal-header">
              <div className="dt-animal-icon"><TreeDeciduous size={28} color="#10b981" strokeWidth={1.5} /></div>
              <div>
                <div className="dt-label">Mystery Animal</div>
                <p className="dt-hint">Answer each question to reveal the decision path</p>
              </div>
            </div>

            {/* Path so far */}
            {answers.length > 0 && (
              <div className="dt-path">
                {answers.map((a, i) => (
                  <div key={i} className="dt-path-row">
                    <span className="dt-path-q">{DT_QUESTIONS[i].q}</span>
                    <span className={`dt-path-ans ${a.val ? "yes" : "no"}`}>
                      {a.val ? <><CheckCircle size={12} /> Yes</> : <><XCircle size={12} /> No</>}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {!result ? (
              <div className="dt-question">
                <div className="dt-q-meta">Question {qIdx + 1} of {DT_QUESTIONS.length}</div>
                <h3 className="dt-q-text">{DT_QUESTIONS[qIdx].q}</h3>
                <div className="dt-btn-row">
                  <button className="btn btn-primary" onClick={() => handleAnswer(true)}>Yes</button>
                  <button className="btn btn-secondary" onClick={() => handleAnswer(false)}>No</button>
                </div>
              </div>
            ) : (
              <div className={`dt-result ${result.perfect ? "success" : "partial"}`}>
                <div className="dt-result-name">{current.name}</div>
                <p>{result.perfect ? "Perfect classification!" : `Matched ${result.correct} / ${result.total} features`}</p>
                <button className="btn btn-primary" onClick={startRound}>
                  <RefreshCw size={15} /> Next Animal
                </button>
              </div>
            )}
          </div>

          <div className="card dt-info">
            <h4>About Decision Trees</h4>
            <p>A Decision Tree classifies data by asking a series of yes/no questions called <strong>split conditions</strong>. Each branch leads toward a final prediction — the leaf node.</p>
            <div className="dt-key-concepts">
              <div className="dt-concept"><span className="dt-concept-dot" style={{ background: "#10b981" }} />Root Node — First split</div>
              <div className="dt-concept"><span className="dt-concept-dot" style={{ background: "#6366f1" }} />Internal Nodes — Decision points</div>
              <div className="dt-concept"><span className="dt-concept-dot" style={{ background: "#f59e0b" }} />Leaf Nodes — Final prediction</div>
            </div>
          </div>
        </div>
      )}
    </GameShell>
  );
}

/* ── NEURAL NET GAME ── */
function NeuralNetGame({ onBack }) {
  const [weights, setWeights] = useState({ w1: 0.5, w2: -0.3, bias: 0.1 });
  const [inputs, setInputs]   = useState({ x1: 1.0, x2: 0.5 });
  const canvasRef = useRef(null);

  const sigmoid = x => 1 / (1 + Math.exp(-x));
  const z = inputs.x1 * weights.w1 + inputs.x2 * weights.w2 + weights.bias;
  const output = sigmoid(z);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const nodes = { x1: { x: 70, y: 90 }, x2: { x: 70, y: 190 }, n: { x: 210, y: 140 }, out: { x: 350, y: 140 } };

    const drawLine = (from, to, label, col) => {
      ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();
      const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
      ctx.fillStyle = col; ctx.font = "10px JetBrains Mono";
      ctx.fillText(label, mx - 16, my - 5);
    };

    const posC = "rgba(99,102,241,0.8)", negC = "rgba(244,63,94,0.7)";
    drawLine(nodes.x1, nodes.n, "w1=" + weights.w1.toFixed(1), weights.w1 >= 0 ? posC : negC);
    drawLine(nodes.x2, nodes.n, "w2=" + weights.w2.toFixed(1), weights.w2 >= 0 ? posC : negC);
    drawLine(nodes.n, nodes.out, "sigmoid", posC);

    const drawNode = (pos, label, val, color) => {
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = "white"; ctx.font = "bold 11px Inter"; ctx.textAlign = "center";
      ctx.fillText(label, pos.x, pos.y - 3);
      if (val !== undefined) { ctx.font = "9px JetBrains Mono"; ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.fillText(val, pos.x, pos.y + 12); }
    };

    drawNode(nodes.x1, "x1", inputs.x1.toFixed(1), "rgba(34,211,238,0.55)");
    drawNode(nodes.x2, "x2", inputs.x2.toFixed(1), "rgba(34,211,238,0.55)");
    drawNode(nodes.n, "Σ+σ", null, "rgba(99,102,241,0.65)");
    drawNode(nodes.out, "Out", output.toFixed(3), output > 0.5 ? "rgba(16,185,129,0.65)" : "rgba(244,63,94,0.6)");
  }, [weights, inputs, output]);

  const controls = [
    { label: "Input x1",  key: "x1",   obj: "inputs"  },
    { label: "Input x2",  key: "x2",   obj: "inputs"  },
    { label: "Weight w1", key: "w1",   obj: "weights" },
    { label: "Weight w2", key: "w2",   obj: "weights" },
    { label: "Bias",      key: "bias", obj: "weights" },
  ];

  return (
    <GameShell title="Neural Network Trainer" score={0} total={0} onBack={onBack}>
      <div className="nn-layout">
        <div className="card nn-canvas-card">
          <h4 className="nn-section-title">Network Visualization</h4>
          <canvas ref={canvasRef} width={420} height={280} className="nn-canvas" />
          <div className={`nn-output-indicator ${output > 0.5 ? "class1" : "class0"}`}>
            Output: {output.toFixed(4)} — {output > 0.5 ? "Class 1" : "Class 0"}
          </div>
        </div>

        <div className="nn-controls-col">
          <div className="card">
            <h4 className="nn-section-title">Tune Parameters</h4>
            <div className="nn-sliders">
              {controls.map(c => {
                const val = (c.obj === "inputs" ? inputs : weights)[c.key];
                return (
                  <div key={c.key} className="nn-slider-row">
                    <div className="nn-slider-label">
                      <span>{c.label}</span>
                      <span className="nn-slider-val">{val.toFixed(2)}</span>
                    </div>
                    <input type="range" min={-2} max={2} step={0.1} value={val}
                      onChange={e => {
                        const v = parseFloat(e.target.value);
                        if (c.obj === "inputs") setInputs(p => ({ ...p, [c.key]: v }));
                        else setWeights(p => ({ ...p, [c.key]: v }));
                      }}
                      className="nn-range"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card nn-formula-card">
            <h4 className="nn-section-title">Computation</h4>
            <div className="nn-formulas">
              <div className="nn-formula-row"><span className="nn-f-label">z =</span><span className="nn-f-val">x1×w1 + x2×w2 + b</span></div>
              <div className="nn-formula-row"><span className="nn-f-label">z =</span><span className="nn-f-val">{z.toFixed(4)}</span></div>
              <div className="nn-formula-row"><span className="nn-f-label">σ(z) =</span><span className="nn-f-val">{output.toFixed(4)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </GameShell>
  );
}

/* ── CLASSIFY GAME ── */
const ITEMS = [
  { features: { Size: "Large",  Color: "Yellow", Shape: "Round"  }, label: "Lemon",    cat: "Citrus"   },
  { features: { Size: "Medium", Color: "Red",    Shape: "Round"  }, label: "Apple",    cat: "Pome"     },
  { features: { Size: "Large",  Color: "Orange", Shape: "Oval"   }, label: "Mango",    cat: "Drupe"    },
  { features: { Size: "Small",  Color: "Red",    Shape: "Round"  }, label: "Cherry",   cat: "Drupe"    },
  { features: { Size: "Large",  Color: "Green",  Shape: "Oval"   }, label: "Melon",    cat: "Melon"    },
  { features: { Size: "Small",  Color: "Purple", Shape: "Round"  }, label: "Grape",    cat: "Berry"    },
  { features: { Size: "Large",  Color: "Yellow", Shape: "Curved" }, label: "Banana",   cat: "Tropical" },
  { features: { Size: "Medium", Color: "Orange", Shape: "Round"  }, label: "Orange",   cat: "Citrus"   },
];
const CATEGORIES = ["Citrus", "Pome", "Drupe", "Melon", "Berry", "Tropical"];

function ClassifyGame({ onBack }) {
  const [item, setItem]       = useState(null);
  const [score, setScore]     = useState(0);
  const [rounds, setRounds]   = useState(0);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => { startRound(); }, []);

  const startRound = () => {
    setItem(ITEMS[Math.floor(Math.random() * ITEMS.length)]);
    setFeedback(null);
  };

  const handleGuess = (cat) => {
    const correct = cat === item.cat;
    if (correct) setScore(s => s + 1);
    setRounds(r => r + 1);
    setFeedback({ correct, category: item.cat, label: item.label });
  };

  return (
    <GameShell title="Classification Challenge" score={score} total={rounds} onBack={onBack}>
      {item && (
        <div className="cls-layout">
          <div className="card cls-main">
            <p className="cls-prompt">Classify this fruit by its features:</p>
            <div className="cls-features">
              {Object.entries(item.features).map(([k, v]) => (
                <div key={k} className="cls-feature-chip">
                  <span className="cls-feat-key">{k}</span>
                  <span className="cls-feat-val">{v}</span>
                </div>
              ))}
            </div>

            {!feedback ? (
              <div className="cls-options">
                {CATEGORIES.map(cat => (
                  <button key={cat} className="btn btn-secondary cls-opt" onClick={() => handleGuess(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            ) : (
              <div className={`cls-feedback ${feedback.correct ? "correct" : "wrong"}`}>
                <div className="cls-fb-icon">
                  {feedback.correct ? <CheckCircle size={24} /> : <XCircle size={24} />}
                </div>
                <div className="cls-fb-text">
                  <div className="cls-fb-title">{feedback.correct ? "Correct!" : "Not quite"}</div>
                  <div className="cls-fb-detail">{feedback.label} is a <strong>{feedback.category}</strong></div>
                </div>
                <button className="btn btn-primary" onClick={startRound}>
                  <RefreshCw size={15} /> Next Item
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </GameShell>
  );
}
