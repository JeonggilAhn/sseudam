"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageSetting from "@/app/pageSetting";
import { LongButton } from "@/components/ui/customButton";

const SuccessPage = () => {
  const router = useRouter();

  const handleButton = () => {
    router.push("/");
  };

  return (
    <>
      <PageSetting>
        <div className="flex flex-col justify-center items-center">
          <img
            src="/icons/logo_smile.svg"
            alt="logo_smile"
            className="w-55 mb-6 mt-10"
          />
          <div className="text-[6.2vw] font-bold">
            &quot;쓰담&quot; 가입을 환영합니다!
          </div>
        </div>

        <LongButton name="시작하기" onClick={handleButton}></LongButton>
      </PageSetting>
    </>
  );
};

export default SuccessPage;
