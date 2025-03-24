const bankIconMap: Record<string, string> = {
  "0010001": "logoIconWoori",
  "0010026": "logoIconIBK",
  "0010927": "logoIconKb",
  "0011625": "logoIconSinhan",
  "0010024": "logoIconKn",
  "0010019": "logoIconKj",
  "0010022": "logoIconJb",
  "0010020": "logoIconJeju",
  "0010030": "logoIconKDB",
  "0013909": "logoIconHana",
  "0013175": "logoIconNH",
  "0014807": "logoIconSh",
  "0014674": "logoIconKbank",
  "0015130": "logoIconKakao",
  "0017801": "logoIconToss",
  "0010017": "logoIconBusan",
};

export const getBankIconName = (finCoNo: string): string => {
  return bankIconMap[finCoNo] || "logoIconSsafy";
};
