"use client";

import { useState } from "react";
import PageSetting from "@/app/pageSetting";
import PasswordAndRatio from "./passwordAndRatio";
import InsurancePolicy from "./insurePolicy";
import { AuthGuard } from "@/utils/authGuard";

function CreateAccountPage() {
  const [step, setStep] = useState(1);

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
      <PageSetting pageTitle="쓰담 통장 만들기" headerLink="" className="">
        <div className="flex flex-col bg-white">
          {step === 1 ? (
            <InsurancePolicy onNext={handleNext} />
          ) : step === 2 ? (
            <PasswordAndRatio
              onPrev={handlePrev}
              onNext={handleNext}
              selectedPassword={selectedPassword}
              setSelectedPassword={setSelectedPassword}
            />
          ) : null}
        </div>
      </PageSetting>
    </>
  );
}

export default AuthGuard(CreateAccountPage);
