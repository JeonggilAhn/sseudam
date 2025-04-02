"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CheckPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount"); // 여기서 받음

  const handleList = () => {
    router.push("/list");
  };

  const handleHome = () => {
    router.push("/card");
  };

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-6 flex flex-col items-center justify-center">
      <div className="mb-8 text-xl font-bold">
        {amount ? `${parseInt(amount).toLocaleString()}원 송금 완료` : "없음"}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleList}
          className="px-4 p-2 rounded border bg-white font-semibold cursor-pointer"
        >
          거래 내역
        </button>{" "}
        <button
          onClick={handleHome}
          className="px-4 p-2 rounded border bg-[#FF9800] font-semibold cursor-pointer"
        >
          확인
        </button>
      </div>
    </main>
  );
};

export default CheckPage;
