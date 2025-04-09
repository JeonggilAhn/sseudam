"use client";
import { useState, useEffect } from "react";
import CloudInfo from "./components/cloudInfo";
import CouponImage from "../coupon/components/couponImage";
import { useRouter } from "next/navigation";
import { GetCardInfo, CheckAccount, GetPiggyBalance } from "./api/getCard";
import { GetCouponList } from "../coupon/api/getCoupon";
import { DeleteUserCard } from "./api/deleteCard";
import { AuthGuard } from "@/utils/authGuard";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

//상태 관리
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setCouponList, setCurrentCoupon } from "@/stores/slices/couponSlice";
import {
  resetIsModalOpen,
  toggleIsModalOpen,
} from "@/stores/slices/aniModalSlice";
import { setCurrentCard } from "@/stores/slices/cardSlice";
//이미지
import { CirclePlus, LoaderCircle, CircleX, MoveDown } from "lucide-react";

//컴포넌트
import TimeBackground from "./components/timeBackground";
import GrassBackground from "./components/grassBackground";
import CardRegist from "./components/cardRegist";
import Cards from "react-credit-cards-2";
import SSEComponent from "@/components/sse/SSEComponent";

class Card {
  cardNo: string;
  userName: string;

  constructor(cardNo: string, userName: string) {
    this.cardNo = cardNo;
    this.userName = userName;
  }
}

export interface Coupon {
  couponId: number;
  couponName: string;
  couponType: string;
  createdAt: string;
  updatedAt: string;
  couponDeadline: string;
  savingId: number;
}

const MainPage = () => {
  const dispatch = useAppDispatch();
  const couponList = useAppSelector((state) => state.coupon.couponList);
  const currentCard = useAppSelector((state) => state.card.currentCard);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState<Card[]>([]);
  const [isBounce, setIsBounce] = useState(true);
  const [piggyBalance, setPiggyBalance] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleDeleteCard = async () => {
    await DeleteUserCard();
    setCard([]);
    dispatch(setCurrentCard([]));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(resetIsModalOpen());

    const fetchCardInfo = async () => {
      const response = await GetCardInfo();
      if (response !== undefined) {
        console.log(response.data);
        const tmpCardNo = response.data[0] + "**********" + response.data[1];
        const userName = (await axiosInstance.get("/users/me")).data.content
          .userName;
        const tmpCard = new Card(tmpCardNo, userName);
        setCard([tmpCard]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    const fetchCouponInfo = async () => {
      const response = await GetCouponList();
      console.log(response?.data.content);
      if (response?.data.content.length > 0) {
        dispatch(setCouponList(response?.data.content));
      } else {
        dispatch(setCouponList([]));
      }
    };

    const fetchPiggyBalance = async () => {
      const response = await GetPiggyBalance();
      setPiggyBalance(response?.data.content.accountBalance);
    };

    const hasAccount = async () => {
      const response = await CheckAccount();
      console.log(response);
      if (response === undefined) {
        setTimeout(() => {
          router.push("/auth/signup");
        }, 100);
      } else {
        fetchCardInfo();
        fetchCouponInfo();
        fetchPiggyBalance();
      }
    };

    hasAccount();
    setTimeout(() => {
      setIsBounce(false);
    }, 2580);
  }, [currentCard, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setHasScrolled(true);
    }, 3000);
  }, []);

  return (
    <div
      className="h-[95vh] relative w-full max-w-[1280px] mx-auto overflow-hidden"
      style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
    >
      <SSEComponent />
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex-1 ">
        {/* 소비/저축 정보 구름 */}
        <div className="flex justify-around items-center mt-[5vh] px-4 z-[150] relative gap-[5vw]">
          <Image
            src="/icons/sun.svg"
            alt="sun"
            width={200}
            height={200}
            className="relative flex flex-col justify-center items-center p-4 min-h-[50px] rounded-full transition-transform -translate-x-[20%] -translate-y-[30%] duration-300 hover:scale-105"
          />
          <div
            className="cursor-pointer"
            onClick={() => router.push("/account/record")}
          >
            {" "}
            <CloudInfo
              type="저축"
              amount={piggyBalance}
              color="white"
              textColor="#6439FF"
            />
          </div>
        </div>
        <TimeBackground />
        <GrassBackground />
        <CardRegist />

        <Image
          className={`cursor-pointer w-[40vw] sm:w-[40vw] md:w-[35vw] lg:w-[30vw] xl:w-[25vw] 2xl:w-[15vw] h-auto z-[150] -translate-x-[50%] -translate-y-[58%] fixed top-1/4 left-1/2 drop-shadow-xl transition-all duration-300 animate-${isBounce ? "bounce" : "none"}`}
          onClick={() => {
            setIsBounce(true);
            setTimeout(() => {
              setIsBounce(false);
            }, 2570);
          }}
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
                        number={card[0].cardNo}
                        expiry={""}
                        cvc={""}
                        name={card[0].userName}
                        focused={""}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 쿠폰 섹션 */}
            <div className="cursor-pointer mb-16 flex flex-col overflow-y-scroll gap-2 z-[200] px-4 scroll-smooth scrollbar-hide h-[25vh] justify-start items-center">
              <div>
                <AnimatePresence>
                  {!hasScrolled && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                        },
                      }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ backdropFilter: "blur(10px)" }}
                      className="rounded-lg fixed bottom-0 -translate-x-[50%] -translate-y-[25%] text-white hover:text-gray-200 focus:outline-none h-[30vh] w-full flex flex-col items-center justify-center z-[300] gap-2"
                    >
                      <div className="flex items-center justify-center gap-2 bg-black/30 px-4 py-2 rounded-full">
                        <MoveDown className="w-6 h-6" />
                        <span className="font-medium">
                          아래로 스크롤하여 쿠폰을 확인하세요
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {Array.isArray(couponList) && couponList.length > 0 ? (
                couponList.map((coupon, index) => (
                  <CouponImage
                    key={index}
                    couponName={coupon.couponName}
                    couponDeadline={coupon.couponDeadline}
                    savingId={coupon.savingId}
                    couponId={coupon.couponId}
                    couponType={coupon.couponType}
                    onClick={() => {
                      router.push(`/coupon?couponId=${coupon.couponId}`);
                      dispatch(setCurrentCoupon(coupon));
                    }}
                  />
                ))
              ) : (
                <div className="text-gray-700 text-sm">
                  현재 등록된 쿠폰이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGuard(MainPage);
