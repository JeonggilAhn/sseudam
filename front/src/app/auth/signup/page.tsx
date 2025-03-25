"use client";

import { useState } from "react";
import SignupForm1 from "./components/SignupForm1";
import SignupForm2 from "./components/SignupForm2";

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
      <div className="mt-[80px] pl-[32px] pr-[32px]">
        <div className="w-[90px] h-[6px] bg-[#BDE3F2] mb-[40px]">
          <div
            className={"w-[45px] h-[6px] bg-[#2b88d9]"}
            style={{ marginLeft: step === 1 ? "0" : "50%" }}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-[60px]">회원가입</h1>
        </div>

        {step === 1 && (
          <>
            <SignupForm1
              setErrors={setErrors}
              userInfo1={userInfo1}
              setUserInfo1={setUserInfo1}
              handleInputChange={handleInputChange1}
            />
            <button
              onClick={handleNextSteps}
              disabled={Object.keys(errors).length > 0}
            >
              다음
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
            <button onClick={handlePrevSteps}>이전</button>
            <button
              onClick={handleLastSteps}
              disabled={Object.keys(errors).length > 0}
            >
              확인
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default SignUpForm;
