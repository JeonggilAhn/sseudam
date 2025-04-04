"use client";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-md w-full max-w-xl mx-auto mb-4 flex items-center justify-between">
      <div className="flex flex-col items-center min-w-[70px]">
        <Skeleton className="h-6 w-16 mb-2" />
        <Skeleton className="h-3 w-14" />
      </div>
      <div className="flex-1 px-4">
        <Skeleton className="h-4 w-40 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex flex-col items-end min-w-[90px] gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
};

export default SkeletonCard;
