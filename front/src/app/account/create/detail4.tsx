"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NumericKeypad from "../components/numeric-keypad";

export default function CreateAccountPage() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 상태 표시줄 */}
      <div className="bg-white p-4 flex justify-between items-center">
        <div className="text-black text-sm">9:41</div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.01 21C16.43 21 20.01 17.42 20.01 13C20.01 8.58 16.43 5 12.01 5C7.59 5 4.01 8.58 4.01 13C4.01 17.42 7.59 21 12.01 21Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="w-4 h-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="w-6 h-3 bg-black rounded-sm"></div>
        </div>
      </div>

      {/* 헤더 */}
      <header className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-0 mr-2"
            onClick={handleBack}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">쓰담 통장 만들기</h1>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400">
          취소
        </Button>
      </header>

      {/* 단계별 컨텐츠 */}
      {step === 1 ? (
        <TermsAgreementStep onNext={handleNext} />
      ) : (
        <AccountLinkingStep />
      )}

      {/* 하단 네비게이션 */}
      <div className="border-t border-gray-200 py-2 bg-white">
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="12"
                  rx="2"
                  stroke="black"
                  strokeWidth="2"
                />
                <path d="M3 10H21" stroke="black" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-xs">Savings</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="8" r="4" stroke="black" strokeWidth="2" />
                <path
                  d="M20 19C20 22 16.42 22 12 22C7.58 22 4 22 4 19C4 16 7.58 14 12 14C16.42 14 20 16 20 19Z"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="text-xs">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TermsAgreementStep({ onNext }: { onNext: () => void }) {
  const terms = [
    {
      id: 1,
      title: "쓰담 입출금통장 상품설명서",
      checked: true,
    },
    {
      id: 2,
      title: "상품 이용약관",
      checked: true,
    },
    {
      id: 3,
      title: "금융상품 개인 전 안내",
      checked: true,
    },
    {
      id: 4,
      title: "안심차단 등록 여부 조회 동의",
      checked: true,
    },
    {
      id: 5,
      title: "불법/탈법 자금거래 금지 설명 확인",
      checked: true,
    },
    {
      id: 6,
      title: "예금자보호법 설명확인",
      checked: true,
    },
  ];

  return (
    <div className="flex-1 p-4 flex flex-col">
      <div className="flex-1">
        {terms.map((term) => (
          <div
            key={term.id}
            className="flex items-center p-4 border border-gray-200 rounded-lg mb-3"
          >
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <Check className="h-3 w-3 text-gray-500" />
            </div>
            <span className="flex-1">{term.title}</span>
            <ChevronRight className="h-5 w-5 text-gray-300" />
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <Button
          className="w-full h-14 text-lg font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

function AccountLinkingStep() {
  const [showKeypad, setShowKeypad] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleOpenKeypad = () => {
    setShowKeypad(true);
  };

  const handleKeypadConfirm = (value: string) => {
    setVerificationCode(value);
    setShowKeypad(false);
  };

  const handleKeypadClose = () => {
    setShowKeypad(false);
  };

  return (
    <div className="flex-1 p-4 flex flex-col">
      <div className="mb-6">
        <p className="text-gray-500 mb-1">쓰담과 연결할 계좌번호</p>
        <Input
          placeholder="저축에 활용할 계좌번호 입력"
          className="border-b border-gray-300 rounded-none focus:ring-0 px-0 py-2"
        />
      </div>

      <div className="mb-8">
        <p className="text-gray-500 mb-1">은행선택</p>
        <Select>
          <SelectTrigger className="border-b border-gray-300 rounded-none focus:ring-0 px-0 py-2">
            <SelectValue placeholder="은행선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kb">KB국민은행</SelectItem>
            <SelectItem value="shinhan">신한은행</SelectItem>
            <SelectItem value="woori">우리은행</SelectItem>
            <SelectItem value="hana">하나은행</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-8">
        <p className="font-medium mb-2">타행계좌 확인</p>
        <p className="text-sm text-gray-500 mb-4">
          입력하신 계좌로 1원을 보내드렸습니다.
          <br />
          입금자에 표시된 번호를 입력해주세요.
        </p>
        <div
          className="border border-blue-500 rounded-lg p-3 flex justify-between items-center mb-4 cursor-pointer"
          onClick={handleOpenKeypad}
        >
          <div className="flex">
            {verificationCode ? (
              Array.from({ length: verificationCode.length }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center mx-1 text-sm"
                  >
                    $
                  </div>
                )
              )
            ) : (
              <div className="flex items-center justify-center mx-1 text-xl font-bold tracking-widest">
                ****
              </div>
            )}
          </div>
        </div>
        <Button
          className={`w-full h-12 rounded-md mb-3 ${
            verificationCode.length === 4
              ? "bg-gray-800 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
          disabled={verificationCode.length !== 4}
        >
          확인
        </Button>
      </div>

      <div className="mt-auto">
        <Button className="w-full h-14 text-lg font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md">
          확인
        </Button>
      </div>

      {/* 키패드 모달 */}
      {showKeypad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-xl w-full p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">인증번호 입력</h3>
              <Button variant="ghost" size="sm" onClick={handleKeypadClose}>
                취소
              </Button>
            </div>
            <NumericKeypad
              onConfirm={handleKeypadConfirm}
              maxLength={4}
              showValue={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
