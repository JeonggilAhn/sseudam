"use client";

import React, { useState, useEffect } from "react";

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
  handleInputChange,
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
    let value = e.target.value.replace(/-/g, "");
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
      <div>
        <div>
          <label htmlFor="mobileCarrier">통신사</label>
          <select
            name="mobileCarrier"
            id="mobileCarrier"
            value={userInfo2.mobileCarrier}
            onChange={handleInputChange}
            onBlur={validate}
          >
            <option value="">-- 선택해주세요 --</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LG U+">LG U+</option>
            <option value="SKT 알뜰폰">SKT 알뜰폰</option>
            <option value="KT 알뜰폰">KT 알뜰폰</option>
            <option value="LG U+ 알뜰폰">LG U+ 알뜰폰</option>
          </select>

          {!userInfo2.mobileCarrier && localErrors.mobileCarrier && (
            <p className="text-red-500 text-xs">{localErrors.mobileCarrier}</p>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber">휴대폰 번호</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={formatPhoneNumber(userInfo2.phoneNumber)}
            // onChange={handleInputChange}
            onChange={handlePhoneNumber}
            onBlur={validate}
          />
          {localErrors.phoneNumber && (
            <p className="text-red-500 text-xs">{localErrors.phoneNumber}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupForm2;
