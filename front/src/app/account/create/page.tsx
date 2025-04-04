"use client";

import { useState } from "react";
import PageSetting from "@/app/pageSetting";
import PasswordAndRatio from "./passwordAndRatio";
import InsurancePolicy from "./insurePolicy";
// import AccountLinkingStep from "./accountLinking";

export default function CreateAccountPage() {
  const [step, setStep] = useState(1);

  // 개설할 계좌 정보
  // const [accountTypeUniqueNo, setAccountTypeUniqueNo] = useState("");

  // AccountLinkingStep
  const [selectedSavingRate, setSelectedSavingRate] = useState<number>(5);
  const [selectedPassword, setSelectedPassword] = useState<string>("");

  const handleNext = () => {
    setStep(step + 1);
    // console.log("ss", selectedPassword, selectedSavingRate);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <PageSetting pageTitle="쓰담 통장 만들기" headerLink="">
        <div className="flex flex-col bg-white">
          {step === 1 ? (
            <InsurancePolicy onNext={handleNext} />
          ) : step === 2 ? (
            <PasswordAndRatio
              onPrev={handlePrev}
              onNext={handleNext}
              selectedSavingRate={selectedSavingRate}
              setSelectedSavingRate={setSelectedSavingRate}
              selectedPassword={selectedPassword}
              setSelectedPassword={setSelectedPassword}
              accountTypeUniqueNo={accountTypeUniqueNo}
            />
          ) : null}
        </div>
      </PageSetting>
    </>
  );
}
