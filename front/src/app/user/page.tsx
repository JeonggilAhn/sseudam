"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageSetting from "../pageSetting";
import { ChevronRight } from "lucide-react";

const UserPage = () => {
  const router = useRouter();
  const handleSavingSetting = () => {
    router.push("/account/saving-rate");
  };
  return (
    <>
      <PageSetting pageTitle="마이페이지" className="bg-[#C1E6FA] h-screen">
        <div className="mt-[-10px] mb-4">
          <label htmlFor="" className="text-black font-bold ml-2">
            개인 정보
          </label>
          <img
            src="/icons/icon_pinkPig.svg"
            alt="pinkPig"
            className="justify-end w-15 flex absolute right-10 top-[130px]"
          />
          <div className="w-full h-50 bg-[#ffeeaa] px-6 py-7 rounded-2xl shadow-md mt-3">
            <div className="flex flex-col justify-between h-full">
              <span className="text-medium font-semibold ">이름 </span>
              <span className="text-medium font-semibold">생년월일</span>
              <span className="text-medium font-semibold">이메일</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <label htmlFor="" className="text-black font-bold  ml-2 ">
            설정
          </label>
          <div className="w-full h-40 bg-[#ffeeaa] px-6 py-7 mb-4 rounded-2xl shadow-md mt-3">
            <div className="flex flex-col justify-evenly h-full">
              <div className="flex justify-between">
                <span className="text-medium font-semibold mb-6">
                  저축 설정
                </span>
                <ChevronRight
                  className="text-[#7c7c7c]"
                  onClick={handleSavingSetting}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-medium font-semibold">알림</span>
                <ChevronRight className="text-[#7c7c7c]" />
              </div>
            </div>
          </div>
        </div>
      </PageSetting>
    </>
  );
};

export default UserPage;
