"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import PageSetting from "@/app/pageSetting";
import { getAccountRecord } from "../api/getRecord";
import { AuthGuard } from "@/utils/authGuard";

import { Button } from "@/components/ui/button";
import { CalendarIcon, RefreshCw } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DateRangePicker from "@/components/ui/datePicker";
import { PopoverClose } from "@radix-ui/react-popover";

interface Transaction {
  transactionDate: string;
  transactionTime: string;
  transactionType: string;
  transactionTypeName: string;
  transactionBalance: string;
  transactionAfterBalance: string;
  transactionSummary: string;
}

type TransactionsResponse = {
  totalCount: string;
  list: Transaction[];
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-4">
    <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

function SavingsJournalPage() {
  const router = useRouter();
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [transactions, setTransactions] = useState<TransactionsResponse | null>(
    null
  );
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startDate, setStartDate] = useState(
    firstDayOfMonth.toISOString().split("T")[0]
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(firstDayOfMonth),
    to: new Date(),
  });

  const handleDatePicker = async () => {
    if (dateRange.from && dateRange.to) {
      const formattedFrom = format(dateRange.from, "yyyyMMdd");
      const formattedTo = format(dateRange.to, "yyyyMMdd");

      console.log("From Date:", formattedFrom);
      console.log("To Date:", formattedTo);

      setDateRange({
        from: dateRange.from,
        to: dateRange.to,
      });

      await fetchTransactions();
    }
  };

  const handleRefresh = () => {
    fetchTransactions();
  };

  const handleSavingRate = () => {
    router.push("/account/saving-rate");
  };

  const handleWithdrawal = () => {
    router.push("/quiz");
  };

  const parseTransactionSummary = (summary: string) => {
    const regex = /:\s*(.*?)(?:,\s*(\d+)(원)?)?$/;
    const match = summary.match(regex);

    if (match) {
      const description = match[1];
      const amount = match[2] ? parseInt(match[2], 10) : 0;

      return { description, amount };
    }
    return { description: "", amount: 0 };
  };

  useEffect(() => {
    if (dateRange.from) {
      const startDateWithAddedDay = new Date(dateRange.from);
      startDateWithAddedDay.setDate(startDateWithAddedDay.getDate() + 1);
      setStartDate(startDateWithAddedDay.toISOString().split("T")[0]);
    }
    if (dateRange.to) {
      setEndDate(dateRange.to.toISOString().split("T")[0]);
    }
  }, [dateRange]);

  const fetchTransactions = async () => {
    setLoading(true);

    const startDate = dateRange.from
      ? format(dateRange.from, "yyyyMMdd")
      : format(firstDayOfMonth, "yyyyMMdd");
    const endDate = dateRange.to
      ? format(dateRange.to, "yyyyMMdd")
      : format(today, "yyyyMMdd");
    const transactionType = "A"; // M:입금, D:출금, A:전체
    const orderByType = "DESC"; // ASC:오름차순, DESC:내림차순

    try {
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        transactionType,
        orderByType,
      });

      const transactionResponse = await getAccountRecord(
        queryParams.toString()
      );

      if (transactionResponse) {
        console.log("res", transactionResponse?.data.content);
        setTransactions(transactionResponse?.data.content);
        console.log(transactionResponse?.data.content.list);
      }
    } catch (error) {
      console.log("거래 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (transactions && Number(transactions.totalCount) > 0) {
      const spent = transactions.list.reduce((total, transaction) => {
        const { amount } = parseTransactionSummary(
          transaction.transactionSummary
        );
        if (transaction.transactionType === "1") {
          return total + amount;
        } else if (transaction.transactionType === "2") {
          return total - amount;
        }
        return total;
      }, 0);
      const saved = transactions.list.reduce((total, transaction) => {
        const balance = parseInt(
          transaction.transactionBalance.replace(",", ""),
          10
        );
        if (transaction.transactionType === "1") {
          return total + balance;
        }
        return total;
      }, 0);
      setTotalSpent(spent);
      setTotalSaved(saved);
    }
  }, [transactions]);

  const formatDate = (dateStr: string, timeStr: string) => {
    const date =
      dateStr.slice(0, 4) + "-" + dateStr.slice(4, 6) + "-" + dateStr.slice(6);
    const time =
      timeStr.slice(0, 2) + ":" + timeStr.slice(2, 4) + ":" + timeStr.slice(4);
    const combined = `${date}T${time}`;

    const dateObj = new Date(combined);
    const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${time}`;
    return formattedDate;
  };

  return (
    <>
      <PageSetting
        pageTitle="나의 쓰담 일지"
        headerLink="back"
        headerName="이전"
      >
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
        <div
          className="w-full h-8 bg-amber-100 flex justify-center text-[1rem] font-semibold mb-4 items-center rounded-lg cursor-pointer  hover:text-[#000000] hover:bg-[#ffe270]/80 shadow-sm transition"
          onClick={handleWithdrawal}
        >
          출금하기
        </div>

        <div className="mb-2 flex justify-between items-center w-full">
          <div className="flex items-center w-full">
            <div className="p-4 bg-white border-t border-b w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">조회기간</div>

                <div
                  className="flex items-center text-sm hover:underline transition cursor-pointer"
                  onClick={handleSavingRate}
                >
                  <span className="mr-1">저축 비율 설정</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              <div className="flex flew-row gap-2 justify-between">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex flex-row items-center gap-2 cursor-pointer hover:underline transition">
                      <CalendarIcon className="h-4 w-4" />
                      <div className="text-m">
                        {dateRange.from && dateRange.to
                          ? `${format(dateRange.from, "yyyy.MM.dd")} ~ ${format(dateRange.to, "yyyy.MM.dd")}`
                          : "잘못된 날짜 범위"}
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto py-1" align="start">
                    <div className="flex flex-row gap-3 items-center justify-between">
                      <DateRangePicker
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                      />
                      <PopoverClose asChild>
                        <Button
                          onClick={handleDatePicker}
                          size="sm"
                          className="bg-[#2b88d9] h-8 gap-1 rounded-lg font-bold hover:bg-[#2b88d9]/80"
                        >
                          확인
                        </Button>
                      </PopoverClose>
                    </div>
                  </PopoverContent>
                </Popover>
                <RefreshCw
                  className="w-4 cursor-pointer hover:w-5 transition"
                  onClick={handleRefresh}
                />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex-1 mb-[80px]">
            {transactions &&
            Number(transactions.totalCount) > 0 &&
            transactions.list.length > 0 ? (
              transactions.list.map((transaction, index) => {
                const { description, amount } = parseTransactionSummary(
                  transaction.transactionSummary
                );

                return (
                  <div key={index} className="py-4 border-b border-gray-100">
                    <div className="text-sm text-gray-500 mb-3">
                      {formatDate(
                        transaction.transactionDate,
                        transaction.transactionTime
                      )}
                    </div>
                    <div className="flex justify-between items-cente">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <img
                            src="/icons/icon_Card.svg"
                            alt="Icon Card"
                            className="w-6 mr-1"
                          />
                          <span className="text-medium text-nowrap text-red-600">
                            {amount ? formatCurrency(amount) + "원" : "-"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <img
                          src="/icons/icon_Coin.svg"
                          alt=""
                          className="w-5"
                        />
                        <span className="text-yellow-600 font-medium ml-1">
                          <span
                            className={`text-medium text-nowrap ${transaction.transactionType === "1" ? "text-blue-600" : "text-green-600"}`}
                          >
                            {transaction.transactionType === "1"
                              ? "+" +
                                formatCurrency(
                                  Number(transaction.transactionBalance)
                                ) +
                                "원"
                              : "-" +
                                formatCurrency(
                                  Number(transaction.transactionBalance)
                                ) +
                                "원"}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-between items-center mt-3 mb-[-2]">
                      <div className="text-sm text-nowrap justify-center">
                        {description}
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        잔액{" "}
                        {formatCurrency(
                          Number(transaction.transactionAfterBalance)
                        )}{" "}
                        원
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500">
                거래 내역이 없습니다.
              </div>
            )}
          </div>
        )}
      </PageSetting>
    </>
  );
}

export default AuthGuard(SavingsJournalPage);
