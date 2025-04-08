"use client";

// import { AuthGuard } from "@/utils/authGuard";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Ticket } from "lucide-react";
import { Coupon } from "../card/page";
import { GetCouponList, GetSavingProduct } from "./api/getCoupon";
import SavingDetail from "../saving/components/savingDetail";

// 컴포넌트
import GrassBackground from "../card/components/grassBackground";

//상태
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  toggleIsSavingDetailOpen,
  resetIsSavingDetailOpen,
} from "@/stores/slices/aniModalSlice";

interface SavingProduct {
  etc_note: string;
  fin_prdt_nm: string;
  mtrt_int: string;
}

const CouponPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentCoupon, setCurrentCoupon] = useState<Coupon>();
  const [currentCouponSavingId, setCurrentCouponSavingId] = useState<number>();
  const [savingProduct, setSavingProduct] = useState<SavingProduct>();
  const params = useSearchParams();

  const handleClick = async () => {
    dispatch(toggleIsSavingDetailOpen());
  };

  useEffect(() => {
    dispatch(resetIsSavingDetailOpen());
    const fetchSavingProduct = async (savingId: number) => {
      const response = await GetSavingProduct(savingId);
      setSavingProduct(response?.data.content);
      console.log(response);
    };

    const fetchCoupon = async () => {
      try {
        const tmpCouponList = await GetCouponList();
        for (
          let index = 0;
          index < tmpCouponList?.data.content.length;
          index++
        ) {
          if (
            tmpCouponList?.data.content[index].coupon_id ==
            params?.get("couponId")
          ) {
            setCurrentCoupon(tmpCouponList?.data.content[index]);
            setCurrentCouponSavingId(
              tmpCouponList?.data.content[index].saving_id
            );
            fetchSavingProduct(tmpCouponList?.data.content[index].saving_id);
            break;
          }
        }
      } catch (error) {
        console.error("❌ 쿠폰 상세 정보 조회 실패:", error);
      }
    };

    fetchCoupon();
  }, [params.get("couponId"), dispatch]);

  // 뒤로가기 함수
  const handleGoBack = () => {
    setCurrentCoupon(undefined);
    router.back();
  };

  return (
    <div className="h-[95vh] relative w-full max-w-[1280px] mx-auto overflow-hidden">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .coupon-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 152, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 152, 0, 0);
          }
        }
      `}</style>

      {/* 배경 컴포넌트 */}
      <GrassBackground />

      <SavingDetail
        savingId={currentCouponSavingId || 0}
        onClose={() => dispatch(resetIsSavingDetailOpen())}
      />

      {/* 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-[200] bg-white/80 backdrop-blur-md p-4 shadow-md">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-medium">뒤로가기</span>
          </button>
          <h1 className="text-xl text-gray-500 font-bold text-center">
            쿠폰 상세정보
          </h1>
          <div className="w-[72px]"></div>
        </div>
      </div>

      {/* 쿠폰 디테일 컨텐츠 */}
      <div className="pt-20 pb-8 px-4 h-full overflow-y-auto scrollbar-hide">
        <div className="flex flex-col items-center gap-6 z-[100] relative">
          {/* 쿠폰 이미지 및 정보 */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden coupon-animation">
            <div className="p-6 bg-gradient-to-r from-[#FF9800] to-[#FFB74D]">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-white text-2xl font-bold">
                    {currentCoupon?.coupon_name}
                  </h2>
                  <p className="text-white mt-1">
                    유효기간: {currentCoupon?.coupon_deadline.slice(0, 10)}
                  </p>
                </div>
                <div className="bg-white rounded-full p-3">
                  <Ticket size={32} className="text-[#FF9800]" />
                </div>
              </div>
            </div>

            <div className="relative p-6 bg-white">
              {/* 점선 경계 */}
              <div className="absolute left-0 right-0 top-0 h-[1px] bg-dashed border-t border-dashed border-gray-300"></div>

              {/* 좌측 원형 노치 */}
              <div className="absolute top-[-12px] left-[-12px] w-[24px] h-[24px] rounded-full bg-gray-100"></div>

              {/* 우측 원형 노치 */}
              <div className="absolute top-[-12px] right-[-12px] w-[24px] h-[24px] rounded-full bg-gray-100"></div>

              <div className="py-4">
                <div className="flex justify-center w-full">
                  <button
                    onClick={() => {
                      handleClick();
                    }}
                    className="cursor-pointer py-3 px-8 bg-[#FF9800] hover:bg-[#F57C00] text-white font-bold rounded-lg transition-colors w-full max-w-xs"
                  >
                    적금 상품으로 이동하기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 쿠폰 세부 정보 */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 text-gray-500">
              쿠폰 정보
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">쿠폰명</span>
                <span className="font-medium">
                  {currentCoupon?.coupon_name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">유효기간</span>
                <span className="font-medium">
                  {currentCoupon?.coupon_deadline.slice(0, 10)}
                </span>
              </div>
            </div>
          </div>

          {/* 쿠폰 사용 방법 */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 text-gray-500">
              상품 정보
            </h3>

            <ol className="list-decimal pl-5 space-y-2 text-gray-500">
              <li>이름 : {savingProduct?.fin_prdt_nm}</li>
              <li>설명 : {savingProduct?.etc_note}</li>
              <li>이자율 : {savingProduct?.mtrt_int}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default AuthGuard(CouponPage);
export default CouponPage;
