"use client";

import React, { useState } from "react";
import { RateBar } from "../components/savingRate";
import { ShortButton } from "@/components/ui/customButton";
import { InputPassword } from "../components/selectNumber";

type PasswordAndRatioProps = {
  onPrev: () => void;
  onNext: () => void;
  selectedSavingRate: number;
  setSelectedSavingRate: React.Dispatch<React.SetStateAction<number>>;
  selectedPassword: string;
  setSelectedPassword: React.Dispatch<React.SetStateAction<string>>;
};

const PasswordAndRatio: React.FC<PasswordAndRatioProps> = ({
  onPrev,
  onNext,
  selectedSavingRate,
  selectedPassword,
  setSelectedPassword,
  setSelectedSavingRate,
}) => {
  // const [selectedSavingRate, setSelectedSavingRate] = useState<number>(5);
  // const [selectedPassword, setSelectedPassword] = useState<string>("");

  return (
    <>
      <div className="flex justify-center items-center mt-[-30px]">
        <img src="/icons/logo.svg" alt="SSD_logo" className="w-40 mb-[20px]" />
      </div>

      <div className="flex justify-center flex-col mb-[48px]">
        <label htmlFor="" className="text-[#7b7b7b]/80 font-bold mb-5">
          통장 비밀번호 설정
        </label>
        <InputPassword
          selectedPassword={selectedPassword}
          setSelectedPassword={setSelectedPassword}
        />
      </div>

      <div className="flex justify-center flex-col">
        <RateBar
          selectedSavingRate={selectedSavingRate}
          setSelectedSavingRate={setSelectedSavingRate}
        />
      </div>

      <div className="mt-auto absolute bottom-20 w-[80%]">
        <div className="flex justify-center space-x-6">
          <ShortButton
            name="이전"
            variant="outline"
            style={{ width: "100px" }}
            onClick={onPrev}
          />
          <ShortButton
            name="다음"
            color="#2b88d9"
            style={{ width: "180px" }}
            onClick={onNext}
          />
        </div>
      </div>
    </>
  );
};
export default PasswordAndRatio;
