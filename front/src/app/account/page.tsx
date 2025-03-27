"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { LongButton } from "@/components/ui/customButton";
import { Button } from "@/components/ui/button";

const Account: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePage = () => {
    console.log("완료");
  };

  const handleCancel = () => {
    router.push("/");
  };

  const handleCheckButton = () => {
    // !checked;
  };

  return (
    <>
      <div className="p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-8 w-8" />
          </Button>
        </div>
      </div>

      <header className="mt-[20px] mb-[60px]">
        <h1 className="text-[28px] font-bold flex justify-start ml-8">
          쓰담 통장 만들기
        </h1>
      </header>

      <div className="ml-4 mr-4">
        <div className="w-full h-[50px] border-2 border-black rounded-lg flex justify-around items-center  pl-3 pr-2 mb-8">
          <Check onClick={handleCheckButton} className="h-4 w-4 mr-3" />
          <p className="font-semibold text-[18px] flex-1">
            쓰담 입출금 통장 상품설명서
          </p>
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </div>

        {step === 1 ? (
          <AgreementStep onNext={handleNext} />
        ) : (
          <AccountLinkingStep />
        )}

        <LongButton
          name="다음"
          color="#2b88d9"
          onClick={handlePage}
          disabled={false}
        />
      </div>
    </>
  );
};

export default Account;

function AgreementStep({ onNext }: { onNext: () => void }) {
  const terms = [
    {
      id: 1,
      title: "상품 이용 약관",
      checked: true,
    },
    {
      id: 2,
      title: "금융상품 가입 전 안내",
      checked: true,
    },
    {
      id: 3,
      title: "안심차단 등록 여부 조회 동의",
      checked: true,
    },
    {
      id: 4,
      title: "불법/탈법 차명거래 금지 설명 확인",
      checked: true,
    },
    {
      id: 5,
      title: "예금자보호법 설명확인",
      checked: true,
    },
  ];

  return (
    <div>
      <div>
        {terms.map((term) => (
          <div
            key={term.id}
            className="flex items-center border border-gray-200 rounded-lg mb-3 w-full h-11 pl-3 pr-2"
          >
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <Check className="h-4 w-4 text-gray-500" size="icon" />
            </div>
            <span className="flex-1">{term.title}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
