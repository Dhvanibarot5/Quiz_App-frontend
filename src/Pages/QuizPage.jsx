import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockQuizData from "../utils/MockQuizData";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const quiz = mockQuizData.find((quiz) => quiz.id === parseInt(quizId));

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const { title, questions } = quiz;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = answer;
      return updatedAnswers;
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    navigate("/score", { state: { score: totalScore, questions, selectedAnswers } });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-4">
      <h1>{title}</h1>
      <div className="question-container">
        <h3>{currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`btn btn-secondary ${selectedAnswers[currentQuestionIndex] === option ? "active" : ""}`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="navigation mt-4">
          <button className="btn btn-secondary" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={nextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
