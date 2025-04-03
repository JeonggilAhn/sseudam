// utils/sortSavings.ts
import { SavingCardType } from "@/types/saving";

export const sortSavings = (
  list: SavingCardType[],
  sort: "likes" | "views" | "maxIntRate" | ""
) => {
  const sorted = [...list];
  if (sort === "likes") {
    sorted.sort((a, b) => b.like_count - a.like_count);
  } else if (sort === "views") {
    sorted.sort((a, b) => b.views - a.views);
  } else if (sort === "maxIntRate") {
    sorted.sort((a, b) => b.max_int_rate - a.max_int_rate);
  }
  return sorted;
};
