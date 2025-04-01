"use client";

import { useState } from "react";
// import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { ChevronLeft } from "lucide-react";
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
import InsurancePolicy from "./insurePolicy";

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
      {step === 1 ? (
        <InsurancePolicy onNext={handleNext} />
      ) : (
        <AccountLinkingStep />
      )}
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
