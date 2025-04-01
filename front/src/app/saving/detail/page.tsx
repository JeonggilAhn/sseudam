"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/stores/hooks";

import SavingCard from "../components/savingCard";
import SavingDetail from "../components/savingDetail";
import Icon from "@/components/Icon";

const DetailPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const selectedSaving = useAppSelector((state) => state.saving.selectedSaving);

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-6 flex flex-col items-center">
      <div className="relative flex items-center justify-center mb-4">
        <h1 className="text-2xl font-bold">적금 정보</h1>
      </div>
      {selectedSaving && (
        <SavingCard
          saving={selectedSaving}
          onClickJoin={() => setShowModal(true)}
          joinButtonText="상세보기"
        />
      )}
      {showModal && selectedSaving && (
        <SavingDetail
          savingId={selectedSaving.saving_id}
          onClose={() => setShowModal(false)}
          showJoinButton={false}
        />
      )}{" "}
      <div className="relative mt-10 flex flex-col items-center">
        <div className="flex items-start justify-center gap-4">
          {/* 돼지 캐릭터 */}
          <Icon name="logoCharacterSmile" width={200} height={230} />

          {/* 말풍선 */}
          <div className="relative bg-white rounded-4xl px-8 py-8 text-lg font-bold text-black">
            누적 납입금
            <br />
            100,000 원!!
            {/* 꼬리 */}
            <div className="absolute left-[-12px] top-18 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[12px] border-r-white"></div>
          </div>
        </div>
      </div>
      {/* 하단 정보 카드 */}
      <div className="mt-8 bg-white rounded-xl border px-6 py-4 w-full max-w-md text-md space-y-3">
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
