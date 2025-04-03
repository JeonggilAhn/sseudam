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

  const fetchQuiz = async () => {
    try {
      const res = await axiosInstance.get("/quiz/random");
      setQuiz(res.data);
      setQuizData(res.data);
    } catch (error) {
      console.error("퀴즈 로딩 실패", error);
    }
  };

  useEffect(() => {
    fetchQuiz();
    setRefetch(() => fetchQuiz);
  }, []);

  const handleAnswer = (userAns: "O" | "X") => {
    if (!quiz) return;
    if (userAns === quiz.ans) onCorrectAnswer();
    else onWrongAnswer();
  };

  if (!quiz) {
    return <div className="text-center p-4 text-sm sm:text-base">문제를 불러오는 중...</div>;
  }

  return (
    <section className="w-full h-[420px] bg-white rounded-xl border-2 border-black overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 text-center">
        <p className="text-base sm:text-lg font-semibold leading-relaxed">Q. {quiz.quest}</p>
      </div>

      <div className="border-t-2 border-black" />
      <div className="grid grid-cols-2">
        <button
          onClick={() => handleAnswer("O")}
          className="aspect-square text-5xl text-blue-600 border-r-2 border-black hover:bg-blue-100 transition"
        >
          O
        </button>
        <button
          onClick={() => handleAnswer("X")}
          className="aspect-square text-5xl text-red-600 hover:bg-red-100 transition"
        >
          X
        </button>
      </div>
    </section>
  );
};

export default QuizCard;
