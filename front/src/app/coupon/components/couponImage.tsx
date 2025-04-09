"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { CheckCouponIssued, IssueCoupon } from "../api/postCoupon";
import { useAppDispatch } from "@/stores/hooks";
import { setCouponOrder } from "@/stores/slices/couponSlice";
import { toggleIsSSEOpen } from "@/stores/slices/SSESLice";

interface CouponImageProps {
  couponName: string;
  couponDeadline: string;
  savingId: number;
  couponId: number;
  couponType: string;
  onClick: (e: React.MouseEvent) => void;
}

const CouponImage = ({
  couponName,
  couponDeadline,
  couponId,
  onClick,
}: CouponImageProps) => {
  const [userHas, setUserHas] = useState(false);
  const dispatch = useAppDispatch();
  const hasUpdatedOrderRef = useRef(false);

  useEffect(() => {
    const fetchUserCoupon = async (couponId: number) => {
      const response = await CheckCouponIssued(couponId);
      console.log(response?.data.content);
      if (response?.data.content === true) {
        setUserHas(true);
        if (!hasUpdatedOrderRef.current) {
          dispatch(setCouponOrder(couponId));
          hasUpdatedOrderRef.current = true;
        }
      } else {
        setUserHas(false);
        hasUpdatedOrderRef.current = false;
      }
    };
    fetchUserCoupon(couponId);
  }, [couponId, dispatch]);

  const handleIssue = async (couponId: number) => {
    console.log(couponId);
    const response = await IssueCoupon(couponId);
    dispatch(toggleIsSSEOpen());
    console.log(response);
  };

  return (
    <div className="relative flex bg-white border-2 border-dashed border-orange-400 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full min-h-[6rem]">
      {/* 좌측 절취선 */}
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white border-2 border-orange-300 rounded-full z-10"></div>
      {/* 우측 절취선 */}
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white border-2 border-orange-300 rounded-full z-10"></div>

      {/* 3등분된 정보 */}
      <div className="flex flex-row justify-between w-full divide-x divide-orange-300 text-center text-sm text-gray-800">
        {/* Left: 할인 정보 */}
        <div className="flex-1 px-4 py-6 flex flex-col justify-center items-center w-full h-full">
          <div className="text-xs uppercase text-orange-600 font-semibold w-full h-full">
            <div className="flex justify-center items-center w-full h-full">
              <Image
                src="/icons/logoIconCiti.svg"
                width={150}
                height={150}
                alt="쿠폰 아이콘"
              />
            </div>
          </div>
        </div>

        {/* Middle: 코드 정보 */}
        <div className="flex-1 px-4 py-6 flex flex-col justify-center items-center w-full ">
          <div className="text-xs text-nowrap w-full text-gray-500 mt-2 text-ellipsis">
            {couponName}
          </div>
          <div className="text-xs text-nowrap mt-1 uppercase text-orange-600 font-semibold w-full text-ellipsis">
            유효 기간
          </div>
          <div className="text-md text-nowrap font-medium mt-1 w-full text-ellipsis">
            {couponDeadline?.slice(0, 10)}
          </div>
        </div>

        <div className="flex-1 px-4 py-6 flex flex-col justify-center items-center">
          {userHas ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(e);
              }}
              className="cursor-pointer bg-[#3fbff6] hover:bg-[#ffb733] text-white font-bold py-2 px-4 rounded border-2 border-black transition"
            >
              사용 하러 가기
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleIssue(couponId);
              }}
              className="cursor-pointer bg-[#FF9800] hover:bg-[#ffb733] text-black font-bold py-2 px-4 rounded border-2 border-black transition"
            >
              쿠폰 받기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponImage;
