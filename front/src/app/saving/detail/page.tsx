"use client";

import React, { useState } from "react";
import SavingCard from "../components/savingCard";
import SavingDetail from "../components/savingDetail";
import Icon from "@/components/Icon";

const DetailPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-6 flex flex-col items-center">
      <div className="relative flex items-center justify-center mb-4">
        <h1 className="text-2xl font-bold">적금 정보</h1>
      </div>

      <SavingCard onClickJoin={() => setShowModal(true)} joinButtonText="상세보기" />
      {showModal && <SavingDetail onClose={() => setShowModal(false)} showJoinButton={false} />}

      <div className="relative mt-6">
        {/* 말풍선 */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border border-gray-300 px-4 py-2 rounded-full shadow text-sm font-bold z-10 whitespace-nowrap">
          누적 납입금 100,000원!!
        </div>

        {/* 돼지 이미지 */}
        <Icon name="logoCharacterSmile" width={180} height={180} />
      </div>

      {/* 하단 정보 카드 */}
      <div className="mt-8 bg-white rounded-xl shadow px-6 py-4 w-full max-w-md text-sm space-y-3">
        <div className="flex justify-between">
          <span className="font-semibold">다음 송금일</span>
          <span>2025년 04월 21일</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">만기 예상 원금</span>
          <span>2,400,000 원</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">만기 예상 이자</span>
          <span>144,000 원</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">적금 만기일</span>
          <span>2027년 03월 21일</span>
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
