"use client";

import Image from "next/image";

interface CloudInfoProps {
  type: "소비" | "저축";
  amount: number;
  color: string;
  textColor: string;
  onClick?: () => void;
}

const CloudInfo = ({
  type,
  amount,
  color,
  textColor,
  onClick,
}: CloudInfoProps) => {
  // 금액 포맷팅 (천 단위 콤마)
  const formattedAmount = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="relative flex flex-col justify-center items-center p-4 w-[130px] h-[5vh] min-h-[50px] rounded-full transition-transform duration-300 hover:scale-105">
      {/* 상단 구름 돌출부 */}
      {color === "dark" ? (
        <div className="absolute flex w-[25vw] h-auto min-w-[130px] justify-center items-center">
          <Image
            src="/icons/darkCloud.svg"
            alt="구름 이미지"
            width={300}
            height={300}
          />
        </div>
      ) : (
        <div className="absolute flex w-[25vw] h-auto min-w-[125px] justify-center items-center">
          <Image
            src="/icons/whitecloud.svg"
            alt="구름 이미지"
            width={300}
            height={300}
            onClick={onClick}
          />
        </div>
      )}
      {/* 텍스트 내용 */}
      <div className="z-10 text-center">
        <p
          className="text-sm font-semibold tracking-tight"
          style={{ color: textColor }}
        >
          {type}
        </p>
        <p className="text-xl font-extrabold" style={{ color: textColor }}>
          ₩ {formattedAmount}
        </p>
      </div>
    </div>
  );
};

export default CloudInfo;
