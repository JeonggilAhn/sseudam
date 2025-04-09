const bankIconMap: Record<string, string> = {
  우리은행: "logoIconWoori",
  중소기업은행: "logoIconIBK",
  국민은행: "logoIconKb",
  신한은행: "logoIconSinhan",
  경남은행: "logoIconKn",
  광주은행: "logoIconKj",
  전북은행: "logoIconJb",
  제주은행: "logoIconJeju",
  한국산업은행: "logoIconKDB",
  하나은행: "logoIconHana",
  농협은행주식회사: "logoIconNH",
  수협은행: "logoIconSh",
  "주식회사 케이뱅크": "logoIconKbank",
  "주식회사 카카오뱅크": "logoIconKakao",
  "토스뱅크 주식회사": "logoIconToss",
  부산은행: "logoIconBusan",
  한국스탠다드차타드은행: "logoIconSc",
  SBI저축은행: "logoIconSBI",
  아이엠뱅크: "logoIconIm",
  디비저축은행: "logoIconDB",
  애큐온저축은행: "logoIconAQon",
  OSB저축은행: "logoIconOSB",
};

export const getBankIconName = (finCoNo: string): string => {
  return bankIconMap[finCoNo] || "logoIconSsafy";
};
