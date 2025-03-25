"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const SavingSearch: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="flex items-center border border-black rounded-md bg-white px-3 py-2 shadow-sm">
        <button onClick={handleSearch} className="mr-2 text-gray-500 cursor-pointer">
          <Search size={20} />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          className="w-full outline-none text-sm"
        />
      </div>
    </div>
  );
};

export default SavingSearch;
