"use client";

import { useState } from "react";
import SignupForm1 from "./components/SignupForm1";
import SignupForm2 from "./components/SignupForm2";

type SignupForm1Data = {
  name: string;
  birth: string;
};

type SignupForm2Data = {
  mobileCarrier: string;
  phoneNumber: string;
};

const SignUpForm = () => {
  const [step, setStep] = useState(1);

  const [SignupForm1Data, setSignupForm1Data] = useState<SignupForm1Data>({
    name: "",
    birth: "",
  });
  const [signupForm2Data, setSignupForm2Data] = useState<SignupForm2Data>({
    mobileCarrier: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleForm1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm1Data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <h2>정보를 입력해주세요</h2>
      </div>
      <SignupForm1 />
      <SignupForm2 />
    </>
  );
};
export default SignUpForm;
