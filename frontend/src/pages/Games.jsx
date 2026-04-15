import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TreeDeciduous, Brain, Target, ChevronLeft, 
  CheckCircle, XCircle, Zap,
  Trophy
} from "lucide-react";
import "./Games.css";

const GAMES = [
  { 
    id: "decision-tree", 
    icon: TreeDeciduous, 
    title: "Pathfinder AI", 
    desc: "Navigate the classification tree. Find the correct leaf node by following the logical features of mystery data.",
    difficulty: "Beginner", 
    color: "#10b981" 
  },
  { 
    id: "neural-net", 
    icon: Brain, 
    title: "Synapse Sync", 
    desc: "Train a neuron to match target behaviors. Tune weights and bias to reach 99% accuracy.",
    difficulty: "Intermediate", 
    color: "#6366f1" 
  },
  { 
    id: "classify", 
    icon: Target, 
    title: "Data Sorter", 
    desc: "Rapid-fire feature classification. Sort incoming data into the correct model buckets before the buffer overflows.",
    difficulty: "Intermediate", 
    color: "#f59e0b" 
  },
];

export default function Games() {
  const [active, setActive] = useState(null);

  return (
    <div className="page-wrapper animate-fade-in">
      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div 
            key="lobby"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="page-header">
              <h1 className="page-title">Learning Games</h1>
              <p className="page-subtitle">Reinforce AI & ML concepts through interactive, high-fidelity challenges</p>
            </div>
            <div className="games-grid">
              {GAMES.map((g, i) => {
                const Icon = g.icon;
                return (
                  <motion.div 
                    key={g.id} 
                    className="game-card card card-interactive"
                    whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }}
                    onClick={() => setActive(g.id)}
                  >
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
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="game-runner"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {active === "decision-tree" && <PathfinderGame onBack={() => setActive(null)} />}
            {active === "neural-net" && <SynapseSyncGame onBack={() => setActive(null)} />}
            {active === "classify" && <DataSorterGame onBack={() => setActive(null)} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── GAME RUNNER SHELL ── */
function GameShell({ title, score, total, onBack, children }) {
  return (
    <div className="game-session">
      <div className="game-run-header">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <ChevronLeft size={15} /> Exit Game
        </button>
        <div className="game-run-title-wrap">
          <h2 className="game-run-title">{title}</h2>
          <div className="game-stat-pills">
            <div className="game-stat-pill score">
              <Trophy size={13} /> {score} pts
            </div>
            {total !== undefined && (
              <div className="game-stat-pill streak">
                <Zap size={13} /> Round {total}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="game-canvas-area">
        {children}
      </div>
    </div>
  );
}

/* ── PATHFINDER (DECISION TREE) ── */
const DATA_POINTS = [
  { name: "Polar Bear", fur: true, water: false, cold: true },
  { name: "Eagle", fur: false, water: false, cold: false },
  { name: "Dolphin", fur: false, water: true, cold: false },
  { name: "Lion", fur: true, water: false, cold: false },
  { name: "Penguin", fur: false, water: true, cold: true },
];

function PathfinderGame({ onBack }) {
  const [point, setPoint] = useState(null);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => { nextRound(); }, []);

  const nextRound = () => {
    setPoint(DATA_POINTS[Math.floor(Math.random() * DATA_POINTS.length)]);
    setLevel(0);
    setFeedback(null);
  };

  const handleChoice = (attr, value) => {
    const isCorrect = point[attr] === value;
    if (isCorrect) {
      if (level < 2) {
        setLevel(level + 1);
      } else {
        setScore(score + 100);
        setFeedback("correct");
        setRound(round + 1);
      }
    } else {
      setFeedback("wrong");
      setRound(round + 1);
    }
  };

  const levels = [
    { label: "Check: Has Fur?", attr: "fur" },
    { label: "Check: Lives in Water?", attr: "water" },
    { label: "Check: Is it Cold-blooded/Arctic?", attr: "cold" }
  ];

  return (
    <GameShell title="Pathfinder AI" score={score} total={round} onBack={onBack}>
      <div className="game-content-card card">
        {!feedback ? (
          <div className="pathfinder-game">
            <div className="game-goal-card">
              <span className="goal-label">Mystery Subject</span>
              <h3 className="goal-value">{point?.name}</h3>
            </div>
            
            <motion.div 
              className="path-visual"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <div className="tree-node active">
                <div className="node-content">
                  <span className="node-meta">Node {level + 1}</span>
                  <div className="node-question">{levels[level].label}</div>
                </div>
                <div className="node-actions">
                  <button className="btn btn-primary" onClick={() => handleChoice(levels[level].attr, true)}>YES</button>
                  <button className="btn btn-secondary" onClick={() => handleChoice(levels[level].attr, false)}>NO</button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className="game-result-overlay"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {feedback === "correct" ? (
              <div className="res-icon success"><CheckCircle size={48} /></div>
            ) : (
              <div className="res-icon failure"><XCircle size={48} /></div>
            )}
            <h2>{feedback === "correct" ? "Pattern Matched!" : "Path Diverged!"}</h2>
            <p>{feedback === "correct" ? "You successfully navigated the logic tree." : "The splitting logic didn't match the subject's features."}</p>
            <button className="btn btn-primary btn-lg" onClick={nextRound}>
              Next Subject
            </button>
          </motion.div>
        )}
      </div>
    </GameShell>
  );
}

/* ── SYNAPSE SYNC (NEURAL NET) ── */
function SynapseSyncGame({ onBack }) {
  const [params, setParams] = useState({ w: 0.5, b: -0.2 });
  const [target, setTarget] = useState(0);
  const [inputs, setInputs] = useState([0.8, -0.4]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isSynced, setIsSynced] = useState(false);

  const sigmoid = x => 1 / (1 + Math.exp(-x));
  const weightedSum = inputs[0] * params.w + params.b;
  const output = sigmoid(weightedSum);
  const accuracy = 100 - Math.abs(target - output) * 100;

  useEffect(() => { generateTarget(); }, []);

  const generateTarget = () => {
    const newTarget = Math.random() > 0.5 ? 1 : 0;
    setTarget(newTarget);
    setInputs([Math.random() * 2 - 1, Math.random() * 2 - 1]);
    setIsSynced(false);
  };

  const checkSync = () => {
    if (accuracy >= 98) {
      setScore(score + Math.floor(accuracy));
      setRound(round + 1);
      setIsSynced(true);
    }
  };

  return (
    <GameShell title="Synapse Sync" score={score} total={round} onBack={onBack}>
      <div className="sync-layout">
        <div className="card sync-main">
          <div className="sync-target-banner">
            <span className="target-label">Objective: Reach 99% Sync</span>
            <div className="target-val">Target Output: <strong>{target === 1 ? "ACTIVE (1)" : "IDLE (0)"}</strong></div>
          </div>
          
          <div className="neuron-viz">
            <div className="viz-input">Input: {inputs[0].toFixed(2)}</div>
            <motion.div 
              className="viz-core"
              animate={{ 
                scale: 1 + output * 0.2,
                backgroundColor: output > 0.5 ? "rgba(99,102,241,0.4)" : "rgba(244,63,94,0.3)" 
              }}
            >
              {Math.round(accuracy)}%
            </motion.div>
            <div className="viz-output">Output: {output.toFixed(3)}</div>
          </div>

          <div className="sync-controls">
            <div className="sync-slider">
              <div className="slider-info"><span>Weight</span> <span>{params.w.toFixed(2)}</span></div>
              <input type="range" min={-3} max={3} step={0.01} value={params.w} onChange={e => setParams(p => ({ ...p, w: parseFloat(e.target.value) }))} />
            </div>
            <div className="sync-slider">
              <div className="slider-info"><span>Bias</span> <span>{params.b.toFixed(2)}</span></div>
              <input type="range" min={-3} max={3} step={0.01} value={params.b} onChange={e => setParams(p => ({ ...p, b: parseFloat(e.target.value) }))} />
            </div>
          </div>

          <button className={`btn w-full btn-lg ${accuracy >= 98 ? "btn-primary" : "btn-secondary"}`} onClick={isSynced ? generateTarget : checkSync}>
            {isSynced ? "Next Challenge" : accuracy >= 98 ? "LOCK SYNAPSE" : "Tuning Required..."}
          </button>
        </div>

        <div className="card sync-info">
          <h3>Neural Logic</h3>
          <p>Training a neuron involves adjusting <strong>Weights</strong> (importance of input) and <strong>Bias</strong> (activation threshold) to minimize error.</p>
          <div className="sync-stats">
            <div className="sync-stat"><span>Weighted Sum:</span> <strong>{weightedSum.toFixed(3)}</strong></div>
            <div className="sync-stat"><span>Activation:</span> <strong>Sigmoid</strong></div>
          </div>
        </div>
      </div>
    </GameShell>
  );
}

/* ── DATA SORTER (CLASSIFICATION) ── */
const SORT_ITEMS = [
  { n: "Email: 'Win free cash!'", c: "Spam" },
  { n: "Email: 'Project Meeting'", c: "Ham" },
  { n: "Email: 'Urgent! Prize!'", c: "Spam" },
  { n: "Email: 'Lunch tomorrow?'", c: "Ham" },
  { n: "Email: 'Click for Bonus'", c: "Spam" },
  { n: "Email: 'Doc Review'", c: "Ham" },
];

function DataSorterGame({ onBack }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleSort = (choice) => {
    const isCorrect = SORT_ITEMS[current].c === choice;
    if (isCorrect) {
      setScore(score + 50);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setFeedback(null);
      if (current < SORT_ITEMS.length - 1) {
        setCurrent(current + 1);
      } else {
        setGameOver(true);
      }
    }, 600);
  };

  return (
    <GameShell title="Data Sorter" score={score} onBack={onBack}>
      <div className="sorter-layout">
        {!gameOver ? (
          <div className="sorter-area">
            <AnimatePresence mode="wait">
              <motion.div 
                key={current}
                className={`sorter-card card ${feedback}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ x: feedback === "correct" ? 100 : -100, opacity: 0 }}
              >
                <div className="sorter-icon"><Target size={32} /></div>
                <h3>{SORT_ITEMS[current].n}</h3>
                <p>Classify this data point immediately</p>
              </motion.div>
            </AnimatePresence>

            <div className="sorter-actions">
              <button className="btn btn-secondary sorter-btn" onClick={() => handleSort("Ham")}>HAM (Safe)</button>
              <button className="btn btn-primary sorter-btn" onClick={() => handleSort("Spam")}>SPAM (Alert)</button>
            </div>
          </div>
        ) : (
          <div className="card game-result-overlay">
            <Trophy size={64} color="var(--accent-amber)" />
            <h2>Buffer Complete!</h2>
            <p>You sorted the dataset with a final score of <strong>{score}</strong>.</p>
            <button className="btn btn-primary btn-lg" onClick={() => { setCurrent(0); setScore(0); setGameOver(false); }}>
              Reset Buffer
            </button>
          </div>
        )}
      </div>
    </GameShell>
  );
}
