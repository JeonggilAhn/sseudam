"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckCouponIssued } from "../api/postCoupon";

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
  // const currentCouponName = useSelector(
  //   (state: RootState) => state.coupon.currentCouponName
  // );
  // const currentCouponDeadline = useSelector(
  //   (state: RootState) => state.coupon.currentCouponDeadline
  // );
  const [userHas, setUserHas] = useState(false);

  useEffect(() => {
    const fetchUserCoupon = async (couponId: number) => {
      const response = await CheckCouponIssued(couponId);
      console.log(response?.data.content);
      if (response?.data.content === true) {
        setUserHas(true);
      } else {
        setUserHas(false);
      }
    };
    fetchUserCoupon(couponId);
  }, [couponId]);

  return (
    <div
      onClick={onClick}
      className="relative flex bg-white border-2 border-dashed border-orange-400 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full min-h-[6rem]"
    >
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
        <div className="flex-1 px-4 py-6 flex flex-col justify-center items-center">
          <span className="text-xs text-gray-500 mt-2">{couponName}</span>
          <p className="text-xs mt-1 uppercase text-orange-600 font-semibold">
            유효 기간
          </p>
          <p className="text-md font-medium mt-1">
            {couponDeadline.replace("T", " ")}
          </p>
        </div>

        <div className="flex-1 px-4 py-6 flex flex-col justify-center items-center">
          {userHas ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-[#FF9800] hover:bg-[#ffb733] text-black font-bold py-2 px-4 rounded border-2 border-black transition"
            >
              사용 하러 가기
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-[#FF9800] hover:bg-[#ffb733] text-black font-bold py-2 px-4 rounded border-2 border-black transition"
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
