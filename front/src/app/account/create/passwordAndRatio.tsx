"use client";

import React, { useState } from "react";
import { RateBar } from "../components/savingRate";
import { LongButton } from "@/components/ui/customButton";
import { InputPassword } from "../components/selectNumber";

function PasswordAndRatio() {
  const [selectedSavingRate, setSelectedSavingRate] = useState<number>(5);

  return (
    <>
      <div className="flex justify-center items-center mt-[-30px]">
        <img src="/icons/logo.svg" alt="SSD_logo" className="w-40 mb-[20px]" />
      </div>

      <div className="flex justify-center flex-col mb-[48px]">
        <label htmlFor="" className="text-[#7b7b7b]/80 font-bold mb-5">
          통장 비밀번호 설정
        </label>
        <InputPassword />
      </div>

      <div className="flex justify-center flex-col">
        <RateBar
          selectedSavingRate={selectedSavingRate}
          setSelectedSavingRate={setSelectedSavingRate}
        />
      </div>

      <LongButton name="다음" />
    </>
  );
}
export default PasswordAndRatio;
