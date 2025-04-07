// src/types/saving.ts
export interface SavingCardType {
  saving_id: number;
  fin_co_nm: string;
  fin_prdt_nm: string;
  min_int_rate: number;
  max_int_rate: number;
  views: number;
  like_count: number;
  likes: number;
  liked?: boolean;
}

// 가입 성공한 적금 응답
export interface SavingDetailType {
  saving_id: number;
  fin_prdt_cd: string;
  fin_co_nm: string;
  fin_prdt_nm: string;
  maxLimit: number;
  joinDeny: number;
  joinMember: string;
  joinWay: string;
  etc_note: string;
  spcl_cnd: string;
  min_int_rate: number;
  max_int_rate: number;
  homp_url: string;
  views: number;
  like_count: number;
  likes: number;
}

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
