import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import "./Playground.css";

const SAMPLES = [
  {
    label: "Hello AI",
    code:
"# Welcome to the LearNova Playground!\n" +
"# Run AIML Python-style code here\n" +
"\n" +
"def greet(name):\n" +
'    return "Hello, " + name + "! Welcome to AI learning."\n' +
"\n" +
'message = greet("Learner")\n' +
"print(message)\n" +
'print("Lets explore Artificial Intelligence together!")\n',
  },
  {
    label: "Linear Regression",
    code:
"# Simple Linear Regression Simulation\n" +
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
"# K-Nearest Neighbors Concept\n" +
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
"# Simple Spam Detection using keywords\n" +
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
'    "Please find the attached project report for your review.",\n' +
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

// Pseudocode Python interpreter (browser-safe simulation)
function runPseudoPython(code) {
  const lines = [];
  const fakeScope = {
    math: { exp: Math.exp },
  };

  // We execute via Function() as a safe JS-like environment
  // Transform simple Python to JS
  let js = code
    .replace(/^#.*$/gm, "")                         // strip comments
    .replace(/def (\w+)\((.*?)\):/g, "function $1($2){")
    .replace(/elif /g, "else if ")
    .replace(/True/g, "true").replace(/False/g, "false").replace(/None/g, "null")
    .replace(/print\((.*?)\)/g, "__out__($1)")
    .replace(/f"(.*?)"/g, (_, s) => {
      return "`" + s.replace(/\{(.*?)\}/g, "${$1}") + "`";
    })
    .replace(/range\((\d+),\s*(\d+)\)/g, "Array.from({length:$2-$1},(_,i)=>i+$1)")
    .replace(/range\((\d+)\)/g, "Array.from({length:$1},(_,i)=>i)")
    .replace(/for (\w+) in (.*?):/g, "for (let $1 of $2){")
    .replace(/\.format\((.*?)\)/g, "")
    .replace(/import math/g, "")
    .replace(/\babs\b/g, "Math.abs")
    .replace(/\bmax\b\(([^,]+),\s*([^)]+)\)/g, "Math.max($1,$2)")
    .replace(/\bmin\b\(([^)]+)\)/g, "Math.min($1)")
    .replace(/\bround\b\(([^,]+),\s*(\d+)\)/g, "(Math.round($1*Math.pow(10,$2))/Math.pow(10,$2))")
    .replace(/\blen\b\((.*?)\)/g, "($1).length")
    .replace(/^\s{4}/gm, "");

  // Fix block endings (Python indentation → JS braces)
  // Simple approach: add } before de-indented lines
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
    lines.push(`⚠️ Execution note: ${e.message}\n(Tip: This playground simulates Python syntax)`);
  }
  return lines.join("\n") || "(no output)";
}

export default function Playground() {
  const [selectedSample, setSelectedSample] = useState(0);
  const [code, setCode] = useState(SAMPLES[0].code);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setOutput("");
    setTimeout(() => {
      const result = runPseudoPython(code);
      setOutput(result);
      setRunning(false);
    }, 400);
  };

  const handleSampleChange = (i) => {
    setSelectedSample(i);
    setCode(SAMPLES[i].code);
    setOutput("");
  };

  return (
    <div className="playground animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">💻 Code Playground</h1>
        <p className="page-subtitle">Write & run Python-style AIML code right in your browser</p>
      </div>

      {/* Sample selector */}
      <div className="sample-tabs">
        {SAMPLES.map((s, i) => (
          <button
            key={s.label}
            className={`sample-tab ${selectedSample === i ? "active" : ""}`}
            onClick={() => handleSampleChange(i)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="playground-layout">
        {/* Editor */}
        <div className="editor-panel glass-card">
          <div className="editor-header">
            <div className="editor-dots">
              <span className="edot red" />
              <span className="edot amber" />
              <span className="edot green" />
            </div>
            <span className="editor-label">main.py</span>
            <button className="btn btn-primary btn-sm run-btn" onClick={handleRun} disabled={running}>
              {running ? "▶ Running..." : "▶ Run Code"}
            </button>
          </div>
          <Editor
            height="420px"
            defaultLanguage="python"
            value={code}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              minimap: { enabled: false },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              renderLineHighlight: "line",
              suggestOnTriggerCharacters: true,
            }}
          />
        </div>

        {/* Output */}
        <div className="output-panel glass-card">
          <div className="output-header">
            <span>📤 Output</span>
            {output && (
              <button className="btn btn-ghost btn-sm" onClick={() => setOutput("")}>Clear</button>
            )}
          </div>
          <div className="output-content">
            {running && (
              <div className="output-running">
                <div className="spinner" style={{ width: 24, height: 24 }} />
                <span>Executing...</span>
              </div>
            )}
            {!running && output && (
              <pre className="output-text">{output}</pre>
            )}
            {!running && !output && (
              <div className="output-placeholder">
                <span>🚀</span>
                <p>Hit <strong>Run Code</strong> to see the output here</p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="playground-tips">
            <div className="tip-title">💡 Playground Tips</div>
            <ul className="tip-list">
              <li>Use <code>print()</code> to display output</li>
              <li>Select samples above to load AIML examples</li>
              <li>Supports basic Python syntax for learning</li>
              <li>Practice Decision Trees, KNN, and Neural Nets</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
