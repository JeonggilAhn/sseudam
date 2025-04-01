import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 숫자를 통화 형식으로 변환하는 함수
export function formatCurrency(amount: number): string {
  const absAmount = Math.abs(amount);
  return absAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
