"use client";

import React from "react";
import { TrendingUp, Eye, Heart } from "lucide-react";

interface Props {
  selected: "interest" | "views" | "likes" | null;
  onSelect: (value: "interest" | "views" | "likes") => void;
}

const SavingButton: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-3 mx-auto w-fit bg-white p-1.5 rounded-xl shadow-md">
      <button
        onClick={() => onSelect("interest")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
          selected === "interest"
            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        <TrendingUp
          size={18}
          className={selected === "interest" ? "text-blue-600" : "text-gray-500"}
        />
        금리순
      </button>

      <button
        onClick={() => onSelect("views")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
          selected === "views"
            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Eye size={18} className={selected === "views" ? "text-blue-600" : "text-gray-500"} />
        조회수순
      </button>

      <button
        onClick={() => onSelect("likes")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
          selected === "likes"
            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Heart
          size={18}
          className={selected === "likes" ? "text-blue-600" : "text-gray-500"}
          fill={selected === "likes" ? "rgba(37, 99, 235, 0.2)" : "none"}
        />
        좋아요순
      </button>
    </div>
  );
};

export default SavingButton;
