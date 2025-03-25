"use client";

import React from "react";
import { Search } from "lucide-react";

const SavingSearch: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="flex items-center border border-black rounded-md bg-white px-3 py-2 shadow-sm">
        <Search size={20} className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full outline-none text-sm"
        />
      </div>
    </div>
  );
};

export default SavingSearch;
