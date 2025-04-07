"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShortButton } from "@/components/ui/customButton";
import { InputPassword } from "../components/selectNumber";
import { postAccount } from "../api/postAccount";

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
  const handleLastBtn = async () => {
    try {
      const postedAccount = await postAccount();
      if (postedAccount?.status === 200) {
        router.push("/account/create/success");
      }
    } catch (error) {
      console.error("Error updating data:", error);
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

      <div className="mt-auto absolute bottom-20 w-[80%]">
        <div className="flex justify-center space-x-6">
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
