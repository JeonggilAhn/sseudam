"use client";

import React, { useState, useEffect } from "react";
import { DatePickerDemo } from "@/components/ui/datePicker";

type SignupForm1Props = {
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  userInfo1: { name: string; birth: string };
  setUserInfo1: React.Dispatch<
    React.SetStateAction<{ name: string; birth: string }>
  >;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupForm1: React.FC<SignupForm1Props> = ({
  setErrors,
  userInfo1,
  setUserInfo1,
  handleInputChange,
}) => {
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (userInfo1.name.trim() === "") {
      errors.name = "이름을 입력해주세요.";
    }

    if (userInfo1.birth.trim() === "") {
      errors.birth = "생년월일을 입력해주세요.";
    }

    setLocalErrors(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [userInfo1.name, userInfo1.birth]);

  return (
    <>
      <div className="flex flex-col mb-[48px]">
        <label htmlFor="name" className="text-[#7b7b7b] font-bold mb-2">
          이름
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={userInfo1.name}
          onChange={handleInputChange}
          onBlur={validate}
          className="w-80% h-[40px] focus: outline-none text-2xl"
          placeholder="이름을 입력해주세요"
        />
        {!userInfo1.name && localErrors.name && (
          <p className="text-red-500 text-xs">{localErrors.name}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="birth" className="text-[#7b7b7b] font-bold">
          생년월일
        </label>
        <input
          type="date"
          name="birth"
          id="birth"
          value={userInfo1.birth}
          onChange={handleInputChange}
          onBlur={validate}
          className="w-80% h-[40px] outline-none"
        />
        {!userInfo1.birth && localErrors.birth && (
          <p className="text-red-500 text-xs">{localErrors.birth}</p>
        )}
      </div>
      <DatePickerDemo />
    </>
  );
};

export default SignupForm1;
