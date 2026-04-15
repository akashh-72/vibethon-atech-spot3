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
"# Simple Linear Regression: y = mx + b\n" +
"\n" +
"def predict(x, m=200, b=50000):\n" +
"    return m * x + b\n" +
"\n" +
"house_sizes = [800, 1200, 1500, 2000, 2500]\n" +
'print("House Price Predictions:")\n' +
'print("-" * 30)\n' +
"\n" +
"for size in house_sizes:\n" +
"    price = predict(size)\n" +
'    print("Size: " + str(size) + " sqft -> Price: $" + str(price))\n',
  },
  {
    label: "KNN Classifier",
    code:
"# K-Nearest Neighbors Simulation\n" +
"def euclidean_distance(a, b):\n" +
"    return abs(a - b)\n" +
"\n" +
"dataset = [\n" +
'    [1.0, "Setosa"],\n' +
'    [1.5, "Setosa"],\n' +
'    [4.0, "Versicolor"],\n' +
'    [4.5, "Versicolor"],\n' +
'    [7.0, "Virginica"]\n' +
"]\n" +
"\n" +
"def knn(new_point, k=3):\n" +
"    dists = []\n" +
"    for pt in dataset:\n" +
"        d = euclidean_distance(new_point, pt[0])\n" +
"        dists.append([d, pt[1]])\n" +
"    \n" +
"    dists.sort()\n" +
"    \n" +
"    # Vote for the most frequent label in top-k\n" +
"    votes = {}\n" +
"    for i in range(k):\n" +
"        label = dists[i][1]\n" +
"        votes[label] = votes.get(label, 0) + 1\n" +
"    \n" +
"    best_label = None\n" +
"    max_votes = -1\n" +
"    for label in votes:\n" +
"        if votes[label] > max_votes:\n" +
"            max_votes = votes[label]\n" +
"            best_label = label\n" +
"    return best_label\n" +
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
'def neuron(inputs, weights, bias):\n' +
"    total = 0\n" +
"    for i in range(len(inputs)):\n" +
"        total = total + (inputs[i] * weights[i])\n" +
"    \n" +
"    weighted_sum = total + bias\n" +
'    print("Weighted Sum: " + str(round(weighted_sum, 4)))\n' +
"    output = sigmoid(weighted_sum)\n" +
'    print("Neuron Output: " + str(round(output, 4)))\n' +
"    return output\n" +
"\n" +
'print("Running Single Neuron Mockup...")\n' +
"neuron([0.5, 0.8, 0.3], [0.4, -0.6, 0.9], bias=0.1)\n",
  },
  {
    label: "Spam Detector",
    code:
"# Simple Keyword-Based Spam Detection\n" +
"\n" +
"KEYWORDS = [\"free\", \"win\", \"claim\", \"cash\", \"urgent\"]\n" +
"\n" +
"def detect_spam(text):\n" +
"    text_lower = text.lower()\n" +
"    found = []\n" +
"    for kw in KEYWORDS:\n" +
"        if kw in text_lower:\n" +
"            found.append(kw)\n" +
"    \n" +
"    score = len(found) / len(KEYWORDS)\n" +
'    is_spam = "SPAM" if score > 0.1 else "NOT SPAM"\n' +
"    return is_spam, found\n" +
"\n" +
'email = "URGENT: Click here to claim your free cash prize!"\n' +
"label, words = detect_spam(email)\n" +
'print("Analyzing: " + email)\n' +
'print("Classification: " + label)\n' +
'print("Keywords Found: " + str(words))\n',
  },
];

function runPseudoPython(code) {
  const lines = [];
  
  // Custom scope with Python-like helpers
  const fakeScope = {
    math: { 
      exp: Math.exp, 
      pi: Math.PI, 
      sqrt: Math.sqrt,
      sin: Math.sin,
      cos: Math.cos
    },
    str: (v) => String(v),
    int: (v) => Math.floor(Number(v)),
    round: (v, n) => Number(v).toFixed(n || 0),
    abs: Math.abs,
    len: (v) => (v ? v.length : 0),
    print: (...args) => lines.push(args.join(" ")),
    __out__: (v) => lines.push(String(v)),
  };

  // Simple string multiplication transformer: "str" * n -> "str".repeat(n)
  let transformedCode = code
    .replace(/^#.*$/gm, "") // Remove comments
    .replace(/"(.*?)"\s*\*\s*(\d+)/g, '"$1".repeat($2)') // "txt" * 10
    .replace(/'(.*?)'\s*\*\s*(\d+)/g, "'$1'.repeat($2)") // 'txt' * 10
    .replace(/def (\w+)\((.*?)\):/g, "function $1($2){") // function def
    .replace(/for (\w+) in (.*?):/g, "for (let $1 of $2){") // for loops
    .replace(/if (.*?):/g, "if ($1){") // if
    .replace(/elif (.*?):/g, "} else if ($1){") // elif
    .replace(/else:/g, "} else {") // else
    .replace(/while (.*?):/g, "while ($1){") // while
    .replace(/\.append\(/g, ".push(") // list.append
    .replace(/\.get\((.*?),\s*(.*?)\)/g, "[$1] || $2") // dict.get fallback (simple)
    .replace(/True/g, "true")
    .replace(/False/g, "false")
    .replace(/None/g, "null")
    .replace(/in (\w+)\.lower\(\)/g, ".indexOf($1.toLowerCase()) !== -1") // basic 'in' check
    .replace(/(\w+) in (\w+)/g, "$2.includes($1)") // simple 'in' check
    .replace(/print\((.*?)\)/g, "__out__($1)");

  // Handle block closing based on indentation
  const processedLines = transformedCode.split("\n");
  const result = [];
  const indentStack = [0];
  
  for (let i = 0; i < processedLines.length; i++) {
    const line = processedLines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      result.push("");
      continue;
    }
    
    const indent = line.search(/\S/);
    
    // Close blocks if indentation decreases
    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      result.push("  ".repeat(indentStack.length - 2) + "}");
      indentStack.pop();
    }
    
    // Track new indentation level for functions/loops
    if (trimmed.endsWith("{")) {
      indentStack.push(indent + 4);
    }
    
    result.push(line);
  }
  
  // Close any remaining blocks
  while (indentStack.length > 1) {
    result.push("  ".repeat(indentStack.length - 2) + "}");
    indentStack.pop();
  }
  
  const finalJs = result.join("\n");

  try {
    // Create execution sandbox
    const runner = new Function(...Object.keys(fakeScope), finalJs);
    runner(...Object.values(fakeScope));
  } catch (e) {
    lines.push(`Runtime Error: ${e.message}`);
  }
  
  return lines.join("\n") || "(no output)";
}

export default function Playground() {
  const [selectedSample, setSelectedSample] = useState(0);
  const [code, setCode]     = useState(SAMPLES[0].code);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' or 'output'

  const handleRun = () => {
    setRunning(true);
    setOutput("");
    if (window.innerWidth <= 1000) {
      setActiveTab("output");
    }
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

      <div className="pg-mobile-tabs">
        <button 
          className={`pg-mobile-tab ${activeTab === "editor" ? "active" : ""}`}
          onClick={() => setActiveTab("editor")}
        >
          <Code2 size={16} />
          Editor
        </button>
        <button 
          className={`pg-mobile-tab ${activeTab === "output" ? "active" : ""}`}
          onClick={() => setActiveTab("output")}
        >
          <Terminal size={16} />
          Output
          {output && <span className="pg-output-dot" />}
        </button>
      </div>

      <div className={`pg-layout pg-view-${activeTab}`}>
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
            height="calc(min(460px, 60vh))"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(v) => setCode(v || "")}
            options={{
              fontSize: 13.5,
              fontFamily: "'JetBrains Mono', monospace",
              minimap: { enabled: false },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              renderLineHighlight: "line",
              cursorBlinking: "smooth",
              automaticLayout: true,
              tabSize: 4,
            }}
          />
        </div>

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
