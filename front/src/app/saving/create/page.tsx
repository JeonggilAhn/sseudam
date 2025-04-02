"use client";

import React, { useState } from "react";
import { ChevronLeft, CreditCard, Wallet, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import axiosInstance from "@/utils/axiosInstance";
import CreateSuccess from "../components/createSuccess";
import { setOpenedSaving } from "@/stores/slices/savingSlice";
import { toast } from "react-toastify";
import Icon from "@/components/Icon";
import { getBankIconName } from "@/components/bankList";

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
      const res = await axiosInstance.post(`/savings-products/${saving.saving_id}`, requestBody);

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
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-4 flex flex-col">
      {/* 상단 헤더 */}
      <div className="relative flex items-center justify-center mb-8">
        <button
          className="absolute left-0 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          onClick={() => router.back()}
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{saving?.fin_prdt_nm || "적금 상품"}</h1>
      </div>

      {/* 요약 카드 */}
      {saving && (
        <div className="w-full max-w-md mx-auto mb-6 bg-white p-4 rounded-xl shadow flex items-center space-x-4">
          <div className="bg-gray-100 rounded-lg p-2">
            <Icon name={getBankIconName(saving.fin_prdt_cd)} width={60} height={30} />
          </div>
          <div>
            <p className="text-base font-semibold">{saving.fin_prdt_nm}</p>
            <p className="text-sm text-blue-600">
              금리: {(saving.min_int_rate / 100).toFixed(2)}% ~{" "}
              {(saving.max_int_rate / 100).toFixed(2)}%
            </p>
          </div>
        </div>
      )}

      {/* 입력 영역 */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center">
        <div className="w-full bg-white rounded-xl border border-blue-200 shadow-md p-6 space-y-8 max-w-md">
          {/* 출금 계좌 */}
          <div className="space-y-1">
            <label className="flex items-center font-medium text-gray-700">
              <CreditCard size={18} className="mr-2 text-blue-500" />
              출금 계좌 번호
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="입출금 계좌 번호 자동 입력"
              className="w-full text-base border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-right placeholder:text-left"
            />
          </div>

          {/* 납입 금액 */}
          <div className="space-y-1">
            <label className="flex items-center font-medium text-gray-700">
              <Wallet size={18} className="mr-2 text-blue-500" />
              납입 금액(원)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="예: 100000"
                className="w-full text-base border border-gray-300 rounded-lg px-4 py-3 pr-14 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-right placeholder:text-left"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                원
              </span>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="bg-blue-50 text-sm text-blue-700 p-3 rounded-lg flex items-start space-x-2">
            <Info size={16} className="text-blue-500 mt-1" />
            <span>
              가입일은 {formattedDate}로 설정됩니다. 상품 약관 및 이용 조건에 동의해주세요.
            </span>
          </div>
        </div>

        {/* 가입 버튼 */}
        <div className="mt-8 w-full max-w-md">
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full font-bold py-4 px-8 rounded-xl shadow flex items-center justify-center transition-all ${
              isDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
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
