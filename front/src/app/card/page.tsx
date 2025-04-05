"use client";
import { useState, useEffect } from "react";
import CloudInfo from "./components/cloudInfo";
import CouponImage from "../coupon/components/couponImage";
import { useRouter } from "next/navigation";
import { GetCardInfo, CheckAccount } from "./api/getCard";
import { GetCouponList } from "../coupon/api/getCoupon";
import { DeleteUserCard } from "./api/deleteCard";
import { AuthGuard } from "@/utils/authGuard";
import Image from "next/image";

//상태 관리
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setCouponList, setCurrentCoupon } from "@/stores/slices/couponSlice";
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
  coupon_id: number;
  coupon_name: string;
  coupon_type: string;
  created_at: string;
  updated_at: string;
  coupon_deadline: string;
  saving_id: number;
}

const MainPage = () => {
  const dispatch = useAppDispatch();
  const couponList = useAppSelector((state) => state.coupon.couponList);
  const currentCard = useAppSelector((state) => state.card.currentCard);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [noAccount, setNoAccount] = useState(false);
  const [card, setCard] = useState<string[]>([]);

  const handleDeleteCard = async () => {
    await DeleteUserCard();
    setCard([]);
    dispatch(setCurrentCard([]));
  };

  useEffect(() => {
    setIsLoading(true);
    setNoAccount(false);
    dispatch(resetIsModalOpen());

    const fetchCardInfo = async () => {
      const response = await GetCardInfo();
      if (response !== undefined) {
        setCard(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    const fetchCouponInfo = async () => {
      const response = await GetCouponList();
      console.log(response?.data.content);
      if (response !== undefined) {
        dispatch(setCouponList(response.data.content));
      }
    };

    const hasAccount = async () => {
      const response = await CheckAccount();
      if (response === undefined) {
        setTimeout(() => {
          router.push("/account/create");
        }, 100);
      } else {
        setNoAccount(false);
        fetchCardInfo();
        fetchCouponInfo();
      }
    };

    hasAccount();
  }, [currentCard, dispatch]);

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
          src="/icons/logo.svg"
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
                      id="add-card"
                      onClick={() => dispatch(toggleIsModalOpen())}
                      className="cursor-pointer min-w-[290px] h-[182.8px] flex justify-center items-center rounded-lg bg-white shadow-xl"
                    >
                      <CirclePlus className="text-gray-700 w-12 h-12 transition-all" />
                    </div>
                  ) : (
                    <div id="cardRegistSuccess" className="relative">
                      <CircleX
                        id="cardDelete"
                        className="z-[200] text-gray-700 max-w-20 h-auto absolute right-1 top-1"
                        onClick={() => handleDeleteCard()}
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
              {couponList.map((coupon, index) => (
                <CouponImage
                  key={index}
                  couponName={coupon.coupon_name}
                  couponDeadline={coupon.coupon_deadline}
                  savingId={coupon.saving_id}
                  couponId={coupon.coupon_id}
                  couponType={coupon.coupon_type}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    router.push(`/coupon?couponId=${coupon.coupon_id}`);
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

export default AuthGuard(MainPage);
