"use client";

import { useState } from "react";
import SignupForm1 from "./components/SignupForm1";
import SignupForm2 from "./components/SignupForm2";

import {
  ButtonLoading,
  LongButton,
  ShortButton,
  ShortOutlineButton,
} from "@/components/ui/customButton";

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [userInfo1, setUserInfo1] = useState({
    name: "",
    birth: "",
  });
  const [userInfo2, setUserInfo2] = useState({
    mobileCarrier: "",
    phoneNumber: "",
  });

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo1((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange2 = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserInfo2((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //pageNation
  const handlePrevSteps = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNextSteps = () => {
    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };

  const handleLastSteps = () => {
    if (Object.keys(errors).length > 0) return;

    const finalUserInfo = { ...userInfo1, ...userInfo2 };
    console.log("완료되었습니다.", JSON.stringify(finalUserInfo));
  };

  return (
    <>
      <div className="mt-[80px] ml-8 mr-8">
        <div className="w-[90px] h-[6px] bg-[#BDE3F2] mb-8">
          <div
            className={"w-[45px] h-[6px] bg-[#2b88d9]"}
            style={{ marginLeft: step === 1 ? "0" : "50%" }}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-[60px]">회원가입</h1>
        </div>

        <div className="ml-2 mr-2">
          {step === 1 && (
            <>
              <SignupForm1
                setErrors={setErrors}
                userInfo1={userInfo1}
                setUserInfo1={setUserInfo1}
                handleInputChange={handleInputChange1}
              />
              {/* <ButtonLoading /> */}
              <button onClick={handleNextSteps}>
                <LongButton
                  name="다음"
                  color="#2b88d9"
                  disabled={Object.keys(errors).length > 0}
                />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <SignupForm2
                setErrors={setErrors}
                userInfo2={userInfo2}
                setUserInfo2={setUserInfo2}
                handleInputChange={handleInputChange2}
              />
              <div className="w-full flex gap-1 justify-center">
                <button onClick={handlePrevSteps}>
                  <ShortOutlineButton name="이전"></ShortOutlineButton>
                </button>
                <button
                  onClick={handleLastSteps}
                  disabled={Object.keys(errors).length > 0}
                >
                  <ShortButton name="확인" color="#2b88d9"></ShortButton>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default SignUpForm;
