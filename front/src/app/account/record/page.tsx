"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
  id: number;
  date: string;
  time: string;
  description: string;
  amount: number;
  reward: number;
}

export default function SavingsJournalPage() {
  const transactions: Transaction[] = [
    {
      id: 1,
      date: "2025.03.11",
      time: "14:17:15",
      description: "바나플에플엔비",
      amount: -1800,
      reward: 180,
    },
    {
      id: 2,
      date: "2025.03.11",
      time: "14:17:15",
      description: "바나플에플엔비",
      amount: -1800,
      reward: 180,
    },
    {
      id: 3,
      date: "2025.03.11",
      time: "14:17:15",
      description: "바나플에플엔비",
      amount: -1800,
      reward: 180,
    },
    {
      id: 4,
      date: "2025.03.11",
      time: "14:17:15",
      description: "바나플에플엔비",
      amount: -1800,
      reward: 180,
    },
    {
      id: 5,
      date: "2025.03.11",
      time: "14:17:15",
      description: "바나플에플엔비",
      amount: -1800,
      reward: 180,
    },
  ];

  const [totalSpent, setTotalSpent] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    const spent = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

    const saved = transactions.reduce(
      (total, transaction) => total + transaction.reward,
      0
    );

    setTotalSpent(spent);
    setTotalSaved(saved);
  }, [transactions]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-white p-4 flex justify-between items-center">
        <div className="text-black text-sm">9:41</div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.01 21C16.43 21 20.01 17.42 20.01 13C20.01 8.58 16.43 5 12.01 5C7.59 5 4.01 8.58 4.01 13C4.01 17.42 7.59 21 12.01 21Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="w-4 h-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="w-6 h-3 bg-black rounded-sm"></div>
        </div>
      </div>

      <header className="bg-white p-4">
        <h1 className="text-2xl font-bold">나의 쓰담 일지</h1>
      </header>

      <div className="px-4 mb-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div className="text-center flex-1">
                <p className="text-sm mb-1">쓰고</p>

                <p className="text-xl font-bold text-red-600">
                  {formatCurrency(totalSpent)} 원
                </p>
              </div>
              <div className="text-center flex-1">
                <p className="text-sm mb-1">담고</p>

                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(totalSaved)} 원
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 mb-2 flex justify-between items-center">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="6"
              width="18"
              height="15"
              rx="2"
              stroke="black"
              strokeWidth="2"
            />
            <path d="M3 10H21" stroke="black" strokeWidth="2" />
            <path d="M8 3V7" stroke="black" strokeWidth="2" />
            <path d="M16 3V7" stroke="black" strokeWidth="2" />
          </svg>
          <span className="text-sm">2024.12.11 ~ 2025.03.11</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="mr-1">저축 비율 10%</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex-1 px-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="py-4 border-b border-gray-100">
            <div className="text-sm text-gray-500 mb-1">
              {transaction.date} {transaction.time}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src="/icons/icon_Card.svg"
                  alt="Icon Card"
                  className="w-6 mr-1"
                />

                <span className="text-red-600 font-medium">
                  {transaction.amount} 원
                </span>
              </div>
              <div className="flex-1 mx-4">
                <p>{transaction.description}</p>
              </div>
              <div className="flex items-center">
                <img src="/icons/icon_Coin.svg" alt="" className="w-6" />
                <span className="text-yellow-600 font-medium">
                  {transaction.reward} 원
                </span>
              </div>
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">
              잔액 {transaction.reward} 원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
