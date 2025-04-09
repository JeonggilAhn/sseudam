"use client";

import React, { useState, useEffect } from "react";
import { SelectBank } from "@/components/ui/customSelect";
import { RateBar } from "@/app/account/components/savingRate";

type SignupForm3Props = {
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  selectedSavingRate: number;
  setSelectedSavingRate: React.Dispatch<React.SetStateAction<number>>;

  userInfo3: {
    bankList: string;
    withdrawAccountNo: string;
  };
  setUserInfo3: React.Dispatch<
    React.SetStateAction<{
      bankList: string;
      withdrawAccountNo: string;
    }>
  >;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

const SignupForm3: React.FC<SignupForm3Props> = ({
  setErrors,
  userInfo3,
  setUserInfo3,
  selectedSavingRate,
  setSelectedSavingRate,
}) => {
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (userInfo3.bankList.trim() === "") {
      errors.bankList = "은행을 선택해주세요.";
    }
    if (userInfo3.withdrawAccountNo.trim() === "" || userInfo3.withdrawAccountNo.length < 10) {
      errors.withdrawAccountNo = "계좌번호를 입력해주세요.";
    } else if (!/^\d+$/.test(userInfo3.withdrawAccountNo.replace(/-/g, ""))) {
      errors.withdrawAccountNo = "계좌번호는 숫자로 입력해주세요";
    }

    setLocalErrors(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 은행별로 계좌번호 표시형식 변경 (나중)
  const formatAccountNumber = (value: string) => {
    const rawValue = value.replace(/[^\d]/g, "");
    if (rawValue.length > 16) {
      return rawValue.slice(0, 16);
    }

    if (rawValue.length > 7 && rawValue.length < 9) {
      return `${rawValue.slice(0, 7)}-${rawValue.slice(7)}`;
    } else if (rawValue.length > 9 && rawValue.length < 16) {
      return `${rawValue.slice(0, 7)}-${rawValue.slice(7, 9)}-${rawValue.slice(9, 16)}`;
    } else if (rawValue.length == 16) {
      return `${rawValue.slice(0, 7)}-${rawValue.slice(7, 9)}-${rawValue.slice(9, 17)}`;
    }
  };

  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/-/g, "");
    if (value.length > 16) {
      e.preventDefault();
      return;
    }
    const formattedWithdrawAccountNo = formatAccountNumber(value) || "";
    setUserInfo3((prev) => ({
      ...prev,
      withdrawAccountNo: formattedWithdrawAccountNo.replace(/-/g, ""),
    }));
  };

  useEffect(() => {
    validate();
  }, [userInfo3.bankList, userInfo3.withdrawAccountNo]);

  return (
    <>
      <div className="flex flex-col mb-[48px]">
        <label htmlFor="bankList" className="text-[#7b7b7b]/80 font-bold mb-3">
          연결 은행
        </label>

        <SelectBank
          name="bankList"
          id="bankList"
          value={userInfo3.bankList}
          onChange={(value) => {
            setUserInfo3((prev) => ({
              ...prev,
              bankList: value,
            }));
          }}
          onBlur={validate}
        />

        {localErrors.bankList && (
          <p className="text-red-500 text-xs mt-1">{localErrors.bankList}</p>
        )}
      </div>

      <div className="flex flex-col mb-[48px]">
        <label htmlFor="withdrawAccountNo" className="text-[#7b7b7b]/80 font-bold mb-2">
          연결 계좌번호
        </label>
        <input
          type="text"
          name="withdrawAccountNo"
          id="withdrawAccountNo"
          value={formatAccountNumber(userInfo3.withdrawAccountNo ?? "")}
          onChange={handleAccountNumber}
          onBlur={validate}
          className="placeholder:text-xl placeholder:font-semibold font-semibold w-[80%] h-[40px] focus: outline-none text-xl"
          placeholder="계좌번호를 입력해주세요"
        />
        <hr />
        {localErrors.withdrawAccountNo && (
          <p className="text-red-500 text-xs mt-1">{localErrors.withdrawAccountNo}</p>
        )}
      </div>

      <div>
        <RateBar
          selectedSavingRate={selectedSavingRate}
          setSelectedSavingRate={setSelectedSavingRate}
        />
      </div>
    </>
  );
};

export default SignupForm3;
