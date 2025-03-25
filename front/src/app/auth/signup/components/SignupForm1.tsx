"use client";

import React, { useState, useEffect } from "react";

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
      <div>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          id="name"
          value={userInfo1.name}
          onChange={handleInputChange}
          onBlur={validate}
        />
        {!userInfo1.name && localErrors.name && (
          <p className="text-red-500 text-xs">{localErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="birth">생년월일</label>
        <input
          type="date"
          name="birth"
          id="birth"
          value={userInfo1.birth}
          onChange={handleInputChange}
          onBlur={validate}
        />
        {!userInfo1.birth && localErrors.birth && (
          <p className="text-red-500 text-xs">{localErrors.birth}</p>
        )}
      </div>
    </>
  );
};

export default SignupForm1;
