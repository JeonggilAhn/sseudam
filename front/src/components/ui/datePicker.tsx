"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isBefore, isAfter } from "date-fns";

interface DateRangePickerProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>
  >;
}

export default function DateRangePicker({
  dateRange,
  setDateRange,
}: DateRangePickerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const today = new Date();

  if (!isClient) {
    return (
      <div className="flex justify-between items-center border rounded-lg p-3">
        <div className="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  const handleFromDateSelect = (date: Date | undefined) => {
    if (date) {
      const kstDate = toZonedTime(date, "Asia/Seoul");
      kstDate.setHours(0, 0, 0, 0);

      if (dateRange.to && isAfter(kstDate, dateRange.to)) {
        return;
      }

      setDateRange((prevState) => ({
        ...prevState,
        from: kstDate,
      }));
    }
  };

  const handleToDateSelect = (date: Date | undefined) => {
    if (date) {
      const kstDate = toZonedTime(date, "Asia/Seoul");
      kstDate.setHours(23, 59, 59, 999);

      if (dateRange.from && isBefore(kstDate, dateRange.from)) {
        return;
      }

      setDateRange((prevState) => ({
        ...prevState,
        to: kstDate,
      }));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal h-10 rounded-lg"
          >
            {dateRange.from ? (
              format(dateRange.from, "yyyy.MM.dd")
            ) : (
              <span>시작일</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateRange.from}
            onSelect={handleFromDateSelect}
            initialFocus
            disabled={{ after: today }}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal h-10 rounded-lg"
          >
            {dateRange.to ? (
              format(dateRange.to, "yyyy.MM.dd")
            ) : (
              <span>종료일</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateRange.to}
            onSelect={handleToDateSelect}
            initialFocus
            disabled={{ before: dateRange.from, after: today }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
