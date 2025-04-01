"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface NumericKeypadProps {
  onConfirm: (value: string) => void;
  maxLength?: number;
  initialValue?: string;
  showValue?: boolean;
  confirmText?: string;
}

export default function NumericKeypad({
  onConfirm,
  maxLength = 6,
  initialValue = "",
  showValue = true,
  confirmText = "확인",
}: NumericKeypadProps) {
  const [value, setValue] = useState(initialValue);
  const [visibleDigits, setVisibleDigits] = useState<boolean[]>([]);
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      timerRefs.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleKeyPress = (key: string) => {
    if (key === "delete") {
      if (value.length > 0) {
        const newLength = value.length - 1;
        if (timerRefs.current[newLength]) {
          clearTimeout(timerRefs.current[newLength]);
        }
        timerRefs.current = timerRefs.current.slice(0, newLength);
        setVisibleDigits((prev) => prev.slice(0, newLength));
      }
      setValue((prev) => prev.slice(0, -1));
      return;
    }

    if (value.length < maxLength) {
      setValue((prev) => prev + key);

      const newIndex = value.length;
      setVisibleDigits((prev) => [...prev, true]);

      const timer = setTimeout(() => {
        setVisibleDigits((prev) => {
          const updated = [...prev];
          if (updated[newIndex] !== undefined) {
            updated[newIndex] = false;
          }
          return updated;
        });
      }, 500);

      timerRefs.current[newIndex] = timer;
    }
  };

  const handleConfirm = () => {
    onConfirm(value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {showValue && (
        <div className="text-center mb-6">
          <div className="text-2xl font-bold tracking-widest flex justify-center space-x-2">
            {value.split("").map((digit, index) => (
              <span key={index}>{visibleDigits[index] ? digit : "•"}</span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="ghost"
            className="h-16 text-2xl font-medium rounded-md hover:bg-gray-100"
            onClick={() => handleKeyPress(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="ghost"
          className="h-16 text-2xl font-medium rounded-md hover:bg-gray-100"
          onClick={() => handleKeyPress("*")}
        >
          *
        </Button>
        <Button
          variant="ghost"
          className="h-16 text-2xl font-medium rounded-md hover:bg-gray-100"
          onClick={() => handleKeyPress("0")}
        >
          0
        </Button>
        <Button
          variant="ghost"
          className="h-16 text-lg font-medium rounded-md hover:bg-gray-100"
          onClick={() => handleKeyPress("delete")}
        >
          삭제
        </Button>
      </div>

      <div className="mt-6">
        <Button
          className={`w-full h-14 text-lg font-medium rounded-md ${
            value.length === maxLength
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
          disabled={value.length !== maxLength}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
}
