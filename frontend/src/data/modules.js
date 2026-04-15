// Structured learning modules data
export const modules = [
  {
    id: "intro-ai",
    level: "Beginner",
    title: "Introduction to AI",
    description: "Understand what AI is, its history, and its real-world applications.",
    icon: "🤖",
    xp: 100,
    lessons: [
      {
        id: "what-is-ai",
        title: "What is Artificial Intelligence?",
        content: `Artificial Intelligence (AI) refers to the simulation of human intelligence in machines 
that are programmed to think and learn like humans. The term was coined by John McCarthy in 1956.

**Key Branches of AI:**
- **Machine Learning** – Systems that learn from data
- **Natural Language Processing** – Understanding human language
- **Computer Vision** – "Seeing" and interpreting images
- **Robotics** – Physical AI-powered machines

**Real-world Applications:**
- Voice assistants (Siri, Alexa)
- Recommendation systems (Netflix, Spotify)
- Self-driving cars
- Medical diagnosis`,
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
        id: "ml-basics",
        title: "Machine Learning Fundamentals",
        content: `Machine Learning (ML) is a subset of AI where systems learn from data without being explicitly programmed.

**Types of Machine Learning:**
1. **Supervised Learning** – Learns from labeled data (e.g., predicting house prices)
2. **Unsupervised Learning** – Finds patterns in unlabeled data (e.g., customer segmentation)
3. **Reinforcement Learning** – Learns by trial and error (e.g., game-playing AI)

**The ML Workflow:**
1. Collect & clean data
2. Choose a model
3. Train the model
4. Evaluate performance
5. Deploy & predict`,
        example: `# Pseudocode: Linear Regression concept
# y = mx + b
def predict(x, m, b):
    return m * x + b

# If house size = 1500 sqft, m=200, b=50000
price = predict(1500, 200, 50000)
print("Predicted price: $" + str(price))  # 350000`,
      },
    ],
  },
  {
    id: "supervised-learning",
    level: "Intermediate",
    title: "Supervised Learning",
    description: "Dive into classification and regression with hands-on examples.",
    icon: "📊",
    xp: 200,
    lessons: [
      {
        id: "classification",
        title: "Classification Algorithms",
        content: `Classification is the task of predicting which category a data point belongs to.

**Common Algorithms:**
- **K-Nearest Neighbors (KNN)** – Classifies based on nearby data points
- **Decision Trees** – Tree-like model of decisions
- **Support Vector Machines (SVM)** – Finds optimal decision boundary
- **Logistic Regression** – Predicts probability of a class

**Evaluation Metrics:**
- Accuracy, Precision, Recall, F1-Score`,
        example: `# K-Nearest Neighbors concept
def knn_classify(new_point, dataset, k=3):
    distances = []
    for point, label in dataset:
        dist = abs(point - new_point)
        distances.append((dist, label))
    
    # Sort by distance, take k nearest
    distances.sort()
    k_nearest = distances[:k]
    
    # Majority vote
    labels = [label for _, label in k_nearest]
    return max(set(labels), key=labels.count)`,
      },
      {
        id: "decision-trees",
        title: "Decision Trees Deep Dive",
        content: `A Decision Tree splits data into branches based on feature values, creating a tree-like structure.

**Key Concepts:**
- **Root Node** – Starting point (first decision)
- **Internal Nodes** – Decision points
- **Leaf Nodes** – Final predictions
- **Splitting Criteria** – Gini impurity, Information Gain

**Advantages:**
- Easy to understand and visualize
- Handles both numerical and categorical data
- No feature scaling needed`,
        example: `# Decision Tree logic for spam detection
def classify_email(word_count, has_link, sender_known):
    if sender_known:
        return "NOT SPAM"
    elif has_link and word_count < 20:
        return "SPAM"
    elif word_count > 100:
        return "NOT SPAM"
    else:
        return "UNCERTAIN"`,
      },
    ],
  },
  {
    id: "neural-networks",
    level: "Advanced",
    title: "Neural Networks & Deep Learning",
    description: "Explore how neural networks mimic the human brain to solve complex problems.",
    icon: "🧠",
    xp: 300,
    lessons: [
      {
        id: "nn-basics",
        title: "How Neural Networks Work",
        content: `A Neural Network is a series of algorithms that recognize patterns, inspired by the human brain.

**Architecture:**
- **Input Layer** – Receives raw data
- **Hidden Layers** – Process and learn features
- **Output Layer** – Produces final prediction

**Key Concepts:**
- **Neurons/Nodes** – Basic computing units
- **Weights & Biases** – Learnable parameters
- **Activation Functions** – ReLU, Sigmoid, Tanh
- **Backpropagation** – How networks learn

**Deep Learning** uses many hidden layers to learn complex representations.`,
        example: `# Simple neuron concept
import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def neuron(inputs, weights, bias):
    # Weighted sum
    total = sum(i * w for i, w in zip(inputs, weights)) + bias
    # Activation
    return sigmoid(total)

# Example: XOR gate approximation
output = neuron([1, 0], [0.8, -0.5], 0.1)
print("Neuron output: " + str(round(output, 4)))`,
      },
    ],
  },
  {
    id: "nlp",
    level: "Advanced",
    title: "Natural Language Processing",
    description: "Teach machines to read, understand, and generate human language.",
    icon: "💬",
    xp: 300,
    lessons: [
      {
        id: "nlp-intro",
        title: "Introduction to NLP",
        content: `Natural Language Processing (NLP) enables computers to understand and generate human language.

**Core NLP Tasks:**
- **Tokenization** – Breaking text into words/sentences
- **Sentiment Analysis** – Detecting positive/negative tone
- **Named Entity Recognition** – Identifying people, places, organizations
- **Machine Translation** – Translating between languages
- **Text Summarization** – Condensing long text

**Popular NLP Tools:**
- NLTK, spaCy (Python libraries)
- Hugging Face Transformers
- OpenAI GPT models`,
        example: `# Simple sentiment analysis
def analyze_sentiment(text):
    positive_words = ["good", "great", "excellent", "amazing", "love"]
    negative_words = ["bad", "terrible", "awful", "hate", "poor"]
    
    words = text.lower().split()
    pos_count = sum(1 for w in words if w in positive_words)
    neg_count = sum(1 for w in words if w in negative_words)
    
    if pos_count > neg_count:
        return "POSITIVE 😊"
    elif neg_count > pos_count:
        return "NEGATIVE 😞"
    return "NEUTRAL 😐"

print(analyze_sentiment("This is a great and amazing product!"))`,
      },
    ],
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
