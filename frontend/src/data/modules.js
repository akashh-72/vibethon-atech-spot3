// Structured learning modules data
export const modules = [
  {
    id: "intro-ai",
    level: "Beginner",
    title: "Introduction to AI",
    description: "Understand what AI is, its history, and its real-world applications.",
    icon: "🤖",
    xp: 150,
    lessons: [
      {
        id: "what-is-ai",
        title: "What is Artificial Intelligence?",
        content: `Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. The term was coined by John McCarthy in 1956.

**Key Branches of AI:**
- **Machine Learning** – Systems that learn from data
- **Natural Language Processing** – Understanding human language
- **Computer Vision** – "Seeing" and interpreting images
- **Robotics** – Physical AI-powered machines`,
        example: `# Simple rule-based AI example
def greet_user(time_of_day):
    if time_of_day < 12:
        return "Good Morning!"
    elif time_of_day < 18:
        return "Good Afternoon!"
    else:
        return "Good Evening!"

print(greet_user(9))  # Output: Good Morning!`,
      },
      {
        id: "ai-history",
        title: "The Evolution of Intelligence",
        content: `The quest for AI began with Alan Turing's "Computing Machinery and Intelligence" in 1950. Since then, we've moved from symbolic AI (logic-based) to connectionism (neural networks) and now to Generative AI.

**Timeline:**
- **1950s:** Turing Test & Dartmoth Conference
- **1980s:** Expert Systems & Knowledge Engineering
- **2012:** Deep Learning revolution (AlexNet)
- **2023:** Large Language Models (LLMs)`,
      },
      {
        id: "real-world-ai",
        title: "AI in Everyday Life",
        content: `AI isn't just in lab—it's in your pocket. From Netflix recommendations to medical diagnostics, AI is everywhere.

**Applications:**
- **Healthcare:** Analysis of MRI scans for tumor detection
- **Finance:** Fraud detection and algorithmic trading
- **Entertainment:** Personalization algorithms`,
      }
    ],
    resources: [
      { title: "What is Artificial Intelligence?", url: "https://www.youtube.com/watch?v=2ePf9rue1Ao", thumbnail: "https://img.youtube.com/vi/2ePf9rue1Ao/maxresdefault.jpg" },
      { title: "AI Explained Simply", url: "https://www.youtube.com/watch?v=ad79nYk2keg", thumbnail: "https://img.youtube.com/vi/ad79nYk2keg/maxresdefault.jpg" },
      { title: "Artificial Intelligence Full Course - Basics", url: "https://www.youtube.com/watch?v=JMUxmLyrhSk", thumbnail: "https://img.youtube.com/vi/JMUxmLyrhSk/maxresdefault.jpg" },
      { title: "History of Artificial Intelligence", url: "https://www.youtube.com/watch?v=kWmX3pd1f10", thumbnail: "https://img.youtube.com/vi/kWmX3pd1f10/maxresdefault.jpg" },
      { title: "Real World Applications of AI", url: "https://www.youtube.com/watch?v=5NgNicANyqM", thumbnail: "https://img.youtube.com/vi/5NgNicANyqM/maxresdefault.jpg" }
    ]
  },
  {
    id: "supervised-learning",
    level: "Intermediate",
    title: "Supervised Learning",
    description: "Dive into classification and regression with hands-on examples.",
    icon: "📊",
    xp: 250,
    lessons: [
      {
        id: "classification",
        title: "Classification Algorithms",
        content: `Classification is the task of predicting which category a data point belongs to.

**Common Algorithms:**
- **K-Nearest Neighbors (KNN)** – Classifies based on nearby points
- **Decision Trees** – Hierarchical decision logic
- **SVM** – Optimal hyperplanes`,
        example: `# K-Nearest Neighbors logic
def knn_classify(new_point, dataset, k=3):
    distances = sorted([(abs(p - new_point), l) for p, l in dataset])
    votes = [l for d, l in distances[:k]]
    return max(set(votes), key=votes.count)`,
      },
      {
        id: "regression",
        title: "Regression: Predicting Values",
        content: `Regression is used when the output is a continuous number, like a house price or a stock value.

**Concepts:**
- **Linear Regression:** Straight line relationship
- **MSE (Mean Squared Error):** Measuring error
- **Gradient Descent:** Optimization technique`,
      },
      {
        id: "fitting",
        title: "Overfitting vs Underfitting",
        content: `A model should generalize, not memorize.
**Overfitting:** Too complex, learns noise.
**Underfitting:** Too simple, misses patterns.`,
      }
    ],
    resources: [
      { title: "Supervised Learning Explained", url: "https://www.youtube.com/watch?v=7eh4d6sabA0", thumbnail: "https://img.youtube.com/vi/7eh4d6sabA0/maxresdefault.jpg" },
      { title: "Classification vs Regression", url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI", thumbnail: "https://img.youtube.com/vi/Gv9_4yMHFhI/maxresdefault.jpg" },
      { title: "Linear Regression Tutorial", url: "https://www.youtube.com/watch?v=8jazNUpO3lQ", thumbnail: "https://img.youtube.com/vi/8jazNUpO3lQ/maxresdefault.jpg" },
      { title: "Machine Learning Basics - Google", url: "https://www.youtube.com/watch?v=IpGxLWOIZy4", thumbnail: "https://img.youtube.com/vi/IpGxLWOIZy4/maxresdefault.jpg" },
      { title: "Overfitting vs Underfitting", url: "https://www.youtube.com/watch?v=EuBBz3bI-aA", thumbnail: "https://img.youtube.com/vi/EuBBz3bI-aA/maxresdefault.jpg" }
    ]
  },
  {
    id: "neural-networks",
    level: "Advanced",
    title: "Neural Networks & Deep Learning",
    description: "Explore how neural networks mimic the human brain to solve complex problems.",
    icon: "🧠",
    xp: 400,
    lessons: [
      {
        id: "nn-basics",
        title: "How Neural Networks Work",
        content: `A Neural Network is a series of algorithms that recognize patterns, inspired by the human brain.

**Architecture:**
- **Input Layer:** Receives raw features
- **Hidden Layers:** Learns abstract representations
- **Output Layer:** Prediction result`,
        example: `# Sigmoid activation
import math
def sigmoid(x):
    return 1 / (1 + math.exp(-x))`,
      },
      {
        id: "backprop",
        title: "Backpropagation & Learning",
        content: `How does a network "learn"? By calculating the error (loss) and propagating it backward through the layers to adjust weights.`,
      },
      {
        id: "deep-vs-shallow",
        title: "Deep vs Shallow Learning",
        content: `Deep learning refers to networks with many hidden layers, allowing for features to be learned hierarchically (e.g., edges -> shapes -> faces).`,
      }
    ],
    resources: [
      { title: "Neural Networks Explained Visually", url: "https://www.youtube.com/watch?v=aircAruvnKk", thumbnail: "https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg" },
      { title: "Deep Learning Crash Course", url: "https://www.youtube.com/watch?v=VyWAvY2CF9c", thumbnail: "https://img.youtube.com/vi/VyWAvY2CF9c/maxresdefault.jpg" },
      { title: "How Neural Networks Work", url: "https://www.youtube.com/watch?v=bxe2T-V8XRs", thumbnail: "https://img.youtube.com/vi/bxe2T-V8XRs/maxresdefault.jpg" },
      { title: "Backpropagation Explained", url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U", thumbnail: "https://img.youtube.com/vi/Ilg3gGewQ5U/maxresdefault.jpg" },
      { title: "CNN vs ANN vs RNN", url: "https://www.youtube.com/watch?v=O5xeyoRL95U", thumbnail: "https://img.youtube.com/vi/O5xeyoRL95U/maxresdefault.jpg" }
    ]
  },
  {
    id: "nlp",
    level: "Advanced",
    title: "Natural Language Processing",
    description: "Teach machines to read, understand, and generate human language.",
    icon: "💬",
    xp: 400,
    lessons: [
      {
        id: "nlp-intro",
        title: "Introduction to NLP",
        content: `NLP enables computers to understand human language through tokenization, sentiment analysis, and embedding techniques.`,
      },
      {
        id: "tokenization",
        title: "Tokenization & Cleaning",
        content: `Before processing, text must be broken down into "tokens" (words or sub-words) and cleaned of noise (stop words).`,
      },
      {
        id: "transformers",
        title: "The Transformer Revolution",
        content: `Attention is all you need. Modern NLP relies on Transformers, the architecture behind GPT and BERT.`,
      }
    ],
    resources: [
      { title: "Natural Language Processing Explained", url: "https://www.youtube.com/watch?v=fLvJ8VdHLA0", thumbnail: "https://img.youtube.com/vi/fLvJ8VdHLA0/maxresdefault.jpg" },
      { title: "NLP Full Course", url: "https://www.youtube.com/watch?v=CMrHM8a3hqw", thumbnail: "https://img.youtube.com/vi/CMrHM8a3hqw/maxresdefault.jpg" },
      { title: "Text Processing in NLP", url: "https://www.youtube.com/watch?v=X2vAabgKiuM", thumbnail: "https://img.youtube.com/vi/X2vAabgKiuM/maxresdefault.jpg" },
      { title: "Tokenization & Embeddings", url: "https://www.youtube.com/watch?v=8S3qHHUKqYk", thumbnail: "https://img.youtube.com/vi/8S3qHHUKqYk/maxresdefault.jpg" },
      { title: "Sentiment Analysis Project", url: "https://www.youtube.com/watch?v=QpzMWQvxXWk", thumbnail: "https://img.youtube.com/vi/QpzMWQvxXWk/maxresdefault.jpg" }
    ]
  },
];

export const getLevelColor = (level) => {
  const colors = {
    Beginner: "#10b981",
    Intermediate: "#f59e0b",
    Advanced: "#ef4444",
  };
  return colors[level] || "#6366f1";
};
