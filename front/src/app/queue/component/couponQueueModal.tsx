"use client";

import { X } from "lucide-react";

interface QueueModalProps {
  position: number | null;
  totalUsers: number | null;
  onClose: () => void;
  isConnected: boolean;
}

export default function CouponQueueModal({
  position,
  totalUsers,
  onClose,
  isConnected,
}: QueueModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg shadow-lg max-w-md w-full mx-4 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="p-6 pt-10 text-center">
          <h2 className="text-xl font-bold mb-6">
            현재 동시 접속자가 많아
            <br />
            잠시 <span className="text-red-500">대기 중</span>입니다.
          </h2>

          <div className="mb-8">
            <p className="text-gray-500 mb-2">나의 대기 순서</p>
            {isConnected ? (
              <p className="text-4xl font-bold text-red-500">
                {position !== null ? `${position}명` : "연결 중..."}
              </p>
            ) : (
              <p className="text-lg text-red-500">
                연결 중 오류가 발생했습니다
              </p>
            )}
          </div>

          <p className="text-gray-600 mb-8">
            대기 순서에 따라 자동 접속되니
            <br />
            조금만 기다려주세요.
          </p>

          <div className="text-xs text-red-400">
            <p>※새로고침 또는 뒤로가기를 하시면</p>
            <p>다시 대기시간이 부여됩니다.</p>
            <p>모바일에서 이용 시 화면이 꺼지거나</p>
            <p>다른 앱으로 전환하지 않도록 유의해주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
