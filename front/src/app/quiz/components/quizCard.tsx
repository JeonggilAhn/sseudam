"use client";

import React from "react";

interface QuizCardProps {
  onWrongAnswer: () => void;
  onCorrectAnswer: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ onWrongAnswer, onCorrectAnswer }) => {
  return (
    <section className="w-full max-w-md h-[420px] rounded-lg bg-white border-2 border-black overflow-hidden flex flex-col">
      {/* 문제 영역 */}
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <p className="text-lg font-semibold">
          Q. 상품들의 가격수준이 전반적으로 그리고 지속적으로 하락하는 현상을 인플레이션이라고 한다.
        </p>
      </div>

      {/* 구분선 */}
      <div className="border-t-2 border-black" />

      {/* OX 버튼 */}
      <div className="grid grid-cols-2">
        <button
          className="flex items-center justify-center aspect-square text-5xl text-blue-500 border-r-2 border-black hover:bg-blue-100"
          onClick={onWrongAnswer}
        >
          <div className="w-16 h-16 flex items-center justify-center">O</div>
        </button>
        <button
          className="flex items-center justify-center aspect-square text-5xl text-red-500 hover:bg-red-100"
          onClick={onCorrectAnswer}
        >
          <div className="w-16 h-16 flex items-center justify-center">X</div>
        </button>
      </div>
    </section>
  );
};

export default QuizCard;
