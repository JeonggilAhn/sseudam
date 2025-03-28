"use client";

import React, { useState } from "react";
import SelectSavingRate from "../components/savingRate";
import PageSetting from "@/app/pageSetting";
import { LongButton } from "@/components/ui/customButton";

export default function Accounts() {
  const [selectedBankBook, setSelectedBankBook] = useState<string | null>(null);
  const [selectedSavingRate, setSelectedSavingRate] = useState<number>(5);

  const handleConfirm = () => {
    const data = {
      selectedBankBook,
      selectedSavingRate,
    };
    console.log(JSON.stringify(data));
    // console.log(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <PageSetting
        headerName="마이페이지"
        pageTitle="저축 비율 설정"
        headerLink="/"
      >
        <SelectSavingRate
          selectedBankBook={selectedBankBook}
          setSelectedBankBook={setSelectedBankBook}
          selectedSavingRate={selectedSavingRate}
          setSelectedSavingRate={setSelectedSavingRate}
        />
      </PageSetting>

      <LongButton name="확인" onClick={handleConfirm} />
    </>
  );
}
