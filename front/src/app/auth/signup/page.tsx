"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SignupForm1 from "./SignupForm1";
import SignupForm2 from "./SignupForm2";
import SignupForm3 from "./SignupForm3";

import { LongButton, ShortButton } from "@/components/ui/customButton";
import { postSignup } from "../api/postSignup";

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedSavingRate, setSelectedSavingRate] = useState<number>(5);

  const [userInfo1, setUserInfo1] = useState({
    name: "",
    birthday: "",
  });
  const [userInfo2, setUserInfo2] = useState({
    mobileCarrier: "",
    phoneNumber: "",
  });
  const [userInfo3, setUserInfo3] = useState({
    bankList: "",
    withdrawAccountNo: "",
  });

  // 개발용 (새로고침 시, 첫페이지로 넘어가지 않게 막아줌)
  useEffect(() => {
    const step = searchParams.get("step");
    if (step) {
      setStep(Number(step));
    }
  }, [searchParams]);

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

  const handleLastSteps = async () => {
    if (Object.keys(errors).length > 0) return;

    const data = {
      ...userInfo1,
      withdrawAccountNo: userInfo3.withdrawAccountNo,
      savingRate: selectedSavingRate,
    };

    try {
      const postedSignup = await postSignup(data);
      console.log("회원가입 성공", postedSignup, JSON.stringify(data));
      router.push("success");
    } catch (error) {
      console.log("회원가입 실패", error);
    }

    // const finalUserInfo = { ...userInfo1, ...userInfo2 };
    // console.log("완료되었습니다.", JSON.stringify(finalUserInfo));
  };

  return (
    <>
      <div className="mt-[80px] ml-8 mr-8">
        <div className="w-[120px] h-[6px] bg-[#BDE3F2] mb-8">
          <div
            className={"w-[45px] h-[6px] bg-[#2b88d9]"}
            style={{
              marginLeft:
                step === 1
                  ? "0"
                  : step === 2
                    ? "30%"
                    : step === 3
                      ? "70%"
                      : "10%",
            }}
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
                  ></ShortButton>

                  <ShortButton
                    onClick={handleNextSteps}
                    disabled={Object.keys(errors).length > 0}
                    name="다음"
                    color="#2b88d9"
                  ></ShortButton>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <SignupForm3
                setErrors={setErrors}
                userInfo3={userInfo3}
                setUserInfo3={setUserInfo3}
                handleInputChange={handleInputChange3}
                selectedSavingRate={selectedSavingRate}
                setSelectedSavingRate={setSelectedSavingRate}
              />
              <div className="absolute bottom-20 w-[80%]">
                <div className="flex justify-around space-x-10">
                  <ShortButton
                    variant="outline"
                    name="이전"
                    onClick={handlePrevSteps}
                  ></ShortButton>

                  <ShortButton
                    onClick={handleLastSteps}
                    disabled={Object.keys(errors).length > 0}
                    name="확인"
                    color="#2b88d9"
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
