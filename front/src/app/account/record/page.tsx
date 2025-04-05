"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import PageSetting from "@/app/pageSetting";
import { getAccountRecord } from "../api/getRecord";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DateRangePicker from "@/components/ui/datePicker";

interface Transaction {
  id: number;
  date: string;
  time: string;
  description: string;
  amount: number;
  reward: number;
}

type Data = {
  startDate: string;
  endDate: string;
  transactionType: string;
  orderByType: string;
};

export default function SavingsJournalPage() {
  // const router = useRouter();
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [startDate, setStartDate] = useState(
    firstDayOfMonth.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);

  // const handleSavingRate = () => {
  //   router.push("/account/saving-rate");
  // };

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(firstDayOfMonth),
    to: new Date(),
  });

  const handleDatePicker = () => {
    if (dateRange.from && dateRange.to) {
      const formattedFrom = format(dateRange.from, "yyyy-MM-dd");
      const formattedTo = format(dateRange.to, "yyyy-MM-dd");

      console.log("From Date:", formattedFrom);
      console.log("To Date:", formattedTo);
    }
  };

  // useEffect(() => {
  //   if (dateRange.from) {
  //     setStartDate(dateRange.from.toISOString().split("T")[0]);
  //   }
  //   if (dateRange.to) {
  //     setEndDate(dateRange.to.toISOString().split("T")[0]);
  //   }
  // }, [dateRange]);

  useEffect(() => {
    if (dateRange.from) {
      const startDateWithAddedDay = new Date(dateRange.from);
      startDateWithAddedDay.setDate(startDateWithAddedDay.getDate() + 1);
      setStartDate(startDateWithAddedDay.toISOString().split("T")[0]);
    }
    if (dateRange.to) {
      const endDateWithAddedDay = new Date(dateRange.to);
      endDateWithAddedDay.setDate(endDateWithAddedDay.getDate() + 1);
      setEndDate(endDateWithAddedDay.toISOString().split("T")[0]);
    }
  }, [dateRange]);

  const data: Data = {
    startDate: startDate,
    endDate: endDate,
    transactionType: "A", //M:입금, D:출금, A:전체
    orderByType: "ASC", //ASC:오름차순, DESC:내림차순
  };

  // const accountTransactions = async () => {
  //   try {
  //     const transactionResponse = await getAccountRecord(data);

  //     const fetchedTransactions = transactionResponse.content.list.map(
  //       (transaction, index) => {
  //         const [storeName, productName, amount] =
  //           transaction.transaction_summary
  //             .split(", ")
  //             .map((item) => item.trim());

  //         return {
  //           id: index + 1,
  //           date: transaction.transaction_date,
  //           time: transaction.transaction_time,
  //           description: `${storeName}, ${productName}`,
  //           amount: parseInt(amount, 10),
  //           reward: transaction.transaction_, // 보상금액
  //         };
  //       }
  //     );

  //     console.log(transactionResponse);
  //   } catch (error) {
  //     console.log("거래 데이터를 가져오는 중 오류 발생:", error);
  //   }
  // };

  // useEffect(() => {
  //   accountTransactions();
  // }, [startDate, endDate]);

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

  const transactionArr: Transaction[] = [
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

  return (
    <>
      <PageSetting pageTitle="나의 쓰담 일지">
        <div className="mt-[-30px] mb-4">
          <Card className="shadow-sm">
            <CardContent className="p-2">
              <div className="flex justify-between">
                <div className="text-center flex-1">
                  <p className="text-lg mb-1">쓰고</p>

                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(totalSpent)} 원
                  </p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-lg mb-1">담고</p>

                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(totalSaved)} 원
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-2 flex justify-between items-center w-full">
          <div className="flex items-center w-full">
            <div className="p-4 bg-white border-t border-b w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">조회기간</div>

                <div className="flex items-center text-sm">
                  <span className="mr-1">저축 비율 설정</span>
                  <ChevronRight
                    // onClick={handleSavingRate}
                    className="h-4 w-4"
                  />
                </div>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex flex-row items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <div className="text-m">
                      {startDate} ~ {endDate}
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto py-1" align="start">
                  <div className="flex flex-row gap-3 items-center justify-between">
                    <DateRangePicker
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                    />
                    <Button
                      onClick={handleDatePicker}
                      size="sm"
                      className="bg-[#2b88d9] h-8 gap-1 rounded-lg font-bold hover:bg-[#2b88d9]/80"
                    >
                      확인
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4">
          {transactionArr.map((transaction) => (
            // {transactions.map((transaction) => (
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
      </PageSetting>
    </>
  );
}
