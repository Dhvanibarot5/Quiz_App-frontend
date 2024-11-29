import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const QuizGame = () => {
  const navigate = useNavigate();

  const allQuestions = [
    {
      questionText: "What does HTML stand for?",
      category: "HTML",
      difficulty: "Easy",
      answerOptions: [
        { answerText: "Hyper Text Markup Language", isCorrect: true },
        { answerText: "High Technical Modern Language", isCorrect: false },
        { answerText: "Hyper Transfer Markup Language", isCorrect: false },
        { answerText: "High Text Modern Language", isCorrect: false },
      ],
    },
    {
      questionText: "Which tag is used to create a hyperlink in HTML?",
      category: "HTML",
      difficulty: "Easy",
      answerOptions: [
        { answerText: "<link>", isCorrect: false },
        { answerText: "<a>", isCorrect: true },
        { answerText: "<href>", isCorrect: false },
        { answerText: "<url>", isCorrect: false },
      ],
    },
    {
      questionText: "What is the correct CSS syntax for making all the <p> elements bold?",
      category: "CSS",
      difficulty: "Medium",
      answerOptions: [
        { answerText: "p {font-weight: bold;}", isCorrect: true },
        { answerText: "p {text-weight: bold;}", isCorrect: false },
        { answerText: '<p style="bold">', isCorrect: false },
        { answerText: "p {text-style: bold;}", isCorrect: false },
      ],
    },
    {
      questionText: "Which JavaScript method is used to remove the last element from an array?",
      category: "JavaScript",
      difficulty: "Medium",
      answerOptions: [
        { answerText: "pop()", isCorrect: true },
        { answerText: "push()", isCorrect: false },
        { answerText: "shift()", isCorrect: false },
        { answerText: "unshift()", isCorrect: false },
      ],
    },
    {
      questionText: "What is the purpose of React useEffect hook?",
      category: "React",
      difficulty: "Hard",
      answerOptions: [
        { answerText: "To handle side effects in components", isCorrect: true },
        { answerText: "To create new components", isCorrect: false },
        { answerText: "To style components", isCorrect: false },
        { answerText: "To route between pages", isCorrect: false },
      ],
    },
    {
      questionText: "What is the correct way to declare a variable in JavaScript that cannot be reassigned?",
      category: "JavaScript",
      difficulty: "Medium",
      answerOptions: [
        { answerText: "const", isCorrect: true },
        { answerText: "let", isCorrect: false },
        { answerText: "var", isCorrect: false },
        { answerText: "static", isCorrect: false },
      ],
    },
    {
      questionText: "Which CSS property is used to create space between the element's border and inner content?",
      category: "CSS",
      difficulty: "Medium",
      answerOptions: [
        { answerText: "padding", isCorrect: true },
        { answerText: "margin", isCorrect: false },
        { answerText: "spacing", isCorrect: false },
        { answerText: "border-spacing", isCorrect: false },
      ],
    },
    {
      questionText: "What hook would you use in React to store data that persists between renders but doesn't cause re-renders?",
      category: "React",
      difficulty: "Hard",
      answerOptions: [
        { answerText: "useRef", isCorrect: true },
        { answerText: "useState", isCorrect: false },
        { answerText: "useEffect", isCorrect: false },
        { answerText: "useMemo", isCorrect: false },
      ],
    },
    {
      questionText: "Which HTML5 tag is used to specify a footer for a document or section?",
      category: "HTML",
      difficulty: "Easy",
      answerOptions: [
        { answerText: "<footer>", isCorrect: true },
        { answerText: "<bottom>", isCorrect: false },
        { answerText: "<end>", isCorrect: false },
        { answerText: "<section>", isCorrect: false },
      ],
    },
    {
      questionText: "What is the purpose of the JavaScript 'map' array method?",
      category: "JavaScript",
      difficulty: "Medium",
      answerOptions: [
        { answerText: "Creates a new array with the results of calling a function for every array element", isCorrect: true },
        { answerText: "Modifies the original array by adding new elements", isCorrect: false },
        { answerText: "Filters out elements from an array", isCorrect: false },
        { answerText: "Sorts the elements of an array", isCorrect: false },
      ],
    },
  ];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [quizStats, setQuizStats] = useState({
    correct: 0,
    incorrect: 0,
    unanswered: 15,
    attempted: [],
  });
  const [showStart, setShowStart] = useState(true);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(allQuestions).slice(0, 15);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswerClick = (isCorrect) => {
    setSelectedAnswer(isCorrect);
    setAnswerStatus(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore(score + 1);
      setQuizStats((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        unanswered: prev.unanswered - 1,
      }));
    } else {
      setQuizStats((prev) => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        unanswered: prev.unanswered - 1,
      }));
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setAnswerStatus(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleNavigation = (direction) => {
    if (direction === "next" && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (direction === "prev" && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showStart) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Web Development Quiz</h1>
          <p className="text-gray-600 mb-8">Test your knowledge with 15 questions about HTML, CSS, JavaScript, and React</p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-sm text-gray-500">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15 mins</div>
                <div className="text-sm text-gray-500">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100</div>
                <div className="text-sm text-gray-500">Total Points</div>
              </div>
            </div>
            <button
              onClick={() => setShowStart(false)}
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Start Quiz
            </button>
            <Link
              to="/"
              className="block w-full bg-gray-100 text-gray-800 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!showScore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <div className="text-blue-600 font-semibold">
                Score: {score}/{questions.length}
              </div>
            </div>

            <div className="mb-8">
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">{questions[currentQuestion]?.category}</div>
              <p className="text-xl text-gray-700 font-medium">{questions[currentQuestion]?.questionText}</p>
            </div>

            <div className="space-y-4 mb-8">
              {questions[currentQuestion]?.answerOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option.isCorrect)}
                  className={`w-full p-4 text-left rounded-xl transition duration-300 ${
                    selectedAnswer !== null
                      ? option.isCorrect
                        ? "bg-green-100 text-green-800 border-2 border-green-500"
                        : "bg-red-100 text-red-800 border-2 border-red-500"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option.answerText}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => handleNavigation("prev")}
                disabled={currentQuestion === 0}
                className={`flex items-center px-6 py-2 rounded-lg ${
                  currentQuestion === 0 ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <FaArrowLeft className="mr-2" /> Previous
              </button>
              <button
                onClick={() => handleNavigation("next")}
                disabled={currentQuestion === questions.length - 1}
                className={`flex items-center px-6 py-2 rounded-lg ${
                  currentQuestion === questions.length - 1 ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-8 text-center">
            <h2 className="text-3xl font-bold text-white">Quiz Complete! 🎉</h2>
            <p className="text-blue-100 mt-2">Here's how you performed</p>
          </div>

          <div className="px-6 py-8">
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-5xl font-bold text-blue-600">{Math.round((score / questions.length) * 100)}%</span>
                    <span className="text-gray-500">Final Score</span>
                  </div>
                </div>
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray={`${(score / questions.length) * 100}, 100`}
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <span className="block text-2xl font-bold text-green-600">{quizStats.correct}</span>
                <span className="text-green-800">Correct</span>
              </div>
              <div className="bg-red-50 p-4 rounded-xl text-center">
                <span className="block text-2xl font-bold text-red-600">{quizStats.incorrect}</span>
                <span className="text-red-800">Incorrect</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <span className="block text-2xl font-bold text-gray-600">{quizStats.unanswered}</span>
                <span className="text-gray-800">Unanswered</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition duration-300"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-200 transition duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
