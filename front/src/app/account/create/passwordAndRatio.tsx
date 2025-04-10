"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShortButton } from "@/components/ui/customButton";
import { InputPassword } from "../components/selectNumber";
import { postAccount } from "../api/postAccount";
import { RateBar } from "../components/savingRate";
import { patchSavingSettings } from "../api/patchSavingSettings";
import { getUserInfo } from "@/app/user/api/getUserInfo";

type PasswordAndRatioProps = {
  onPrev: () => void;
  onNext: () => void;
  selectedPassword: string;
  setSelectedPassword: React.Dispatch<React.SetStateAction<string>>;
};

const PasswordAndRatio: React.FC<PasswordAndRatioProps> = ({
  onPrev,
  selectedPassword,
  setSelectedPassword,
}) => {
  const router = useRouter();
  const [isValue, setIsValue] = useState(false);
  const [selectedSavingRate, setSelectedSavingRate] = useState<number>(10);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        if (response?.status === 200) {
          setSelectedSavingRate(response.data.content.savingRate);
        } else {
          setError("응답 데이터가 없습니다.");
        }
      } catch (error) {
        console.error(error);
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
      }
    };
    fetchUserInfo();
  }, []);

  const handleLastBtn = async () => {
    const data = {
      savingRate: selectedSavingRate,
    };
    try {
      const result = await patchSavingSettings(data);
      // console.log("res", result, JSON.stringify(data));
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      try {
        const postedAccount = await postAccount();
        // console.log("res", postedAccount);
        if (postedAccount?.status === 200) {
          router.push("/account/create/success");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-[-30px]">
        <img src="/icons/logo.svg" alt="SSD_logo" className="w-40 mb-[20px]" />
      </div>

      <div className="flex justify-center flex-col mb-[48px]">
        <label htmlFor="" className="text-[#7b7b7b]/80 font-bold mb-5">
          통장 비밀번호 설정
        </label>
        <InputPassword
          selectedPassword={selectedPassword}
          setSelectedPassword={setSelectedPassword}
          isValue={isValue}
          setIsValue={setIsValue}
        />
      </div>
      <div>
        <RateBar
          selectedSavingRate={selectedSavingRate}
          setSelectedSavingRate={setSelectedSavingRate}
        />
      </div>

      <div className="mt-auto absolute bottom-20 w-[80%]">
        <div className="flex w-[80%] justify-evenly gap-30">
          <ShortButton
            name="이전"
            variant="outline"
            style={{ width: "100px" }}
            onClick={onPrev}
          />
          <ShortButton
            name="확인"
            color="#2b88d9"
            style={{ width: "180px" }}
            onClick={handleLastBtn}
            disabled={!isValue}
          />
        </div>
      </div>
    </>
  );
};
export default PasswordAndRatio;
