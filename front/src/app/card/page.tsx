"use client";
import { useState, useEffect } from "react";
import CloudInfo from "./components/cloudInfo";
import CouponImage from "../coupon/components/couponImage";
import { useRouter } from "next/navigation";
import { GetCardInfo } from "./api/getCard";
import { DeleteUserCard } from "./api/deleteCard";

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
import { setCurrentCard } from "@/stores/slices/cardSlice";
//이미지
import { CirclePlus, LoaderCircle, CircleX } from "lucide-react";

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
  isUsed: boolean;
}

const MainPage = () => {
  const dispatch = useAppDispatch();
  const userCouponList = useAppSelector((state) => state.coupon.userCouponList);
  const currentCard = useAppSelector((state) => state.card.currentCard);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [card, setCard] = useState<string[]>([]);

  const handleDeleteCard = async (userId: number) => {
    await DeleteUserCard(userId);
    setCard([]);
    dispatch(setCurrentCard([]));
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCardInfo = async (userId: number) => {
      const response = await GetCardInfo(userId);
      if (response !== undefined) {
        setCard(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    dispatch(resetIsModalOpen());
    dispatch(
      setUserCouponList([
        {
          couponId: 1,
          couponName: "웰컴 쿠폰",
          couponDeadline: "2025-04-30",
          savingId: 101,
          isUsed: false,
        },
        {
          couponId: 2,
          couponName: "생일 축하 쿠폰",
          couponDeadline: "2025-07-15",
          savingId: 102,
          isUsed: true,
        },
        {
          couponId: 3,
          couponName: "재구매 감사 쿠폰",
          couponDeadline: "2025-12-31",
          savingId: 103,
          isUsed: false,
        },
      ])
    );
    fetchCardInfo(2);
  }, [currentCard]);

  return (
    <div
      className="h-[95vh] min-h-[768px] relative w-full max-w-[1280px] mx-auto overflow-hidden"
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
            color="dark"
            textColor="#fa0505"
          />
          <CloudInfo
            type="저축"
            amount={3000}
            color="white"
            textColor="#6439FF"
          />
        </div>
        <TimeBackground />
        <GrassBackground />
        <CardRegist />

        <Image
          className="w-[40vw] sm:w-[40vw] md:w-[35vw] lg:w-[30vw] xl:w-[25vw] 2xl:w-[15vw] h-auto z-[150] -translate-x-[50%] -translate-y-[58%] fixed top-1/4 left-1/2 drop-shadow-xl"
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
              {isLoading ? (
                <div className="">
                  <LoaderCircle className="z-[200] text-gray-700 w-12 h-12 transition-all animate-spin absolute top-1/2 left-1/2 -translate-x-[50%] translate-y-[100%]" />
                  <Cards
                    number={""}
                    expiry={""}
                    cvc={""}
                    name={"유저명"}
                    focused={""}
                  />
                </div>
              ) : (
                <div>
                  {card.length === 0 ? (
                    <div
                      onClick={() => dispatch(toggleIsModalOpen())}
                      className="cursor-pointer min-w-[290px] h-[182.8px] flex justify-center items-center rounded-lg bg-white shadow-xl"
                    >
                      <CirclePlus className="text-gray-700 w-12 h-12 transition-all" />
                    </div>
                  ) : (
                    <div className="relative">
                      <CircleX
                        className="z-[200] text-gray-700 max-w-20 h-auto absolute right-1 top-1"
                        onClick={() => handleDeleteCard(2)}
                      />
                      <Cards
                        number={""}
                        expiry={""}
                        cvc={""}
                        name={"유저명"}
                        focused={""}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 쿠폰 섹션 */}
            <div className="cursor-pointer mb-16 flex flex-col overflow-y-scroll gap-2 z-[200] px-4 scroll-smooth scrollbar-hide h-[25vh] justify-start items-center">
              {userCouponList.map((coupon, index) => (
                <CouponImage
                  key={index}
                  couponName={coupon.couponName}
                  couponDeadline={coupon.couponDeadline}
                  savingId={coupon.savingId}
                  onClick={() => {
                    router.push(`/coupon?couponId=${coupon.couponId}`);
                    dispatch(setCurrentCoupon(coupon));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
