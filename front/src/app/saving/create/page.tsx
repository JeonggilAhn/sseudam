"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import axiosInstance from "@/utils/axiosInstance";
import CreateSuccess from "../components/createSuccess";
import { setOpenedSaving } from "@/stores/slices/savingSlice";
import { toast } from "react-toastify";

const CreateSavingPage: React.FC = () => {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const saving = useAppSelector((state) => state.saving.selectedSavingDetail);
  const dispatch = useAppDispatch();

  const isDisabled = !accountNumber || !amount || !saving;

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!saving) return;

    const requestBody = {
      withdrawal_account_no: accountNumber,
      deposit_balance: Number(amount),
      account_type_unique_no: saving.fin_co_nm,
    };
    try {
      const res = await axiosInstance.post(
        `/api/savings-products/${saving.saving_id}`,
        requestBody
      );

      if (res?.data?.status?.code === "default-200") {
        dispatch(setOpenedSaving(res.data.content));
        setShowSuccess(true);
      } else {
        toast.error("가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("적금 가입 실패:", error);
      toast.error("가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-6 flex flex-col">
      {/* 상단 헤더 */}
      <div className="relative flex items-center justify-center mb-4">
        <button className="absolute left-0 cursor-pointer" onClick={() => router.back()}>
          <ChevronLeft size={36} />
        </button>
        <h1 className="text-2xl font-bold">{saving?.fin_prdt_nm || "적금 상품"}</h1>
      </div>

      {/* 입력 영역 */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full bg-white rounded-md border border-black p-4 space-y-6 max-w-md">
          {/* 출금 계좌 */}
          <div className="flex items-center">
            <label className="w-28 font-semibold">출금 계좌 번호</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="입출금 계좌 번호 자동 입력"
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 outline-none text-right"
            />
          </div>

          {/* 납입 금액 */}
          <div className="flex items-center">
            <label className="w-28 font-semibold">납입 금액(원)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="예: 100000"
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 outline-none text-right"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>

        {/* 가입 버튼 */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isDisabled}
            className={`font-semibold py-2 px-8 rounded-md shadow-md ${
              isDisabled
                ? "bg-[#C7C7C7] text-black cursor-not-allowed"
                : "bg-[#60B94D] hover:bg-green-600 text-white cursor-pointer"
            }`}
          >
            가입
          </button>
        </div>
      </form>

      {/* 가입 완료 모달 */}
      {showSuccess && saving && (
        <CreateSuccess
          productName={saving.fin_prdt_nm}
          amount={Number(amount)}
          startDate={formattedDate}
        />
      )}
    </main>
  );
};

export default CreateSavingPage;
