"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { toggleIsModalOpen, resetIsModalOpen } from "@/stores/slices/aniModalSlice";

import SavingCard from "../components/savingCard";
import SavingDetail from "../components/savingDetail";
import AnimatedModal from "@/components/animatedModal";
import Icon from "@/components/Icon";

const DetailPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedSaving = useAppSelector((state) => state.saving.selectedSaving);
  const openedSaving = useAppSelector((state) => state.saving.openedSaving);
  const isModalOpen = useAppSelector((state) => state.aniModal.isModalOpen);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = `${tomorrow.getFullYear()}년 ${tomorrow.getMonth() + 1}월 ${tomorrow.getDate()}일`;

  const expectedPrincipal = openedSaving
    ? openedSaving.depositBalance * Number(openedSaving.subscriptionPeriod)
    : 0;

  const expectedInterest = openedSaving
    ? Math.floor(expectedPrincipal * (Number(openedSaving.interestRate) / 100))
    : 0;

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-4 pb-20 px-4 flex flex-col items-center">
      <div className="relative flex items-center justify-center mb-4">
        <h1 className="text-2xl font-bold">적금 정보</h1>
      </div>

      {selectedSaving && (
        <SavingCard
          saving={selectedSaving}
          onClickJoin={() => dispatch(toggleIsModalOpen())}
          joinButtonText="상세보기"
        />
      )}

      {/* 모달 부분 */}
      {isModalOpen && selectedSaving && (
        <AnimatedModal
          onClose={() => {
            dispatch(resetIsModalOpen());
          }}
        >
          <SavingDetail
            savingId={selectedSaving.saving_id}
            onClose={() => dispatch(resetIsModalOpen())}
            showJoinButton={false}
          />
        </AnimatedModal>
      )}

      <div className="relative mt-10 flex flex-col items-center">
        <div className="flex items-start justify-center gap-4">
          <Icon name="logoCharacterSmile" width={200} height={230} />
          <div className="relative bg-white rounded-4xl px-8 py-8 text-lg font-bold text-black">
            누적 납입금
            <br />
            {openedSaving?.depositBalance?.toLocaleString()} 원!!
            <div className="absolute left-[-12px] top-18 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[12px] border-r-white"></div>
          </div>
        </div>
      </div>

      {openedSaving && (
        <div className="mt-8 bg-white rounded-xl border px-6 py-4 w-full max-w-md text-md space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold">다음 송금일</span>
            <span>{formattedTomorrow}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">만기 예상 원금</span>
            <span>{expectedPrincipal.toLocaleString()} 원</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">만기 예상 이자</span>
            <span>{expectedInterest.toLocaleString()} 원</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">적금 만기일</span>
            <span>
              {openedSaving.accountExpiryDate?.replace(
                /(\d{4})(\d{2})(\d{2})/,
                "$1년 $2월 $3일"
              )}
            </span>
          </div>
        </div>
      )}
    </main>
  );
};

export default DetailPage;
