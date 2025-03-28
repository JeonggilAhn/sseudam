"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { LongButton } from "@/components/ui/customButton";
import { Button } from "@/components/ui/button";

type AgreementStepProps = {
  onNext: () => void;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const InsurancePolicy: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [checked, setChecked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

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
    setChecked(!checked);
  };

  return (
    <>
      <div className="w-full h-[50px] border-2 border-black rounded-lg flex justify-around items-center  pl-3 pr-2 mb-8">
        <div onClick={handleCheckButton}>
          <Check
            className={`h-4 w-4 mr-3 cursor-pointer ${checked ? "text-black" : "text-gray-300"}`}
          />
        </div>
        <p className="font-semibold text-nowrap flex-1">
          쓰담 입출금 통장 상품설명서
        </p>
        <ChevronRight className="h-5 w-5 text-gray-500" />
      </div>

      <AgreementStep onNext={handleNext} setIsAllChecked={setIsAllChecked} />

      <LongButton
        name="다음"
        color="#2b88d9"
        onClick={handlePage}
        disabled={!(checked && isAllChecked)}
      />
    </>
  );
};

export default InsurancePolicy;

const AgreementStep: React.FC<AgreementStepProps> = ({
  onNext,
  setIsAllChecked,
}) => {
  const [terms, setTerms] = useState([
    {
      id: 1,
      title: "상품 이용 약관",
      checked: false,
    },
    {
      id: 2,
      title: "금융상품 가입 전 안내",
      checked: false,
    },
    {
      id: 3,
      title: "안심차단 등록 여부 조회 동의",
      checked: false,
    },
    {
      id: 4,
      title: "불법/탈법 차명거래 금지 설명 확인",
      checked: false,
    },
    {
      id: 5,
      title: "예금자보호법 설명확인",
      checked: false,
    },
  ]);

  const handleCheck = (id: number) => {
    const newTerms = terms.map((term) =>
      term.id === id ? { ...term, checked: !term.checked } : term
    );
    setTerms(newTerms);
  };

  const handleCheckAll = () => {
    const allChecked = terms.every((term) => term.checked);
    const newTerms = terms.map((term) => ({ ...term, checked: !allChecked }));
    setTerms(newTerms);
  };

  useEffect(() => {
    const isAllChecked = terms.every((term) => term.checked);
    setIsAllChecked(isAllChecked);
  }, [terms, setIsAllChecked]);

  return (
    <>
      <div>
        <div>
          {terms.map((term) => (
            <div
              key={term.id}
              className="flex items-center border border-gray-200 rounded-lg mb-3 w-full h-11 pl-3 pr-2"
            >
              <div
                onClick={() => handleCheck(term.id)}
                className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-3"
              >
                <Check
                  className={`h-4 w-4 cursor-pointer ${term.checked ? "text-black" : "text-white font-bold"}`}
                  size="icon"
                />
              </div>
              <span className="flex-1 text-nowrap text-[13px]">
                {term.title}
              </span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          ))}
          <div
            className="flex justify-end items-center"
            onClick={handleCheckAll}
          >
            <Button variant="link" className="mr-0 pr-0.5 cursor-pointer">
              모두 선택
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
