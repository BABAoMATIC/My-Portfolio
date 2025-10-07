import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Trophy,
  Lightbulb,
  Code,
  Database,
  Zap,
  Star
} from 'lucide-react';

interface InteractiveQuizProps {
  isDarkMode: boolean;
}

interface Question {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
  category: 'JavaScript' | 'React' | 'Python' | 'Data Science' | 'General';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ isDarkMode }) => {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What will be the output of this JavaScript code?",
      code: `const arr = [1, 2, 3, 4, 5];
const result = arr.map(x => x * 2).filter(x => x > 5);
console.log(result);`,
      options: ["[6, 8, 10]", "[2, 4, 6, 8, 10]", "[1, 2, 3, 4, 5]", "Error"],
      correct: 0,
      explanation: "The map function doubles each element, then filter keeps only elements > 5. So [2,4,6,8,10] becomes [6,8,10].",
      category: "JavaScript",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "In React, what hook is used to perform side effects?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 1,
      explanation: "useEffect is the hook used for side effects like API calls, subscriptions, or manually changing the DOM.",
      category: "React",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "What will this Python code output?",
      code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(5))`,
      options: ["5", "8", "13", "21"],
      correct: 0,
      explanation: "The Fibonacci sequence: 0,1,1,2,3,5... So fibonacci(5) = 5.",
      category: "Python",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "Which method is used to add an element to the end of an array in JavaScript?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correct: 0,
      explanation: "push() adds one or more elements to the end of an array and returns the new length.",
      category: "JavaScript",
      difficulty: "Easy"
    },
    {
      id: 5,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 1,
      explanation: "Binary search has O(log n) time complexity because it eliminates half of the search space in each iteration.",
      category: "Data Science",
      difficulty: "Medium"
    }
  ];

  const getCategoryIcon = (category: string) => {
    const icons = {
      'JavaScript': <Code className="w-5 h-5" />,
      'React': <Zap className="w-5 h-5" />,
      'Python': <Code className="w-5 h-5" />,
      'Data Science': <Database className="w-5 h-5" />,
      'General': <Brain className="w-5 h-5" />
    };
    return icons[category as keyof typeof icons] || <Brain className="w-5 h-5" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Easy': 'text-green-400',
      'Medium': 'text-yellow-400',
      'Hard': 'text-red-400'
    };
    return colors[difficulty as keyof typeof colors] || 'text-gray-400';
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setShowQuiz(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You're a coding wizard! 🧙‍♂️", color: "text-green-400" };
    if (percentage >= 60) return { message: "Good job! You know your stuff! 👍", color: "text-yellow-400" };
    return { message: "Keep learning! Practice makes perfect! 📚", color: "text-blue-400" };
  };

  if (!showQuiz) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 font-urbanist">
              Interactive Quiz
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto mb-8" />
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Test your coding knowledge with this interactive quiz! Challenge yourself with questions 
              about JavaScript, React, Python, and more.
            </p>
            
            <motion.button
              onClick={() => setShowQuiz(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto"
            >
              <Brain className="w-6 h-6" />
              <span>Start Quiz</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    return (
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className={`p-8 rounded-2xl ${
              isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl border border-gray-100'
            }`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-4 gradient-text font-urbanist">
                Quiz Completed!
              </h2>
              
              <div className="text-6xl font-bold mb-4 gradient-text">
                {score}/{questions.length}
              </div>
              
              <p className={`text-xl mb-6 ${scoreMessage.color}`}>
                {scoreMessage.message}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handleRestartQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Try Again</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setShowQuiz(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <span>Back to Portfolio</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm font-medium">Score: {score}/{currentQuestion}</span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <motion.div
                className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className={`p-8 rounded-2xl ${
            isDarkMode ? 'glass-morphism-dark' : 'bg-white shadow-xl border border-gray-100'
          }`}>
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="text-neon-purple">
                  {getCategoryIcon(currentQ.category)}
                </div>
                <div>
                  <h3 className="font-semibold">{currentQ.category}</h3>
                  <span className={`text-sm ${getDifficultyColor(currentQ.difficulty)}`}>
                    {currentQ.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (currentQ.difficulty === 'Easy' ? 2 : currentQ.difficulty === 'Medium' ? 3 : 4)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold mb-6 font-urbanist">
              {currentQ.question}
            </h2>

            {/* Code Block */}
            {currentQ.code && (
              <div className="mb-6">
                <pre className={`p-4 rounded-lg text-sm overflow-x-auto ${
                  isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'
                }`}>
                  <code>{currentQ.code}</code>
                </pre>
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                    showResult
                      ? index === currentQ.correct
                        ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                        : selectedAnswer === index
                        ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                      : selectedAnswer === index
                      ? 'bg-neon-purple/20 border-2 border-neon-purple text-neon-purple'
                      : isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showResult
                        ? index === currentQ.correct
                          ? 'border-green-500 bg-green-500'
                          : selectedAnswer === index
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-400'
                        : selectedAnswer === index
                        ? 'border-neon-purple bg-neon-purple'
                        : 'border-gray-400'
                    }`}>
                      {showResult && index === currentQ.correct && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                      {showResult && selectedAnswer === index && index !== currentQ.correct && (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Explanation */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg mb-6 ${
                  isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">Explanation:</h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              <motion.button
                onClick={handleRestartQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </motion.button>

              {!showResult ? (
                <motion.button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  whileHover={{ scale: selectedAnswer !== null ? 1.05 : 1 }}
                  whileTap={{ scale: selectedAnswer !== null ? 0.95 : 1 }}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNextQuestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveQuiz;
