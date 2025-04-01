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
    if (userAns === quiz.ans) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
  };

  if (!quiz) {
    return <div className="text-center p-4">문제를 불러오는 중...</div>;
  }

  return (
    <section className="w-full max-w-md h-[420px] rounded-lg bg-white border-2 border-black overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <p className="text-lg font-semibold">Q. {quiz.quest}</p>
      </div>

      <div className="border-t-2 border-black" />
      <div className="grid grid-cols-2">
        <button
          onClick={() => handleAnswer("O")}
          className="flex items-center justify-center aspect-square text-5xl text-blue-500 border-r-2 border-black hover:bg-blue-100"
        >
          O
        </button>
        <button
          onClick={() => handleAnswer("X")}
          className="flex items-center justify-center aspect-square text-5xl text-red-500 hover:bg-red-100"
        >
          X
        </button>
      </div>
    </section>
  );
};

export default QuizCard;
