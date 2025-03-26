import React, { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface seletedDateProps {
  setBirth: (birth: string) => void;
  value: string;
  onBlur: {};
}

const getDaysInMonth = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export const SelectDate: React.FC<seletedDateProps> = ({ setBirth, value }) => {
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState<number | null>(
    value ? Number(value.replace(/-/g, "").slice(0, 4)) : null
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    value ? Number(value.replace(/-/g, "").slice(4, 6)) : null
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(
    value ? Number(value.replace(/-/g, "").slice(6)) : null
  );
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      setDays(getDaysInMonth(selectedYear, selectedMonth));
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const maxDays = getDaysInMonth(selectedYear, selectedMonth);
      setDays(maxDays);
      // if (selectedDay !== null && selectedDay > maxDays.length) {
      if (selectedDay && !maxDays.includes(selectedDay)) {
        setSelectedDay(null);
        setBirth("");
      }
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
      setBirth(formattedDate);
    } else {
      setBirth("");
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <>
      <div className="flex w-full gap-1 justify-center">
        <Select
          value={selectedYear?.toString()}
          onValueChange={(value) => setSelectedYear(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue
              placeholder={value ? value.replace(/-/g, "").slice(0, 4) : "Year"}
            />
          </SelectTrigger>
          <SelectContent side="bottom">
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={selectedMonth?.toString()}
          onValueChange={(value) => setSelectedMonth(Number(value))}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue
              placeholder={
                value ? value.replace(/-/g, "").slice(4, 6) : "Month"
              }
            />
          </SelectTrigger>
          <SelectContent side="bottom">
            <SelectGroup>
              <SelectLabel>Month</SelectLabel>
              {months.map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          disabled={!(selectedYear && selectedMonth)}
          value={selectedDay !== null ? selectedDay?.toString() : ""}
          onValueChange={(value) => setSelectedDay(Number(value))}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue
              placeholder={value ? selectedDay?.toString() : "Day"}
            />
          </SelectTrigger>
          <SelectContent side="bottom">
            <SelectGroup>
              <SelectLabel>Day</SelectLabel>
              {days.map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
