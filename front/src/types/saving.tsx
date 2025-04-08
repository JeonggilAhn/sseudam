// src/types/saving.ts
export interface SavingCardType {
  savingId: number;
  finCoNm: string;
  finPrdtNm: string;
  minIntRate: number;
  maxIntRate: number;
  views: number;
  likeCount: number;
  liked?: boolean;
}

//
export interface SavingDetailType {
  savingId: number;
  finPrdtCd: string;
  finCoNm: string;
  finPrdtNm: string;
  maxLimit: number;
  joinDeny: number;
  joinMember: string;
  joinWay: string;
  etcNote: string;
  spclCnd: string;
  minIntRate: number;
  maxIntRate: number;
  hompUrl: string;
  views: number;
  likeCount: number;
  liked?: boolean;
}

// 가입 성공한 적금 응답
export interface OpenSavingResponseType {
  bankCode: string;
  bankName: string;
  accountName: string;
  subscriptionPeriod: string;
  interestRate: string;
  accountCreateDate: string;
  accountExpiryDate: string;
  depositBalance: number;
}
