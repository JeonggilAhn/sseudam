"use client";

import React, { useEffect, useState } from "react";
import { getUserInfo } from "./api/getUserInfo";
import { useRouter } from "next/navigation";
import PageSetting from "../pageSetting";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const UserPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        if (response?.status === 200) {
          // console.log("res", response);
          setUserInfo(response.data.content);
        } else {
          setError("응답 데이터가 없습니다.");
        }
      } catch (error) {
        console.error(error);
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const formattedBirthday = (value: string | undefined) => {
    if (!value) {
      return "";
    }

    const birthD = value.substring(0, value.indexOf("T"));
    return birthD;
  };

  const handleSavingSetting = () => {
    router.push("/account/saving-rate");
  };

  const handleSsdamRecord = () => {
    router.push("/account/record");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  return (
    <>
      <PageSetting
        pageTitle="마이페이지"
        className="bg-[#C1E6FA] h-screen overflow-y-auto"
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
              <div className="flex flex-row justify-between">
                <span className="text-medium font-semibold ">이름</span>
                <span>{userInfo ? userInfo.userName : ""}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="text-medium font-semibold">생년월일</span>
                <span>
                  {formattedBirthday(userInfo ? userInfo.userBirthday : "")}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="text-medium font-semibold">이메일</span>
                <span>{userInfo ? userInfo.userEmail : ""}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <label htmlFor="" className="text-black font-bold  ml-2 ">
            쓰담
          </label>
          <div className="w-full h-40 bg-[#ffeeaa] px-6 py-7 mb-4 rounded-2xl shadow-md mt-3">
            <div className="flex flex-col justify-evenly h-full">
              <div className="flex justify-between">
                <span className="text-medium font-semibold mb-6">
                  나의 쓰담 일지
                </span>
                <ChevronRight
                  className="text-[#7c7c7c] cursor-pointer h-6 w-6 hover:bg-[#9b9b9b]/10 rounded-full"
                  onClick={handleSsdamRecord}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-medium font-semibold">저축 설정</span>
                <ChevronRight
                  className="text-[#7c7c7c] cursor-pointer hover:bg-[#9b9b9b]/10 rounded-full"
                  onClick={handleSavingSetting}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button variant={"link"} onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </PageSetting>
    </>
  );
};

export default AuthGuard(UserPage);
