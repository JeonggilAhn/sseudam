import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  const absAmount = Math.abs(amount);
  return absAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
