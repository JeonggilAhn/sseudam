"use client";
import { useState, useEffect } from "react";
import CloudInfo from "./components/cloudInfo";
import { useRouter } from "next/navigation";
import { getCardInfo } from "./api/getCard";

import Image from "next/image";

//상태 관리
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import {
  setUserCouponList,
  setCurrentCoupon,
} from "@/stores/slices/couponSlice";
import {
  resetIsModalOpen,
  toggleIsModalOpen,
} from "@/stores/slices/aniModalSlice";

//이미지
import { CirclePlus } from "lucide-react";

//컴포넌트
import TimeBackground from "./components/timeBackground";
import GrassBackground from "./components/grassBackground";
import CardRegist from "./components/cardRegist";
import Cards from "react-credit-cards-2";

export interface Card {
  cardNo: string;
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
  const router = useRouter();

  useEffect(() => {
    const fetchCardInfo = async (userId: number) => {
      const cardInfo = await getCardInfo(userId);
      setCard(cardInfo);
    };
    dispatch(resetIsModalOpen());
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
      ])
    );
    fetchCardInfo(1);
  }, []);

  const [card, setCard] = useState<Card>();

  return (
    <div
      className="h-[95vh] relative max-w-[1280px] mx-auto overflow-hidden"
      style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
    >
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex-1 ">
        {/* 소비/저축 정보 구름 */}
        <div className="flex justify-around items-center mt-[5vh] px-4 z-[150] relative">
          <CloudInfo
            type="소비"
            amount={25000}
            color="#3C3D37"
            textColor="#E52020"
          />
          <CloudInfo
            type="저축"
            amount={3000}
            color="#FFFFFF"
            textColor="#6439FF"
          />
        </div>
        <TimeBackground />
        <GrassBackground />
        <CardRegist />

        <Image
          className="w-[40vw] sm:w-[40vw] md:w-[35vw] lg:w-[30vw] xl:w-[25vw] 2xl:w-[15vw] h-auto z-[150] -translate-x-[50%] -translate-y-[55%] fixed top-1/4 left-1/2"
          src="/icons/logo.png"
          alt="logo"
          width={300}
          height={300}
        />
        <div className="h-full flex flex-col absolute bottom-0 left-0 right-0">
          <div className="relative flex flex-col justify-between h-full"></div>{" "}
          {/* 상단 여백 */}
          <div className="flex-1 flex flex-col justify-end h-2/3">
            {/* 카드 섹션 */}
            <div className="mb-8 flex justify-center items-center overflow-x-auto gap-4 z-[200] px-4 scroll-smooth scrollbar-hide min-h-[183px]">
              {cardList.length === 0 ? (
                <div
                  onClick={() => dispatch(toggleIsModalOpen())}
                  className="cursor-pointer min-w-[290px] h-[182.8px] flex justify-center items-center rounded-lg bg-white shadow-xl"
                >
                  <CirclePlus className="text-gray-700 w-12 h-12 transition-all" />
                </div>
              ) : (
                <div className="">
                  {cardList.map((card, index) => (
                    <Cards
                      key={index}
                      number={card.cardNo}
                      expiry={card.expirationDate}
                      cvc={""}
                      name={"유저명"}
                      focused={""}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 쿠폰 섹션 */}
            <div className="cursor-pointer mb-16 flex flex-col overflow-y-scroll gap-2 z-[200] px-4 scroll-smooth scrollbar-hide h-[25vh] justify-start items-center">
              {userCouponList.map((coupon, index) => (
                <div
                  key={index}
                  onClick={() => {
                    router.push(`/coupon/?couponId=${coupon.couponId}`);
                  }}
                  className="w-[60vw] max-w-[768px]  h-[15vh] flex items-center rounded-lg bg-linear-to-l bg-[#FF9800] shadow-2xl shrink-0 text-black"
                >
                  <div className="w-fit px-8">
                    <img
                      src="/icons/logoIconHana.svg"
                      className="w-[15vw] max-w-[100px] h-auto"
                      alt="하나은행"
                    />
                  </div>
                  <div className="h-full border-black border-[1px]"></div>
                  <div className="w-full flex justify-center items-center text-xl">
                    {" "}
                    {coupon.couponName}
                  </div>
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
