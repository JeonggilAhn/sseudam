"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function CouponPage() {
  const [couponClaimed, setCouponClaimed] = useState(false);

  const handleClaimCoupon = () => {
    setCouponClaimed(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="p-4 bg-white shadow">
        <h1 className="text-xl font-bold">특별 쿠폰 이벤트</h1>
      </div>

      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
          {couponClaimed ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">쿠폰 발급 완료!</h2>
              <p className="text-gray-600 mb-6">
                50% 할인 쿠폰이 성공적으로 발급되었습니다. 마이페이지에서
                확인하실 수 있습니다.
              </p>
              <button
                className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg font-medium"
                onClick={() => (window.location.href = "/")}
              >
                홈으로 돌아가기
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">50% 할인 쿠폰</h2>
              <div className="border-2 border-dashed border-blue-500 rounded-lg p-6 mb-6">
                <p className="text-lg font-bold text-blue-600 mb-2">
                  특별 할인 쿠폰
                </p>
                <p className="text-3xl font-bold mb-2">50% OFF</p>
                <p className="text-sm text-gray-500">
                  유효기간: 발급일로부터 7일
                </p>
              </div>
              <button
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                onClick={handleClaimCoupon}
              >
                쿠폰 받기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
