"use client";

import React, { useState, useEffect } from "react";
// import SelectSavingRate from "../components/savingRate";
// import { RateBar } from "../components/savingRate";
import { getUserInfo } from "@/app/user/api/getUserInfo";
import PageSetting from "@/app/pageSetting";
import { patchSavingSettings } from "../api/patchSavingSettings";
import { LongButton } from "@/components/ui/customButton";
import SignupForm3 from "@/app/auth/signup/SignupForm3";

interface UserInfo {
  user_email: "string";
  user_name: "string";
  user_birthday: "string";
  piggy_account_no: "string";
  saving_rate: "string";
  withdraw_account_no: "string";
  signup_date: "string";
}

export default function Accounts() {
  // 사용자의 정보에서 미리 연결은행과 계좌번호 받아오기 (그걸로 기본 세팅)
  // const [selectedBankBook, setSelectedBankBook] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedSavingRate, setSelectedSavingRate] = useState<number>(
    userInfo?.saving_rate ? Number(userInfo.saving_rate) : 10
  );

  const [userInfo3, setUserInfo3] = useState({
    bankList: "싸피은행",
    withdrawAccountNo: "0000000000000012",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        if (response?.status === 200) {
          console.log(response);
          setUserInfo(response.data.content);
          setSelectedSavingRate(Number(response.data.content.saving_rate));

          setUserInfo3({
            // ...userInfo3,
            bankList: "싸피은행",
            withdrawAccountNo:
              response.data.content.withdraw_account_no || "0000000000000012",
          });
        } else {
          setError("응답 데이터가 없습니다.");
        }
      } catch (error) {
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

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
      // selectedBankBook,
      withdraw_account_no: userInfo3.withdrawAccountNo,
      saving_rate: selectedSavingRate,
    };
    console.log("type: ", typeof data.saving_rate);

    try {
      const result = await patchSavingSettings(data);
      console.log(result, JSON.stringify(data));
    } catch (error) {
      console.error("Error updating data:", error);
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
      <PageSetting
        headerName="마이페이지"
        pageTitle="저축 설정"
        headerLink="/user"
        className="overflow-y-auto"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="scroll-smooth scrollbar-hide">
          <div className="flex flex-col mb-[48px] mt-[-15px]">
            <label htmlFor="" className="text-[#7b7b7b]/80 font-bold mb-3">
              쓰담 계좌 번호
            </label>
            <span className="font-semibold text-xl">
              {formatAccountNumber(userInfo?.piggy_account_no || "")}
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
        </div>
      </PageSetting>

      <LongButton name="확인" onClick={handleConfirm} />
    </>
  );
}
