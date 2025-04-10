"use client";

import React, { useState, useEffect } from "react";
import { getUserInfo } from "@/app/user/api/getUserInfo";
import PageSetting from "@/app/pageSetting";
import { patchSavingSettings } from "../api/patchSavingSettings";
import { LongButton } from "@/components/ui/customButton";
import SignupForm3 from "@/app/auth/signup/SignupForm3";
import { AuthGuard } from "@/utils/authGuard";

interface UserInfo {
  userEmail: "string";
  userName: "string";
  userBirthday: "string";
  piggyAccountNo: "string";
  savingRate: "string";
  withdrawAccountNo: "string";
  signupDate: "string";
}

function Accounts() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedSavingRate, setSelectedSavingRate] = useState<number>(
    userInfo?.savingRate ? Number(userInfo.savingRate) : 10
  );
  const [disable, setDisable] = useState(true);

  const [userInfo3, setUserInfo3] = useState({
    bankList: "싸피은행",
    withdrawAccountNo: "0000000000000012",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        if (response?.status === 200) {
          console.log("res", response);
          setUserInfo(response.data.content);
          setSelectedSavingRate(Number(response.data.content.savingRate));

          setUserInfo3({
            bankList: "싸피은행",
            withdrawAccountNo:
              response.data.content.withdrawAccountNo || "0000000000000012",
          });
        } else {
          setError("응답 데이터가 없습니다.");
        }
      } catch (error) {
        console.log(error);
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (
      userInfo &&
      (userInfo3.withdrawAccountNo !== userInfo.withdrawAccountNo ||
        selectedSavingRate !== Number(userInfo.savingRate))
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [userInfo3, selectedSavingRate, userInfo]);

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

  const handleConfirm = async () => {
    const data = {
      withdrawAccountNo: userInfo3.withdrawAccountNo,
      savingRate: selectedSavingRate,
    };
    console.log("type: ", typeof data.savingRate);

    try {
      const result = await patchSavingSettings(data);
      console.log("res", result, JSON.stringify(data));
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setDisable(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <PageSetting headerName="이전" pageTitle="저축 설정" headerLink="back">
        <div className="flex flex-col mb-[36px] mt-[-20px]">
          <label htmlFor="" className="text-[#7b7b7b]/80 font-bold mb-3">
            쓰담 계좌 번호
          </label>
          <span className="font-semibold text-xl">
            {formatAccountNumber(userInfo?.piggyAccountNo || "")}
          </span>
        </div>

        <SignupForm3
          setErrors={setErrors}
          userInfo3={userInfo3}
          setUserInfo3={setUserInfo3}
          handleInputChange={handleInputChange3}
          selectedSavingRate={selectedSavingRate}
          setSelectedSavingRate={setSelectedSavingRate}
        />
      </PageSetting>

      <LongButton name="확인" onClick={handleConfirm} disabled={disable} />
    </>
  );
}

export default AuthGuard(Accounts);
