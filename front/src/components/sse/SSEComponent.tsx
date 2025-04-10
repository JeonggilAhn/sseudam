"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "motion/react";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { GetCouponList } from "../../app/coupon/api/getCoupon";
import { setCouponList } from "@/stores/slices/couponSlice";
import { Loader } from "./loader";

import {
  resetIsSSEOpen,
  setMyPosition,
  setEstimatedTime,
} from "@/stores/slices/SSESLice";

import { EventSource } from "eventsource";

const SSEComponent = () => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [connectionState, setConnectionState] = useState<number>(0);

  const isSSEOpen = useAppSelector((state) => state.SSE.isSSEOpen);
  const myPosition = useAppSelector((state) => state.SSE.myPosition);
  const estimatedTime = useAppSelector((state) => state.SSE.estimatedTime);
  const currentCouponId = useAppSelector(
    (state) => state.coupon.currentCouponId
  );
  const dispatch = useAppDispatch();

  const handleClose = async () => {
    if (eventSource) {
      console.log("SSE 연결 종료 중...");
      eventSource.close();
      // 연결 상태 초기화
      setEventSource(null);
    }
    const response = await GetCouponList();
    console.log(response?.data.content);
    if (response?.data.content.length > 0) {
      dispatch(setCouponList(response?.data.content));
    }

    setTimeout(() => {
      dispatch(resetIsSSEOpen());
    }, 200);
  };

  useEffect(() => {
    const handleUnload = () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(() => {
    console.log(currentCouponId);
    if (isSSEOpen && !eventSource) {
      console.log("SSE 연결이 열렸습니다.");
      // EventSource 객체 생성
      const newEventSource = new EventSource(
        `https://j12a106.p.ssafy.io/api/sse/subscribe/${currentCouponId}`,
        {
          fetch: (input, init) =>
            fetch(input, {
              ...init,
              headers: {
                ...init?.headers,
                Authorization: `${localStorage.getItem("access_token")}`,
              },
            }),
        }
      );

      // 연결 열림 이벤트 핸들러
      newEventSource.onopen = () => {
        console.log("SSE 연결이 열렸습니다.");
      };

      console.log(newEventSource?.readyState);

      // 에러 핸들러
      newEventSource.onerror = (error) => {
        console.error("SSE 연결 오류:", error);
        // 오류 발생 시 연결 종료 처리
        if (newEventSource.readyState === newEventSource.CLOSED) {
          console.log("SSE 연결이 닫혔습니다.");
        }
      };

      newEventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(setMyPosition(data.position));
        dispatch(setEstimatedTime(data.estimatedSeconds));
        console.log(data);
        if (data.success === false) {
          handleClose();
          toast.error("쿠폰 발급에 실패했습니다.");
        } else if (data.success === true) {
          handleClose();
          toast.success("쿠폰 발급에 성공했습니다.");
        }
      };

      setEventSource(newEventSource);

      // 컴포넌트 언마운트 또는 isSSEOpen이 false로 변경될 때 정리
      return () => {
        if (newEventSource) {
          newEventSource.close();
          setEventSource(null);
          console.log("SSE 연결 정리됨");
        }
      };
    }
  }, [isSSEOpen]);

  useEffect(() => {
    if (eventSource) {
      console.log("초기 readyState:", eventSource.readyState);
      setConnectionState(eventSource.readyState);

      // 주기적으로 readyState 확인하는 인터벌 설정
      const intervalId = setInterval(() => {
        console.log("현재 readyState:", eventSource.readyState);
        setConnectionState(eventSource.readyState);
      }, 3000); // 3초마다 확인

      // 컴포넌트 언마운트 시 인터벌 정리
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [eventSource]);

  return (
    <AnimatePresence>
      {/* 모달 배경 */}
      {isSSEOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backdropFilter: "blur(10px)" }}
          className="fixed inset-0  flex items-center justify-center z-[300]"
        >
          {/* 모달 컨테이너 */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden w-11/12 max-w-md mx-auto animate-fadeIn">
            {/* 모달 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">대기열 현황</h2>
                  {connectionState === 0 && (
                    <p className="text-sm text-yellow-200">연결 중...</p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* 모달 본문 */}
            <div className="p-6">
              {/* 내 순서 표시 */}
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {myPosition}
                </div>
                <p className="text-gray-600">현재 내 순서</p>
              </div>

              {/* 프로그레스바 */}
              <div className="mb-6">
                <Loader />
              </div>

              {/* 통계 정보 */}
              <div className="flex items-center justify-center">
                {/* <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <span className="block text-sm text-blue-800 font-medium">
                    총 대기인원
                  </span>
                  <span className="text-2xl font-bold text-blue-900">
                    {estimatedTime}명
                  </span>
                </div> */}
                <div className="bg-green-50 rounded-lg p-3 text-center ">
                  <span className="block text-sm text-green-800 font-medium">
                    예상 대기시간
                  </span>
                  <span className="text-2xl font-bold text-green-900">
                    {estimatedTime}초
                  </span>
                </div>
              </div>

              {/* 상태 메시지 */}
              <div className="mt-6 text-center">
                {/* <p className="text-gray-700">
                  {myPosition <= 1
                    ? "현재 처리중입니다. 잠시만 기다려주세요."
                    : myPosition <= 3
                      ? `곧 처리가 시작됩니다. 약 ${myPosition * 5}분 남았습니다.`
                      : `앞에 ${myPosition - 1}명이 대기중입니다. 잠시만 기다려주세요.`}
                </p> */}
                <p className="text-gray-700">
                  대기열을 떠나면 대기시간이 증가합니다.
                </p>
              </div>
            </div>

            {/* 모달 풋터 */}
            {/* <div className="bg-gray-50 px-6 py-3 flex justify-center border-t border-gray-200">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                onClick={onClose}
              >
                확인
              </button>
            </div> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SSEComponent;
