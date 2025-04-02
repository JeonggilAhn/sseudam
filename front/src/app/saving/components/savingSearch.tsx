"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useAppDispatch } from "@/stores/hooks";
import { setKeyword, setSort } from "@/stores/slices/savingSlice";

const stopwords = ["은행", "저축은행", "주식회사"];

const SavingSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      dispatch(setKeyword("")); // 공백 입력 시 검색어 초기화
      dispatch(setSort(""));
      return;
    }

    // 불필요 단어 제거
    const refined = stopwords.reduce((acc, word) => acc.replaceAll(word, ""), trimmed).trim();

    dispatch(setKeyword(refined));
    dispatch(setSort("")); // 정렬 초기화
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-4 px-4 sm:px-0">
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
