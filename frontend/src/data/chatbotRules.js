export const CHATBOT_RULES = [
  {
    keywords: ["hi", "hello", "hey", "hola"],
    response: "Hello! I'm Nova, your LearNova guide. I'm here to help you navigate our learning universe. What's on your mind today?"
  },
  {
    keywords: ["module", "course", "learn", "lesson", "content"],
    response: "You can find all our educational content in the **Learn** section. We have modules ranging from Neural Networks to Web Development! Which topic interests you most?"
  },
  {
    keywords: ["quiz", "test", "exam", "assessment", "check"],
    response: "Quizzes are a great way to test your knowledge! You'll find them at the end of every module. You can also visit the **Quizzes** page to see all available tests."
  },
  {
    keywords: ["rank", "leaderboard", "score", "top", "leader"],
    response: "Feeling competitive? Check out the **Leaderboard** to see where you stand among other LearNova students. Earn XP by completing modules and quizzes to climb the ranks!"
  },
  {
    keywords: ["code", "playground", "practice", "editor", "sandbox"],
    response: "The **Playground** is where the magic happens! It's a built-in code editor where you can experiment with what you've learned in real-time. Give it a try!"
  },
  {
    keywords: ["who are you", "what is nova", "help", "nova"],
    response: "I'm **Nova**, a rule-based assistant designed to help you get the most out of LearNova. I can tell you about courses, quizzes, and how to track your progress! Just ask."
  },
  {
    keywords: ["contact", "support", "email", "bug", "help"],
    response: "Need technical help? You can reach our team through the **Contact** page, or email us directly at support@learnova.com. We're here to help!"
  },
  {
    keywords: ["xp", "points", "level", "experience"],
    response: "You earn **XP** (Experience Points) by completing platform activities. Finishing a lesson, passing a quiz, or contributing to the community all boost your level! Check your profile for detailed stats."
  },
  {
    keywords: ["game", "simulation", "interactive"],
    response: "We have interactive **Simulations** and **Games** designed to make complex concepts like Quantum Computing or Neural Networks easier to understand. Check them out in the sidebar!"
  }
];

export const INITIAL_MESSAGE = "Hi there! I'm **Nova**. I can help you navigate LearNova and answer your questions. Use the buttons below or type something to get started!";

export const QUICK_ACTIONS = [
  "How do I earn XP?",
  "Tell me about Modules",
  "Where is the Playground?",
  "How to rank up?"
];

export const DEFAULT_RESPONSE = "I'm not sure I understand that yet. I'm a rule-based assistant! Try asking about **Modules**, **Quizzes**, **XP**, or the **Leaderboard**.";
