// utils/sortSavings.ts
import { SavingCardType } from "@/types/saving";

export const sortSavings = (
  list: SavingCardType[],
  sort: "likes" | "views" | "maxIntRate" | ""
) => {
  const sorted = [...list];
  if (sort === "likes") {
    sorted.sort((a, b) => b.likeCount - a.likeCount);
  } else if (sort === "views") {
    sorted.sort((a, b) => b.views - a.views);
  } else if (sort === "maxIntRate") {
    sorted.sort((a, b) => b.maxIntRate - a.maxIntRate);
  }
  return sorted;
};
