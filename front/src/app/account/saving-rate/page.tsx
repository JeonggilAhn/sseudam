"use client";

import React, { useState } from "react";
// import SelectSavingRate from "../components/savingRate";
// import { RateBar } from "../components/savingRate";
import PageSetting from "@/app/pageSetting";
import { patchSavingSettings } from "../api/patchSavingSettings";
import { LongButton } from "@/components/ui/customButton";
import SignupForm3 from "@/app/auth/signup/SignupForm3";

export default function Accounts() {
  // 사용자의 정보에서 미리 연결은행과 계좌번호 받아오기 (그걸로 기본 세팅)
  // const [selectedBankBook, setSelectedBankBook] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedSavingRate, setSelectedSavingRate] = useState<number>(10);

  const [userInfo3, setUserInfo3] = useState({
    // 사용자의 정보에서 미리 연결은행과 계좌번호 받아오기 (그걸로 기본 세팅)
    bankList: "싸피은행",
    withdrawAccountNo: "0000000000000000",
  });

  const handleInputChange3 = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserInfo3((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = async() => {

    const data = {
      // selectedBankBook,
      withdrawAccountNo: userInfo3.withdrawAccountNo,
      selectedSavingRate,
    };

    try {
      const result = await patchSavingSettings(data)
      console.log(result, JSON.stringify(data))
    } catch (error){
      console.error("Error updating data:", error)
    }
  };

  return (
    <>
      <PageSetting
        headerName="마이페이지"
        pageTitle="저축 설정"
        headerLink="user"
      >
        <SignupForm3
          setErrors={setErrors}
          userInfo3={userInfo3}
          setUserInfo3={setUserInfo3}
          handleInputChange={handleInputChange3}
          selectedSavingRate={selectedSavingRate}
          setSelectedSavingRate={setSelectedSavingRate}
        />

      </PageSetting>

      <LongButton name="확인" onClick={handleConfirm} />
    </>
  );
}
