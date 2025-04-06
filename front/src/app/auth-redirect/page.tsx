"use client";

import { UserAuth } from "@/utils/userAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckAccount } from "../card/api/getCard";
import AnimatedModal from "@/components/animatedModal";
import { useAppDispatch } from "@/stores/hooks";
import {
  toggleIsModalOpen,
  resetIsModalOpen,
} from "@/stores/slices/aniModalSlice";
import Image from "next/image";

const RedirectPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [dots, setDots] = useState("");
  const [isError, setIsError] = useState(false);
  const [isContinue, setIsContinue] = useState(false);

  // 귀여운 로딩 메시지들
  const cuteMessages = ["조금만 더 기다려주세요!"];
  // const [messageIndex, setMessageIndex] = useState(0);
  const children = (
    <div className="space-y-4 flex flex-col justify-center items-center w-full h-[50vh]">
      <div className="text-6xl mb-4">😢</div>
      <div className="text-lg font-medium text-center break-all">
        서비스를 이용하시려면 저금통 계좌가 필요해요!
      </div>
    </div>
  );

  useEffect(() => {
    setIsError(false);
    dispatch(resetIsModalOpen());
    setIsContinue(false);

    const hasAccount = async () => {
      const response = await CheckAccount();
      if (response === undefined) {
        dispatch(toggleIsModalOpen());
        setTimeout(() => {
          dispatch(resetIsModalOpen());
          setTimeout(() => {
            router.push("/account/create");
          }, 200);
        }, 2500);
      } else {
        setIsContinue(false);
        setTimeout(() => {
          router.push("/card");
        }, 1000);
      }
    };

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    // 메시지 변경
    // const messageInterval = setInterval(() => {
    //   setMessageIndex((prev) => (prev + 1) % cuteMessages.length);
    // }, 1000);

    // 인증 처리

    const handleAuth = async () => {
      try {
        await UserAuth();
        // 인증 성공 후 메인 페이지로 이동
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    };
    handleAuth();
    setTimeout(() => {
      hasAccount();
    }, 500);
    return () => {
      if (isContinue) {
        clearInterval(dotsInterval);
      }
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 container-responsive">
      <div className="w-full h-auto absolute top-0 left-0 right-0">
        <AnimatedModal onClose={resetIsModalOpen}>{children}</AnimatedModal>
      </div>
      <div className="w-full max-w-xs bg-card rounded-3xl shadow-lg overflow-hidden transition-all duration-300 p-6 text-center">
        {isError ? (
          <div className="space-y-4">
            <div className="text-6xl mb-4">😢</div>
            <div className="text-lg font-medium">앗! 문제가 생겼어요</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              다시 시도하기
            </button>
          </div>
        ) : (
          <>
            {/* 귀여운 로딩 애니메이션 */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                {/* 귀여운 캐릭터 - 간단한 이모지 사용 */}
                <div className="text-6xl animate-bounce">
                  <Image
                    src="/icons/logo.svg"
                    alt="로딩 이미지"
                    width={150}
                    height={80}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-medium">
                {cuteMessages[0]}
                {dots}
              </p>
              <p className="text-sm text-muted-foreground">
                잠시만 기다려주세요
              </p>
            </div>

            {/* 귀여운 로딩 바 */}
            <div className="mt-6 flex justify-center space-x-2">
              <div
                className="w-3 h-3 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-3 h-3 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
              <div
                className="w-3 h-3 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "600ms" }}
              ></div>
            </div>
          </>
        )}
      </div>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <button
          onClick={() => router.push("/")}
          className="text-primary hover:underline"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default RedirectPage;
