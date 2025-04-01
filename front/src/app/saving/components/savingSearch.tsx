"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useAppDispatch } from "@/stores/hooks";
import { setKeyword, setSort } from "@/stores/slices/savingSlice";

const SavingSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const trimmed = query.trim();
    // 검색어가 공백이면 keyword 없앤 요청으로 처리
    dispatch(setKeyword(trimmed));
    dispatch(setSort("")); // 정렬 초기화
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="flex items-center border border-gray-200 rounded-xl bg-white px-3 py-2.5 shadow-md focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300 transition-all">
        <button
          onClick={handleSearch}
          className="mr-2 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
        >
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
