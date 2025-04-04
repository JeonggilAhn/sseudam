"use client";

import { UserAuth } from "@/utils/userAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RedirectPage = () => {
  const router = useRouter();
  const [dots, setDots] = useState("");
  const [isError, setIsError] = useState(false);

  // 귀여운 로딩 메시지들
  const cuteMessages = ["두근두근! 거의 다 됐어요", "조금만 더 기다려주세요!"];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    // 귀여운 메시지 변경
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % cuteMessages.length);
    }, 1000);

    // 인증 처리
    const timer = setTimeout(() => {
      const handleAuth = async () => {
        try {
          await UserAuth();
          // 인증 성공 후 메인 페이지로 이동
          setTimeout(() => {
            router.push("/card");
          }, 2000);
        } catch (err) {
          setIsError(true);
        }
      };

      handleAuth();
    }, 200);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(messageInterval);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 container-responsive">
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
                {cuteMessages[messageIndex]}
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
