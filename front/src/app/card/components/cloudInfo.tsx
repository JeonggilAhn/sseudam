"use client";

interface CloudInfoProps {
  type: "소비" | "저축";
  amount: number;
  color: string;
  textColor: string;
}

const CloudInfo = ({ type, amount, color, textColor }: CloudInfoProps) => {
  // 금액 포맷팅 (천 단위 콤마)
  const formattedAmount = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div
  className="relative flex flex-col justify-center items-center p-4 w-[130px] h-[100px] rounded-full shadow-xl transition-transform duration-300 hover:scale-105"
  style={{
    background: `radial-gradient(circle at 30% 30%, ${color}, #e0f7fa)`,
  }}
>
  {/* 상단 구름 돌출부 */}
  <div
    className="absolute -top-5 left-1/5 w-[38px] h-[38px] rounded-full shadow-md"
    style={{
      background: `radial-gradient(circle at 30% 30%, ${color}, #ffffff)`,
    }}
  ></div>
  <div
    className="absolute -top-8 left-1/3 w-[50px] h-[50px] rounded-full shadow-md"
    style={{
      background: `radial-gradient(circle at 40% 40%, ${color}, #ffffff)`,
    }}
  ></div>
  <div
    className="absolute -top-4 right-1/5 w-[42px] h-[42px] rounded-full shadow-md"
    style={{
      background: `radial-gradient(circle at 30% 30%, ${color}, #ffffff)`,
    }}
  ></div>

  {/* 텍스트 내용 */}
  <div className="z-10 text-center">
    <p className="text-sm font-semibold tracking-tight" style={{ color: textColor }}>
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
