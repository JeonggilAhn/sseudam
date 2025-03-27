"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function SavingRate() {
  return (
    <>
      <header className="p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="rounded-full mr-2 p-0">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold text-[#7b7b7b]">마이페이지</h1>
        </div>
      </header>

      <RateBar />

      {/* <div className="p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-8 w-8" />
          </Button>
        </div>
      </div> */}
    </>
  );
}

function RateBar() {
  const [savingsRate, setSavinsRate] = useState(5);

  return (
    <>
      <header className="mt-[20px] mb-[60px]">
        <h1 className="text-[28px] font-bold flex justify-start ml-8">
          저축 비율 설정
        </h1>
      </header>

      <div className="ml-4 mr-4">
        <div className="flex justify-center">
          <Slider
            value={[savingsRate]}
            onValueChange={(value) => setSavinsRate(value[0])}
            max={100}
            step={5}
            className="w-[85%] h-2 mb-4"
          ></Slider>
        </div>
        <div className="text-center font-medium text-xl">{savingsRate}%</div>
      </div>
    </>
  );
}
