import { useState, useEffect, useRef } from "react";
import "./Games.css";

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: "decision-tree",
      title: "Decision Tree Builder",
      icon: "🌳",
      desc: "Classify animals by answering yes/no questions. Visualize the decision path in real-time.",
      difficulty: "Beginner",
    },
    {
      id: "neural-net",
      title: "Neural Network Trainer",
      icon: "🧠",
      desc: "Tune weights and biases to classify points. Watch the network learn!",
      difficulty: "Intermediate",
    },
    {
      id: "classify-guess",
      title: "Classification Challenge",
      icon: "🎯",
      desc: "Guess which category a data point belongs to based on its features.",
      difficulty: "Beginner",
    },
  ];

  if (activeGame === "decision-tree") return <DecisionTreeGame onBack={() => setActiveGame(null)} />;
  if (activeGame === "neural-net")   return <NeuralNetGame onBack={() => setActiveGame(null)} />;
  if (activeGame === "classify-guess") return <ClassifyGame onBack={() => setActiveGame(null)} />;

  return (
    <div className="games-page animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">🎮 Learning Games</h1>
        <p className="page-subtitle">Learn AIML concepts through interactive mini-games</p>
      </div>
      <div className="games-grid">
        {games.map((g, i) => (
          <div key={g.id} className={`game-card glass-card animate-fade-in-up delay-${i + 1}`}>
            <div className="game-card-icon">{g.icon}</div>
            <h3 className="game-card-title">{g.title}</h3>
            <p className="game-card-desc">{g.desc}</p>
            <div className="game-meta">
              <span className={`badge ${g.difficulty === "Beginner" ? "badge-green" : "badge-amber"}`}>
                {g.difficulty}
              </span>
            </div>
            <button className="btn btn-primary game-play-btn" onClick={() => setActiveGame(g.id)}>
              🎮 Play Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== GAME 1: Decision Tree =====
function DecisionTreeGame({ onBack }) {
  const animals = [
    { name: "🐬 Dolphin",  hasFur: false, canFly: false, livesInWater: true,  mammal: true },
    { name: "🦅 Eagle",    hasFur: false, canFly: true,  livesInWater: false, mammal: false },
    { name: "🐘 Elephant", hasFur: false, canFly: false, livesInWater: false, mammal: true },
    { name: "🦁 Lion",     hasFur: true,  canFly: false, livesInWater: false, mammal: true },
    { name: "🐠 Clownfish",hasFur: false, canFly: false, livesInWater: true,  mammal: false },
    { name: "🦋 Butterfly",hasFur: false, canFly: true,  livesInWater: false, mammal: false },
    { name: "🐺 Wolf",     hasFur: true,  canFly: false, livesInWater: false, mammal: true },
    { name: "🦆 Duck",     hasFur: false, canFly: true,  livesInWater: false, mammal: false },
  ];

  const questions = [
    { q: "Does it have fur?",        key: "hasFur" },
    { q: "Can it fly?",              key: "canFly" },
    { q: "Does it live in water?",   key: "livesInWater" },
    { q: "Is it a mammal?",          key: "mammal" },
  ];

  const [current, setCurrent] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);

  const startRound = () => {
    const a = animals[Math.floor(Math.random() * animals.length)];
    setCurrent(a);
    setQIdx(0);
    setAnswers([]);
    setResult(null);
  };

  useEffect(() => { startRound(); }, []);

  const handleAnswer = (val) => {
    const newAnswers = [...answers, { key: questions[qIdx].key, val }];
    setAnswers(newAnswers);
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
    } else {
      // Score based on answers matching the animal
      const correct = newAnswers.filter(a => current[a.key] === a.val).length;
      const gotIt = correct === questions.length;
      setResult({ gotIt, correct, total: questions.length });
      setRounds(r => r + 1);
      if (gotIt) setScore(s => s + 1);
    }
  };

  return (
    <div className="game-runner animate-fade-in">
      <div className="game-runner-header">
        <button className="btn btn-ghost" onClick={onBack}>← Back to Games</button>
        <h2>🌳 Decision Tree Builder</h2>
        <div className="game-score-badge">Score: {score}/{rounds}</div>
      </div>

      {current && (
        <div className="dt-game glass-card">
          <div className="dt-animal-reveal">
            <div className="dt-secret">🎭 Mystery Animal</div>
            <p className="dt-instructions">Answer yes/no questions to reveal the decision path!</p>
          </div>

          <div className="dt-path">
            {answers.map((a, i) => (
              <div key={i} className="dt-path-node">
                <span className="dt-q">{questions[i].q}</span>
                <span className={`dt-ans ${a.val ? "yes" : "no"}`}>{a.val ? "Yes ✓" : "No ✗"}</span>
              </div>
            ))}
          </div>

          {!result ? (
            <div className="dt-question-box">
              <div className="dt-q-number">Question {qIdx + 1} of {questions.length}</div>
              <h3 className="dt-q-text">{questions[qIdx].q}</h3>
              <div className="dt-buttons">
                <button className="btn btn-primary" onClick={() => handleAnswer(true)}>✅ Yes</button>
                <button className="btn btn-secondary" onClick={() => handleAnswer(false)}>❌ No</button>
              </div>
            </div>
          ) : (
            <div className={`dt-result ${result.gotIt ? "success" : "fail"}`}>
              <div className="dt-animal-name">{current.name}</div>
              <div className="dt-result-msg">
                {result.gotIt ? "🎉 Perfect Classification!" : `📊 Matched ${result.correct}/${result.total} features`}
              </div>
              <button className="btn btn-primary" onClick={startRound}>Next Animal →</button>
            </div>
          )}
        </div>
      )}

      <div className="game-concept-card glass-card">
        <h3>💡 About Decision Trees</h3>
        <p>A Decision Tree classifies data by asking a series of yes/no questions (splitting on features) until reaching a leaf node — the final prediction. Each question is called a <strong>split condition</strong>.</p>
      </div>
    </div>
  );
}

// ===== GAME 2: Neural Net Visualizer =====
function NeuralNetGame({ onBack }) {
  const [weights, setWeights] = useState({ w1: 0.5, w2: -0.3, bias: 0.1 });
  const [inputs, setInputs] = useState({ x1: 1.0, x2: 0.5 });
  const canvasRef = useRef(null);

  const sigmoid = (x) => 1 / (1 + Math.exp(-x));
  const output = sigmoid(inputs.x1 * weights.w1 + inputs.x2 * weights.w2 + weights.bias);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Nodes
    const nodes = {
      x1:  { x: 80,  y: 100 },
      x2:  { x: 80,  y: 200 },
      n:   { x: 220, y: 150 },
      out: { x: 360, y: 150 },
    };

    // Draw connections
    const drawLine = (from, to, label, color) => {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      // Label
      const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
      ctx.fillStyle = color;
      ctx.font = "11px JetBrains Mono";
      ctx.fillText(label, mx - 20, my - 6);
    };

    const posColor = "rgba(108,99,255,0.8)";
    const negColor = "rgba(239,68,68,0.7)";

    drawLine(nodes.x1, nodes.n, `w1=${weights.w1.toFixed(1)}`, weights.w1 >= 0 ? posColor : negColor);
    drawLine(nodes.x2, nodes.n, `w2=${weights.w2.toFixed(1)}`, weights.w2 >= 0 ? posColor : negColor);
    drawLine(nodes.n, nodes.out, `σ`, posColor);

    // Draw nodes
    const drawNode = (pos, label, value, color) => {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 26, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "bold 11px Inter";
      ctx.textAlign = "center";
      ctx.fillText(label, pos.x, pos.y - 4);
      if (value !== undefined) {
        ctx.font = "10px JetBrains Mono";
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fillText(value, pos.x, pos.y + 12);
      }
    };

    drawNode(nodes.x1, "x1", inputs.x1.toFixed(1), "rgba(34,211,238,0.6)");
    drawNode(nodes.x2, "x2", inputs.x2.toFixed(1), "rgba(34,211,238,0.6)");
    drawNode(nodes.n, "Σ+σ", null, "rgba(108,99,255,0.7)");
    drawNode(nodes.out, "Out", output.toFixed(3), output > 0.5 ? "rgba(16,185,129,0.7)" : "rgba(239,68,68,0.6)");

  }, [weights, inputs, output]);

  return (
    <div className="game-runner animate-fade-in">
      <div className="game-runner-header">
        <button className="btn btn-ghost" onClick={onBack}>← Back to Games</button>
        <h2>🧠 Neural Network Trainer</h2>
        <div className={`game-score-badge ${output > 0.5 ? "green" : "red"}`}>
          Output: {output.toFixed(3)} {output > 0.5 ? "→ Class 1" : "→ Class 0"}
        </div>
      </div>

      <div className="nn-layout">
        <div className="nn-canvas-card glass-card">
          <h3>Network Visualization</h3>
          <canvas ref={canvasRef} width={440} height={300} className="nn-canvas" />
        </div>

        <div className="nn-controls glass-card">
          <h3>Tune Parameters</h3>
          <div className="nn-controls-list">
            {[
              { label: "Input x1", key: "x1", obj: "inputs", min: -2, max: 2 },
              { label: "Input x2", key: "x2", obj: "inputs", min: -2, max: 2 },
              { label: "Weight w1", key: "w1", obj: "weights", min: -2, max: 2 },
              { label: "Weight w2", key: "w2", obj: "weights", min: -2, max: 2 },
              { label: "Bias",      key: "bias", obj: "weights", min: -2, max: 2 },
            ].map(ctrl => (
              <div key={ctrl.key} className="nn-control">
                <div className="nn-control-label">
                  <span>{ctrl.label}</span>
                  <span className="nn-val">{(ctrl.obj === "inputs" ? inputs : weights)[ctrl.key].toFixed(2)}</span>
                </div>
                <input
                  type="range" min={ctrl.min} max={ctrl.max} step={0.1}
                  value={(ctrl.obj === "inputs" ? inputs : weights)[ctrl.key]}
                  onChange={e => {
                    const v = parseFloat(e.target.value);
                    if (ctrl.obj === "inputs") setInputs(p => ({ ...p, [ctrl.key]: v }));
                    else setWeights(p => ({ ...p, [ctrl.key]: v }));
                  }}
                  className="nn-slider"
                />
              </div>
            ))}
          </div>

          <div className="nn-math-box">
            <div className="nn-formula">z = x1×w1 + x2×w2 + b</div>
            <div className="nn-formula">z = {(inputs.x1 * weights.w1 + inputs.x2 * weights.w2 + weights.bias).toFixed(3)}</div>
            <div className="nn-formula">σ(z) = {output.toFixed(4)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== GAME 3: Classification Challenge =====
function ClassifyGame({ onBack }) {
  const dataset = [
    { features: { size: "Large", color: "Yellow", shape: "Round" },   label: "🍋 Lemon",   cat: "Citrus" },
    { features: { size: "Medium", color: "Red", shape: "Round" },     label: "🍎 Apple",   cat: "Pome" },
    { features: { size: "Large", color: "Orange", shape: "Oval" },    label: "🥭 Mango",   cat: "Drupe" },
    { features: { size: "Small", color: "Red", shape: "Round" },      label: "🍒 Cherry",  cat: "Drupe" },
    { features: { size: "Large", color: "Green", shape: "Oval" },     label: "🍈 Melon",   cat: "Melon" },
    { features: { size: "Small", color: "Purple", shape: "Round" },   label: "🍇 Grape",   cat: "Berry" },
    { features: { size: "Large", color: "Yellow", shape: "Curved" },  label: "🍌 Banana",  cat: "Tropical" },
    { features: { size: "Medium", color: "Orange", shape: "Round" },  label: "🍊 Orange",  cat: "Citrus" },
  ];

  const categories = ["Citrus", "Pome", "Drupe", "Melon", "Berry", "Tropical"];
  const [item, setItem] = useState(null);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const startRound = () => {
    const d = dataset[Math.floor(Math.random() * dataset.length)];
    setItem(d);
    setFeedback(null);
  };

  useEffect(() => { startRound(); }, []);

  const handleGuess = (cat) => {
    const correct = cat === item.cat;
    if (correct) setScore(s => s + 1);
    setRounds(r => r + 1);
    setFeedback({ correct, answer: item.label, category: item.cat });
  };

  return (
    <div className="game-runner animate-fade-in">
      <div className="game-runner-header">
        <button className="btn btn-ghost" onClick={onBack}>← Back to Games</button>
        <h2>🎯 Classification Challenge</h2>
        <div className="game-score-badge">Score: {score}/{rounds}</div>
      </div>

      {item && (
        <div className="classify-game glass-card">
          <h3 className="classify-q">Classify this fruit by its features:</h3>
          <div className="feature-display">
            {Object.entries(item.features).map(([k, v]) => (
              <div key={k} className="feature-chip">
                <span className="feature-key">{k}</span>
                <span className="feature-val">{v}</span>
              </div>
            ))}
          </div>

          {!feedback ? (
            <div className="classify-options">
              {categories.map(cat => (
                <button key={cat} className="classify-btn btn btn-secondary" onClick={() => handleGuess(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          ) : (
            <div className={`classify-feedback ${feedback.correct ? "correct" : "wrong"}`}>
              <div className="classify-reveal">{feedback.answer}</div>
              <div className="classify-result-msg">
                {feedback.correct ? "🎉 Correct!" : `❌ It was ${feedback.category}`}
              </div>
              <button className="btn btn-primary" onClick={startRound}>Next Item →</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
