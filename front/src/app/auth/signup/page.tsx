"use client";

import { useState } from "react";
import SignupForm1 from "./components/SignupForm1";
import SignupForm2 from "./components/SignupForm2";

// <회원가입 로직>
// 우선 구글 OAuth로 로그인 하고 들어옴.
// -> 이때 사용자 정보가 DB에 저장되어 있는지 판별한 후 회원가입 여부에 따라 분기처리해서 리다이렉트 페이지를 바꾸기

// 회원가입폼 1 입력 -> 회원가입폼 2 입력 (만약 전화번호 확인 기능 쓸거면 해당 부분에 위치시키기)
// -> 약관동의 완료 후 확인 누르면 -> 알림수신 동의 모달이 뜨고 -> 알림수신 동의하면 회원가입 완료 페이지로 이동 (만약 알림수신 동의 안 하고 다음페이지로 넘어가려고 하면, 알림 수신 동의 여부 판별해서 모달창 계속 띄우기(안하면 못 넘어감ㅎ))
// -> 회원가입 완료 페이지에서 시작하기 누르면 메인페이지로 이동

// type SignupForm1Data = {
//   name: string;
//   birth: string;
// };

// type SignupForm2Data = {
//   mobileCarrier: string;
//   phoneNumber: string;
// };

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    console.log("완료되었습니다.");
  };

  return (
    <>
      <div>
        <h2>회원가입</h2>
      </div>

      {step === 1 && (
        <>
          <SignupForm1 setErrors={setErrors} />
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
          <SignupForm2 setErrors={setErrors} />
          <button onClick={handlePrevSteps}>이전</button>
          <button
            onClick={handleLastSteps}
            disabled={Object.keys(errors).length > 0}
          >
            확인
          </button>
        </>
      )}
    </>
  );
};
export default SignUpForm;
