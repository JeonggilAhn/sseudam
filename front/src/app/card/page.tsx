"use client";
import { useState, useEffect, useRef } from "react";
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
import { resetIsModalOpen, toggleIsModalOpen } from "@/stores/slices/aniModalSlice";
import { setCurrentCard } from "@/stores/slices/cardSlice";
//이미지
import { CirclePlus, LoaderCircle, CircleX, MoveDown } from "lucide-react";

//컴포넌트
import TimeBackground from "./components/timeBackground";
import GrassBackground from "./components/grassBackground";
import CardRegist from "./components/cardRegist";
import Cards from "react-credit-cards-2";
import SSEComponent, { couponListScrollEvent } from "@/components/sse/SSEComponent";

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
  const [deleteCard, setDeleteCard] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isBounce, setIsBounce] = useState(true);
  const [piggyBalance, setPiggyBalance] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const couponListRef = useRef<HTMLDivElement>(null);

  const [coinBursts, setCoinBursts] = useState<number[]>([]);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleDeleteCard = async () => {
    await DeleteUserCard();
    setCard([]);
    dispatch(setCurrentCard([]));
  };

  const handleSunClick = () => {
    const now = Date.now();

    // 0.5초 이내 재클릭 방지
    if (now - lastClickTime < 500) return;
    setLastClickTime(now);

    const id = now;
    setCoinBursts((prev) => [...prev, id]);

    const audio = new Audio("/sounds/coin-spill.mp3");
    audio.volume = 0.8;
    audio.play().catch((err) => console.warn("Audio play failed", err));

    setTimeout(() => {
      setCoinBursts((prev) => prev.filter((burstId) => burstId !== id));
    }, 5000);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(resetIsModalOpen());

    const fetchCardInfo = async () => {
      const response = await GetCardInfo();
      if (response !== undefined) {
        console.log(response.data);
        const tmpCardNo = response.data[0] + "**********" + response.data[1];
        const userName = (await axiosInstance.get("/users/me")).data.content.userName;
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

  useEffect(() => {
    if (couponListRef.current) {
      couponListRef.current.scrollTop = 0;
    }
  }, [couponList]);

  useEffect(() => {
    const handleResetScroll = async () => {
      if (couponListRef.current) {
        couponListRef.current.scrollTop = 0;
      }

      const fetchCouponInfo = async () => {
        const response = await GetCouponList();
        console.log("쿠폰 목록 갱신:", response?.data.content);
        if (response?.data.content.length > 0) {
          dispatch(setCouponList(response?.data.content));
        } else {
          dispatch(setCouponList([]));
        }
      };

      await fetchCouponInfo();
    };

    couponListScrollEvent.addEventListener("resetScroll", handleResetScroll);

    return () => {
      couponListScrollEvent.removeEventListener("resetScroll", handleResetScroll);
    };
  }, []);

  return (
    <div
      className="h-[95vh] relative w-full max-w-[1280px] mx-auto overflow-hidden"
      style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
    >
      <div>
        <AnimatePresence>
          {deleteCard && (
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
              // style={{ backdropFilter: "blur(10px)" }}
              onClick={() => setHasScrolled(true)}
              className="rounded-lg absolute top-0 translate-y-[70%] text-white hover:text-gray-200 focus:outline-none h-[30vh] w-full flex flex-col items-center justify-center z-[300] gap-2"
            >
              <div className="flex h-[7vh] items-center justify-center gap-2 bg-black/30 px-4 py-2 rounded-full">
                <span className="font-medium">카드를 삭제하시겠습니까?</span>
                <div className="flex gap-2 ml-2 h-full">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCard();
                      setDeleteCard(false);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors min-w-[70px] w-[10vw] h-full"
                  >
                    확인
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteCard(false);
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-colors min-w-[70px] w-[10vw] h-full"
                  >
                    취소
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SSEComponent />
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex-1 ">
        {/* 소비/저축 정보 구름 */}
        <div className="flex justify-around items-center mt-[5vh] px-4 z-[150] relative gap-[5vw]">
          <div className="relative">
            <Image
              src="/icons/sun.svg"
              alt="sun"
              width={200}
              height={200}
              onClick={handleSunClick}
              className="relative flex flex-col justify-center items-center p-4 min-h-[50px] rounded-full transition-transform -translate-x-[20%] -translate-y-[30%] duration-300 hover:scale-105 cursor-pointer"
            />
          </div>
          {coinBursts.map((burstId) => (
            <AnimatePresence key={burstId}>
              {Array.from({ length: 25 }).map((_, idx) => {
                const startX = Math.random() * 100;
                const fallDistance = 500 + Math.random() * 200;
                const duration = 3 + Math.random() * 0.5;

                return (
                  <motion.div
                    key={`${burstId}-${idx}`}
                    initial={{ opacity: 0.5, y: -50 }}
                    animate={{ opacity: 1, y: fallDistance }}
                    exit={{ opacity: 0 }}
                    transition={{ duration, ease: "easeOut" }}
                    className="fixed text-2xl z-[999] pointer-events-none"
                    style={{ left: `${startX}%`, top: "0px" }}
                  >
                    🪙
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ))}

          <div className="cursor-pointer" onClick={() => router.push("/account/record")}>
            <CloudInfo type="저축" amount={piggyBalance} color="white" textColor="#6439FF" />
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
          <div className="relative flex flex-col justify-between h-full"></div> {/* 상단 여백 */}
          <div className="flex-1 flex flex-col justify-end h-2/3">
            {/* 카드 섹션 */}
            <div className="mb-8 flex justify-center items-center overflow-x-auto gap-4 z-[200] px-4 scroll-smooth scrollbar-hide min-h-[183px]">
              {isLoading ? (
                <div className="">
                  <LoaderCircle className="z-[200] text-gray-700 w-12 h-12 transition-all animate-spin absolute top-1/2 left-1/2 -translate-x-[50%] translate-y-[100%]" />
                  <Cards number={""} expiry={""} cvc={""} name={"유저명"} focused={""} />
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
                        className="z-[200] text-gray-700 max-w-20 h-auto absolute right-1 top-1 cursor-pointer hover:text-red-500 transition-colors"
                        onClick={() => setDeleteCard(true)}
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
            <div
              ref={couponListRef}
              className="cursor-pointer mb-16 flex flex-col overflow-y-scroll gap-2 z-[200] px-4 scroll-smooth scrollbar-hide h-[25vh] justify-start items-center"
            >
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
                      onClick={() => setHasScrolled(true)}
                      className="rounded-lg fixed bottom-0 -translate-x-[50%] -translate-y-[25%] text-white hover:text-gray-200 focus:outline-none h-[30vh] w-full flex flex-col items-center justify-center z-[300] gap-2"
                    >
                      <div className="flex items-center justify-center gap-2 bg-black/30 px-4 py-2 rounded-full">
                        <MoveDown className="w-6 h-6" />
                        <span className="font-medium">아래로 스크롤하여 쿠폰을 확인하세요</span>
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
                <div className="text-gray-700 text-sm">현재 등록된 쿠폰이 없습니다.</div>
              )}
            </div>

            {/* 카드 삭제 확인 모달 */}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[300] p-4">
                <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full transform transition-all animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">카드 삭제 확인</h3>
                  <p className="text-gray-600 mb-6">
                    정말로 카드를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                  </p>
                  <div className="flex items-center justify-center gap-2 bg-black/30 px-4 py-2 rounded-full">
                    <span className="font-medium text-white">카드 삭제를 진행하시겠습니까?</span>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteCard();
                        setShowDeleteModal(false);
                      }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGuard(MainPage);
