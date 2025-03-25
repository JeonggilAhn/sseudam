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
      className={`relative flex flex-col justify-center items-center p-4 rounded-full w-[130px] h-[100px] shadow-lg`}
      style={{ backgroundColor: color }}
    >
      {/* 구름 모양 상단 돌출부 */}
      <div
        className="absolute -top-3 left-1/4 w-[30px] h-[30px] rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <div
        className="absolute -top-6 left-1/3 w-[40px] h-[40px] rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <div
        className="absolute -top-2 right-1/4 w-[35px] h-[35px] rounded-full"
        style={{ backgroundColor: color }}
      ></div>

      {/* 텍스트 내용 */}
      <div className="z-10 text-center">
        <p className={`text-${textColor} text-lg font-bold`}>{type}</p>
        <p className={`text-${textColor} text-xl font-bold`}>
          ₩ {formattedAmount}
        </p>
      </div>
    </div>
  );
};

export default CloudInfo;
