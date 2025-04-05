"use client";

import { useState } from "react";
import PageSetting from "@/app/pageSetting";
import PasswordAndRatio from "./passwordAndRatio";
import InsurancePolicy from "./insurePolicy";

export default function CreateAccountPage() {
  const [step, setStep] = useState(1);

  // 개설할 계좌 정보
  // const [accountTypeUniqueNo, setAccountTypeUniqueNo] = useState("");

  const [selectedSavingRate, setSelectedSavingRate] = useState<number>(5);
  const [selectedPassword, setSelectedPassword] = useState<string>("");

  const handleNext = () => {
    setStep(step + 1);
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
              // selectedSavingRate={selectedSavingRate}
              // setSelectedSavingRate={setSelectedSavingRate}
              selectedPassword={selectedPassword}
              setSelectedPassword={setSelectedPassword}
            />
          ) : null}
        </div>
      </PageSetting>
    </>
  );
}
