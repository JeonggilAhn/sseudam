"use client";

import React from "react";

interface QuizSolutionProps {
  onRetry: () => void;
  solution: string;
}

const QuizSolution: React.FC<QuizSolutionProps> = ({ onRetry, solution }) => {
  return (
    <section className="w-full h-[420px] bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between items-center animate-fade-slide-in">
      <div className="text-center">
        <span className="text-4xl font-bold text-red-500">오답!!</span>
      </div>

      <div className="flex-1 flex items-center justify-center text-center px-4 my-4">
        <p className="text-lg font-bold leading-relaxed">{solution}</p>
      </div>

      <button
        onClick={onRetry}
        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:shadow-md cursor-pointer"
      >
        새로운 문제 풀기
      </button>
    </section>
  );
};

export default QuizSolution;
