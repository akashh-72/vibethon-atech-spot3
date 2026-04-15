import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Copy, CheckCheck, Terminal, Code2, ChevronDown } from "lucide-react";
import "./Playground.css";

const SAMPLES = [
  {
    label: "Hello AI",
    code:
"# Welcome to the LearNova Playground!\n" +
"# Run Python-style AIML code here\n" +
"\n" +
"def greet(name):\n" +
'    return "Hello, " + name + "! Welcome to AI learning."\n' +
"\n" +
'message = greet("Learner")\n' +
"print(message)\n" +
'print("Lets explore AI together!")\n',
  },
  {
    label: "Linear Regression",
    code:
"# Simple Linear Regression\n" +
"# y = mx + b\n" +
"\n" +
"def predict(x, m=200, b=50000):\n" +
"    return m * x + b\n" +
"\n" +
"house_sizes = [800, 1200, 1500, 2000, 2500]\n" +
'print("House Price Predictions:")\n' +
'print("-" * 35)\n' +
"for size in house_sizes:\n" +
"    price = predict(size)\n" +
'    print(str(size) + " sqft -> $" + str(price))\n',
  },
  {
    label: "KNN Classifier",
    code:
"# K-Nearest Neighbors\n" +
"def euclidean_distance(a, b):\n" +
"    return abs(a - b)\n" +
"\n" +
"dataset = [\n" +
'    (1.0, "Setosa"),\n' +
'    (1.5, "Setosa"),\n' +
'    (4.0, "Versicolor"),\n' +
'    (4.5, "Versicolor"),\n' +
'    (7.0, "Virginica"),\n' +
"]\n" +
"\n" +
"def knn(new_point, k=3):\n" +
"    dists = [(euclidean_distance(new_point, p), label) for p, label in dataset]\n" +
"    dists.sort()\n" +
"    k_near = [label for _, label in dists[:k]]\n" +
"    return max(set(k_near), key=k_near.count)\n" +
"\n" +
"test_points = [1.2, 4.3, 6.8]\n" +
"for pt in test_points:\n" +
"    prediction = knn(pt)\n" +
'    print("Point " + str(pt) + " -> Predicted: " + prediction)\n',
  },
  {
    label: "Neural Neuron",
    code:
"# Single Neuron Simulation\n" +
"import math\n" +
"\n" +
"def sigmoid(x):\n" +
"    return 1 / (1 + math.exp(-x))\n" +
"\n" +
"def relu(x):\n" +
"    return max(0, x)\n" +
"\n" +
'def neuron(inputs, weights, bias, activation="sigmoid"):\n' +
"    total = 0\n" +
"    for i in range(len(inputs)):\n" +
"        total = total + inputs[i] * weights[i]\n" +
"    weighted_sum = total + bias\n" +
'    print("Weighted Sum: " + str(round(weighted_sum, 4)))\n' +
'    if activation == "sigmoid":\n' +
"        out = sigmoid(weighted_sum)\n" +
"    else:\n" +
"        out = relu(weighted_sum)\n" +
'    print("Output (" + activation + "): " + str(round(out, 4)))\n' +
"    return out\n" +
"\n" +
'print("=== Sigmoid Activation ===")\n' +
"neuron([0.5, 0.8, 0.3], [0.4, -0.6, 0.9], bias=0.1)\n" +
"\n" +
'print("=== ReLU Activation ===")\n' +
'neuron([1.0, -0.5, 0.7], [0.3, 0.8, -0.4], bias=-0.2, activation="relu")\n',
  },
  {
    label: "Spam Detector",
    code:
"# Spam Detection\n" +
"\n" +
"SPAM_KEYWORDS = [\n" +
'    "free", "win", "winner", "click here", "limited offer",\n' +
'    "congratulations", "prize", "claim now", "urgent", "cash"\n' +
"]\n" +
"\n" +
"def detect_spam(email_text):\n" +
"    text_lower = email_text.lower()\n" +
"    found = [kw for kw in SPAM_KEYWORDS if kw in text_lower]\n" +
"    score = len(found) / len(SPAM_KEYWORDS)\n" +
'    label = "SPAM" if score > 0.15 else "NOT SPAM"\n' +
"    return label, found, round(score * 100, 1)\n" +
"\n" +
"emails = [\n" +
'    "Congratulations! You win a free prize! Click here to claim now!",\n' +
'    "Hey, are we still meeting for lunch tomorrow?",\n' +
'    "URGENT: Free winner cash offer - limited offer only!",\n' +
'    "Please find the attached project report for review.",\n' +
"]\n" +
"\n" +
"for i, email in enumerate(emails):\n" +
"    label, keywords, score = detect_spam(email)\n" +
'    print("Email " + str(i+1) + ": " + label + " (score: " + str(score) + "%)")\n' +
"    if keywords:\n" +
'        print("  Keywords found: " + str(keywords))\n' +
"    print()\n",
  },
];

function runPseudoPython(code) {
  const lines = [];
  const fakeScope = { math: { exp: Math.exp } };

  let js = code
    .replace(/^#.*$/gm, "")
    .replace(/def (\w+)\((.*?)\):/g, "function $1($2){")
    .replace(/elif /g, "else if ")
    .replace(/True/g, "true").replace(/False/g, "false").replace(/None/g, "null")
    .replace(/print\((.*?)\)/g, "__out__($1)")
    .replace(/range\((\d+),\s*(\d+)\)/g, "Array.from({length:$2-$1},(_,i)=>i+$1)")
    .replace(/range\((\d+)\)/g, "Array.from({length:$1},(_,i)=>i)")
    .replace(/for (\w+) in (.*?):/g, "for (let $1 of $2){")
    .replace(/import math/g, "")
    .replace(/\babs\b/g, "Math.abs")
    .replace(/\bmax\b\(([^,]+),\s*([^)]+)\)/g, "Math.max($1,$2)")
    .replace(/\bmin\b\(([^)]+)\)/g, "Math.min($1)")
    .replace(/\bround\b\(([^,]+),\s*(\d+)\)/g, "(Math.round($1*Math.pow(10,$2))/Math.pow(10,$2))")
    .replace(/\blen\b\((.*?)\)/g, "($1).length")
    .replace(/^\s{4}/gm, "");

  const processedLines = js.split("\n");
  const result = [];
  const indentStack = [0];
  for (let i = 0; i < processedLines.length; i++) {
    const line = processedLines[i];
    const trimmed = line.trim();
    if (!trimmed) { result.push(""); continue; }
    const indent = line.search(/\S/);
    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      result.push("}");
      indentStack.pop();
    }
    if (trimmed.endsWith("{")) indentStack.push(indent + 4);
    result.push(line);
  }
  while (indentStack.length > 1) { result.push("}"); indentStack.pop(); }
  js = result.join("\n");

  try {
    new Function("__out__", "math", "Math", js)(
      (v) => lines.push(String(v)),
      fakeScope.math,
      Math
    );
  } catch (e) {
    lines.push(`Error: ${e.message}`);
  }
  return lines.join("\n") || "(no output)";
}

export default function Playground() {
  const [selectedSample, setSelectedSample] = useState(0);
  const [code, setCode]     = useState(SAMPLES[0].code);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied]   = useState(false);

  const handleRun = () => {
    setRunning(true);
    setOutput("");
    setTimeout(() => {
      setOutput(runPseudoPython(code));
      setRunning(false);
    }, 500);
  };

  const handleSampleChange = (i) => {
    setSelectedSample(i);
    setCode(SAMPLES[i].code);
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Code Playground</h1>
            <p className="page-subtitle">Write and execute Python-style AI/ML code directly in your browser</p>
          </div>
          <div className="pg-sample-tabs">
            {SAMPLES.map((s, i) => (
              <button
                key={s.label}
                className={`filter-tab ${selectedSample === i ? "active" : ""}`}
                onClick={() => handleSampleChange(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pg-layout">
        {/* Editor */}
        <div className="pg-editor-panel card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="pg-editor-header">
            <div className="pg-window-dots">
              <div className="pg-dot pg-dot-red" />
              <div className="pg-dot pg-dot-amber" />
              <div className="pg-dot pg-dot-green" />
            </div>
            <span className="pg-filename">
              <Code2 size={13} />
              main.py
            </span>
            <div className="pg-editor-actions">
              <button className="btn btn-icon btn-icon-sm" onClick={handleCopy} title="Copy code">
                {copied ? <CheckCheck size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
              </button>
              <button className="btn btn-icon btn-icon-sm" onClick={() => { setCode(""); setOutput(""); }} title="Clear">
                <RotateCcw size={14} />
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleRun} disabled={running}>
                <Play size={13} fill="currentColor" />
                {running ? "Running..." : "Run Code"}
              </button>
            </div>
          </div>
          <Editor
            height="460px"
            defaultLanguage="python"
            value={code}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            options={{
              fontSize: 13.5,
              fontFamily: "'JetBrains Mono', monospace",
              minimap: { enabled: false },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              renderLineHighlight: "line",
              cursorBlinking: "smooth",
              letterSpacing: 0.3,
              lineHeight: 22,
              roundedSelection: true,
            }}
          />
        </div>

        {/* Output */}
        <div className="pg-output-panel">
          <div className="card" style={{ height: "100%", padding: 0, overflow: "hidden" }}>
            <div className="pg-output-header">
              <div className="pg-output-label">
                <Terminal size={14} />
                <span>Output</span>
              </div>
              {output && (
                <button className="btn btn-ghost btn-sm" onClick={() => setOutput("")}>
                  Clear
                </button>
              )}
            </div>
            <div className="pg-output-body">
              {running && (
                <div className="pg-running">
                  <div className="spinner" style={{ width: 20, height: 20 }} />
                  <span>Executing...</span>
                </div>
              )}
              {!running && output && <pre className="pg-output-text">{output}</pre>}
              {!running && !output && (
                <div className="pg-output-empty">
                  <Play size={20} className="pg-play-hint" />
                  <p>Press <strong>Run Code</strong> to see output</p>
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="pg-tips card card-sm">
            <div className="pg-tips-title">Quick Reference</div>
            <div className="pg-tips-list">
              <div className="pg-tip"><code>print()</code> — display values</div>
              <div className="pg-tip"><code>for x in list:</code> — iteration</div>
              <div className="pg-tip"><code>def fn(args):</code> — functions</div>
              <div className="pg-tip"><code>import math</code> — math library</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
