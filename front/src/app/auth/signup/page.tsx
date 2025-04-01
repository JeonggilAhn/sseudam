"use client";

// import { useEffect, useState } from "react";
import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import SignupForm1 from "./SignupForm1";
import SignupForm2 from "./SignupForm2";

import {
  // ButtonLoading,
  LongButton,
  ShortButton,
} from "@/components/ui/customButton";
// import next from "next";

const SignUpForm = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
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

  // 개발용 (새로고침 시, 첫페이지로 넘어가지 않게 막아줌)
  // useEffect(() => {
  //   const step = searchParams.get("step");
  //   if (step) {
  //     setStep(Number(step));
  //   }
  // }, [searchParams]);

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
    // queryStep
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      router.push(`?step=${prevStep}`);
    }
  };

  const handleNextSteps = () => {
    // queryStep
    if (Object.keys(errors).length > 0) return;
    const nextStep = step + 1;
    setStep(nextStep);
    router.push(`?step=${nextStep}`);
  };

  const handleLastSteps = () => {
    if (Object.keys(errors).length > 0) return;

    const finalUserInfo = { ...userInfo1, ...userInfo2 };
    console.log("완료되었습니다.", JSON.stringify(finalUserInfo));
    router.push("success");
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
              <LongButton
                name="다음"
                color="#2b88d9"
                onClick={handleNextSteps}
                disabled={Object.keys(errors).length > 0}
              />
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
              <div className="absolute bottom-20 w-[80%]">
                <div className="flex justify-around space-x-10">
                  <ShortButton
                    variant="outline"
                    name="이전"
                    onClick={handlePrevSteps}
                    // style={{ width: "120px" }}
                  ></ShortButton>

                  <ShortButton
                    onClick={handleLastSteps}
                    disabled={Object.keys(errors).length > 0}
                    name="확인"
                    color="#2b88d9"
                    // style={{ width: "120px" }}
                  ></ShortButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default SignUpForm;
