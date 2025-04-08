"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import NumericKeypad from "./numeric-keypad";

type InputPasswordProps = {
  selectedPassword: string;
  setSelectedPassword: React.Dispatch<React.SetStateAction<string>>;
  isValue: boolean;
  setIsValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export function InputPassword({
  setSelectedPassword,
  setIsValue,
}: InputPasswordProps) {
  const [showKeypad, setShowKeypad] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleOpenKeypad = () => {
    setShowKeypad(true);
    setVerificationCode("");
    setIsValue(false);
  };

  const handleKeypadClose = () => {
    setShowKeypad(false);
  };

  const handleKeypadConfirm = (value: string) => {
    setVerificationCode(value);
    setShowKeypad(false);
    setSelectedPassword(value);
    setIsValue(true);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="flex items-center justify-center w-[90%] h-[50px] border-3 border-[#2b88d9] rounded-lg"
          onClick={handleOpenKeypad}
        >
          <div className="flex">
            {verificationCode ? (
              Array.from({ length: verificationCode.length }).map(
                (_, index) => (
                  <img
                    src="/icons/icon_Coin.svg"
                    alt="coin_img"
                    className="w-6 h-6 mr-2"
                    key={index}
                  />
                )
              )
            ) : (
              <div className="flex items-center justify-center mt-1 font-bold text-2xl tracking-widest">
                * * * *
              </div>
            )}
          </div>
        </div>
      </div>

      {showKeypad && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/60 bg-opacity-50 z-50 flex items-end justify-center">
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
    </>
  );
}
