"use client";
import { useState, useEffect } from "react";
import CardImage from "./components/cardImage";
import CloudInfo from "./components/cloudInfo";

import Image from "next/image";

//상태 관리
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setUserCouponList } from "@/stores/slices/couponSlice";
import { toggleIsRegistModalOpen } from "@/stores/slices/cardSlice";

//이미지
import logo from "../../../public/icons/logo.png";
import { CirclePlus } from "lucide-react";

//컴포넌트
import TimeBackground from "./components/timeBackground";
import GrassBackground from "./components/grassBackground";
import CardRegist from "./components/cardRegist";
// import CouponImage from "../coupon/components/couponImage";

export interface Card {
  cardIssuerName: string;
  cardNo: string;
  expirationDate: string;
}

export interface Coupon {
  couponId: number;
  couponName: string;
  couponDeadline: string;
  savingId: number;
}

const MainPage = () => {
  const dispatch = useAppDispatch();
  const userCouponList = useAppSelector((state) => state.coupon.userCouponList);

  useEffect(() => {
    dispatch(
      setUserCouponList([
        {
          couponId: 1,
          couponName: "웰컴 쿠폰",
          couponDeadline: "2025-04-30",
          savingId: 101,
        },
        {
          couponId: 2,
          couponName: "생일 축하 쿠폰",
          couponDeadline: "2025-07-15",
          savingId: 102,
        },
        {
          couponId: 3,
          couponName: "재구매 감사 쿠폰",
          couponDeadline: "2025-12-31",
          savingId: 103,
        },
        {
          couponId: 3,
          couponName: "최종 감사 쿠폰",
          couponDeadline: "2025-12-31",
          savingId: 103,
        },
        {
          couponId: 3,
          couponName: "최종 감사 쿠폰",
          couponDeadline: "2025-12-31",
          savingId: 103,
        },
        {
          couponId: 3,
          couponName: "최종 감사 쿠폰",
          couponDeadline: "2025-12-31",
          savingId: 103,
        },
        {
          couponId: 3,
          couponName: "ㄹㅇ 최종 감사 쿠폰",
          couponDeadline: "2025-12-31",
          savingId: 103,
        },
      ])
    );
  }, []);

  const [cardList] = useState<Card[]>([
    {
      cardIssuerName: "삼성카드",
      cardNo: "1234567890123456",
      expirationDate: "2025-12",
    },
    {
      cardIssuerName: "신한카드",
      cardNo: "1234567890123456",
      expirationDate: "2025-12",
    },
    {
      cardIssuerName: "하나카드",
      cardNo: "1234567890123456",
      expirationDate: "2025-12",
    },
  ]);

  return (
    <div
      className="h-screen relative max-w-[1280px] mx-auto overflow-hidden"
      style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
    >
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex-1 ">
        {/* 소비/저축 정보 구름 */}
        <div className="flex justify-around items-center mt-[30vh] px-4 z-[150] relative">
          <CloudInfo
            type="소비"
            amount={25000}
            color="#7A7267"
            textColor="red-400"
          />
          <CloudInfo
            type="저축"
            amount={3000}
            color="#FFFFFF"
            textColor="blue-400"
          />
        </div>
        <TimeBackground />
        <GrassBackground />
        <CardRegist />

        <Image
          className="w-[40vw] sm:w-[40vw] md:w-[35vw] lg:w-[30vw] xl:w-[30vw] 2xl:w-[30vw] h-auto z-[150] -translate-x-[50%] -translate-y-[55%] fixed top-1/4 left-1/2"
          src={logo}
          alt="logo"
          width={300}
          height={300}
        />
        <div className="h-full flex flex-col absolute bottom-0 left-0 right-0">
          <div className="relative flex flex-col justify-between h-full"></div>{" "}
          {/* 상단 여백 */}
          <div className="flex-1 flex flex-col justify-end h-2/3">
            {/* 카드 섹션 */}
            <div className="mb-8 flex overflow-x-auto gap-4 z-[200] px-4 scroll-smooth scrollbar-hide">
              {cardList.map((card, index) => (
                <CardImage
                  key={index}
                  companyName={card.cardIssuerName}
                  cardNumber={card.cardNo}
                  expirationDate={card.expirationDate}
                />
              ))}
              <div
                onClick={() => dispatch(toggleIsRegistModalOpen())}
                className="min-w-[125px] h-[150px] flex justify-center items-center rounded-lg bg-linear-to-l from-gray-500 to-gray-100 shadow-xl"
              >
                <CirclePlus className="text-gray-500 w-12 h-12 transition-all" />
              </div>
            </div>

            {/* 쿠폰 섹션 */}
            <div className="mb-16 flex flex-col overflow-y-scroll gap-2 z-[200] px-4 scroll-smooth scrollbar-hide h-[25vh] justify-start items-center">
              {userCouponList.map((coupon, index) => (
                <div
                  key={index}
                  className="w-[80vw] h-[10vh] flex justify-center items-center rounded-lg bg-linear-to-l bg-[#FF9800] shadow-2xl shrink-0"
                >
                  {coupon.couponName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
