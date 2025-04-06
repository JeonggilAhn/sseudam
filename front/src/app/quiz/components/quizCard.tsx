"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { QuizData } from "@/types/quiz";

interface QuizCardProps {
  onWrongAnswer: () => void;
  onCorrectAnswer: () => void;
  setQuizData: (data: QuizData) => void;
  setRefetch: (fn: () => void) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  onWrongAnswer,
  onCorrectAnswer,
  setQuizData,
  setRefetch,
}) => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [wrongEffect, setWrongEffect] = useState(false);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/quiz/random");
      setQuiz(res.data);
      setQuizData(res.data);
    } catch (error) {
      console.error("퀴즈 로딩 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
    setRefetch(() => fetchQuiz);
  }, []);

  const handleAnswer = (userAns: "O" | "X") => {
    if (!quiz) return;
    if (userAns === quiz.ans) onCorrectAnswer();
    else {
      setWrongEffect(true);
      setTimeout(() => setWrongEffect(false), 600);
      onWrongAnswer();
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[420px] bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center animate-fade-in">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`w-full h-[420px] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-200 animate-fade-slide-in ${wrongEffect ? "animate-shake" : ""}`}
    >
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <p className="text-lg sm:text-xl font-semibold leading-relaxed text-center">
          Q. {quiz?.quest}
        </p>
      </div>

      <div className="grid grid-cols-2 h-32">
        <button
          onClick={() => handleAnswer("O")}
          className="flex items-center justify-center font-bold text-5xl text-blue-600 border-t border-r border-gray-200 hover:bg-blue-50 active:bg-blue-100 transition-transform duration-150 active:scale-95 cursor-pointer"
        >
          O
        </button>
        <button
          onClick={() => handleAnswer("X")}
          className="flex items-center justify-center font-bold text-5xl text-red-600 border-t border-gray-200 hover:bg-red-50 active:bg-red-100 transition-transform duration-150 active:scale-95 cursor-pointer"
        >
          X
        </button>
      </div>
    </section>
  );
};

export default QuizCard;
