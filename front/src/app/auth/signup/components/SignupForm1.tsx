"use client";

import React, { useState } from "react";

type SignupForm1Props = {
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

const SignupForm1: React.FC<SignupForm1Props> = ({ setErrors }) => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const errors: { [key: string]: string } = {};

  const validate = () => {
    if (name.trim() === "") {
      errors.name = "이름을 입력해주세요.";
    }

    if (birth.trim() === "") {
      errors.name = "생년월일을 입력해주세요.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <div>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={validate}
        />
        {!name && errors.name && (
          <p className="text-red-500 text-xs">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="birth">생년월일</label>
        <input
          type="date"
          name="birth"
          id="birth"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          onBlur={validate}
        />
        {!birth && errors.birth && (
          <p className="text-red-500 text-xs">{errors.birth}</p>
        )}
      </div>
    </>
  );
};

export default SignupForm1;
