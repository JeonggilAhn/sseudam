"use client";

import React, { useState, useEffect } from "react";
import { SelectCarrier } from "@/components/ui/customSelect";

type SignupForm2Props = {
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  userInfo2: { mobileCarrier: string; phoneNumber: string };
  setUserInfo2: React.Dispatch<
    React.SetStateAction<{ mobileCarrier: string; phoneNumber: string }>
  >;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

const SignupForm2: React.FC<SignupForm2Props> = ({
  setErrors,
  userInfo2,
  setUserInfo2,
}) => {
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (userInfo2.mobileCarrier.trim() === "") {
      errors.mobileCarrier = "통신사를 선택해주세요.";
    }
    if (
      userInfo2.phoneNumber.trim() === "" ||
      userInfo2.phoneNumber.length < 10
    ) {
      errors.phoneNumber = "전화번호를 입력해주세요.";
    } else if (!/^\d+$/.test(userInfo2.phoneNumber.replace(/-/g, ""))) {
      errors.phoneNumber = "전화번호는 숫자로 입력해주세요";
    }

    setLocalErrors(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatPhoneNumber = (value: string) => {
    const rawValue = value.replace(/[^\d]/g, "");
    if (rawValue.length > 11) {
      return rawValue.slice(0, 11);
    }

    if (rawValue.length > 3 && rawValue.length < 6) {
      return `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    } else if (rawValue.length > 6 && rawValue.length < 11) {
      return `${rawValue.slice(0, 3)}-${rawValue.slice(3, 6)}-${rawValue.slice(6, 11)}`;
    } else if (rawValue.length == 11) {
      return `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7, 12)}`;
    }
  };

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/-/g, "");
    if (value.length > 11) {
      e.preventDefault();
      return;
    }
    const formattedPhoneNumber = formatPhoneNumber(value) || "";
    setUserInfo2((prev) => ({
      ...prev,
      phoneNumber: formattedPhoneNumber.replace(/-/g, ""),
    }));
  };

  useEffect(() => {
    validate();
  }, [userInfo2.mobileCarrier, userInfo2.phoneNumber]);

  return (
    <>
      <div className="flex flex-col mb-[48px]">
        <label
          htmlFor="mobileCarrier"
          className="text-[#7b7b7b]/80 font-bold mb-3"
        >
          통신사
        </label>

        <SelectCarrier
          name="mobileCarrier"
          id="mobileCarrier"
          value={userInfo2.mobileCarrier}
          onChange={(value) => {
            setUserInfo2((prev) => ({
              ...prev,
              mobileCarrier: value,
            }));
          }}
          onBlur={validate}
        />

        {localErrors.mobileCarrier && (
          <p className="text-red-500 text-xs mt-1">
            {localErrors.mobileCarrier}
          </p>
        )}
      </div>

      <div className="flex flex-col mb-[48px]">
        <label
          htmlFor="phoneNumber"
          className="text-[#7b7b7b]/80 font-bold mb-2"
        >
          휴대폰 번호
        </label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={formatPhoneNumber(userInfo2.phoneNumber)}
          onChange={handlePhoneNumber}
          onBlur={validate}
          className="placeholder:text-xl placeholder:font-semibold font-semibold w-[80%] h-[40px] focus: outline-none text-2xl"
          placeholder="010-0000-0000"
        />
        <hr />
        {localErrors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">{localErrors.phoneNumber}</p>
        )}
      </div>
    </>
  );
};

export default SignupForm2;
