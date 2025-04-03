"use client";

import React from "react";
import { ChartLine, Eye, Heart } from "lucide-react";

interface Props {
  selected: "interest" | "views" | "likes" | null;
  onSelect: (value: "interest" | "views" | "likes") => void;
}

const SavingButton: React.FC<Props> = ({ selected, onSelect }) => {
  const buttonBase =
    "flex items-center gap-1 border-1 border-black px-3 py-1 rounded-lg cursor-pointer";

  return (
    <div className="flex gap-5 mx-auto w-fit">
      <button
        onClick={() => onSelect("interest")}
        className={`${buttonBase} ${selected === "interest" ? "bg-[#D9D9D9]" : "bg-white"}`}
      >
        <ChartLine size={16} />
        금리순
      </button>

      <button
        onClick={() => onSelect("views")}
        className={`${buttonBase} ${selected === "views" ? "bg-[#D9D9D9]" : "bg-white"}`}
      >
        <Eye size={16} />
        조회수순
      </button>

      <button
        onClick={() => onSelect("likes")}
        className={`${buttonBase} ${selected === "likes" ? "bg-[#D9D9D9]" : "bg-white"}`}
      >
        <Heart size={16} color="black" fill="red" />
        좋아요순
      </button>
    </div>
  );
};

export default SavingButton;
