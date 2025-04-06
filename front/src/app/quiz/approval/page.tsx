"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

const CheckPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  const handleList = () => {
    router.push("/list");
  };

  const handleHome = () => {
    router.push("/card");
  };

  return (
    <main className="min-h-screen bg-[#C1E6FA] flex items-center justify-center px-6 pb-36">
      <div className="flex flex-col items-center text-center space-y-6">
        <CheckCircle size={64} className="text-green-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          {amount ? (
            <>
              <span className="text-green-600 font-bold">
                {parseInt(amount).toLocaleString()}원
              </span>{" "}
              송금 완료
            </>
          ) : (
            "금액 정보 없음"
          )}
        </h2>

        <div className="flex gap-4 w-full max-w-xs">
          <button
            onClick={handleList}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-400 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-500 transition"
          >
            거래 내역
          </button>
          <button
            onClick={handleHome}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-400 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-500 transition"
          >
            확인
          </button>
        </div>
      </div>
    </main>
  );
};

export default CheckPage;
