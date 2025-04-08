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
import { PopoverClose } from "@radix-ui/react-popover";

interface Transaction {
  status: {
    code: string;
    message: string;
  };
  content: {
    totalCount: string;
    list: {
      transaction_date: string;
      transaction_time: string;
      transaction_type: string;
      transaction_type_name: string;
      transcation_balance: string;
      transaction_after_balance: string;
      transaction_summary: string;
    }[];
  };
}

// type Data = {
//   startDate: string;
//   endDate: string;
//   transactionType: string;
//   orderByType: string;
// };

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-4">
    <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default function SavingsJournalPage() {
  // const router = useRouter();
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // const [transactions, setTransactions] = useState([]);
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

  const handleDatePicker = async () => {
    if (dateRange.from && dateRange.to) {
      const formattedFrom = format(dateRange.from, "yyyyMMdd");
      const formattedTo = format(dateRange.to, "yyyyMMdd");

      console.log("From Date:", formattedFrom);
      console.log("To Date:", formattedTo);

      // await fetchTransactions();
    }
  };

  const parseTransactionSummary = (summary: string) => {
    const parts = summary.split(", ");

    if (parts.length === 3) {
      const description = parts[0];
      const amount = parts[1].replace(",", "");
      const location = parts[2];

      return { description, amount: parseInt(amount, 10), location };
    }

    return { description: "", amount: 0, location: "" };
  };

  useEffect(() => {
    if (dateRange.from) {
      const startDateWithAddedDay = new Date(dateRange.from);
      startDateWithAddedDay.setDate(startDateWithAddedDay.getDate() + 1);
      setStartDate(startDateWithAddedDay.toISOString().split("T")[0]);

      // setStartDate(dateRange.from.toISOString().split("T")[0]);
    }
    if (dateRange.to) {
      // const endDateWithAddedDay = new Date(dateRange.to);
      // endDateWithAddedDay.setDate(endDateWithAddedDay.getDate() + 1);
      // setEndDate(endDateWithAddedDay.toISOString().split("T")[0]);

      setEndDate(dateRange.to.toISOString().split("T")[0]);
    }
  }, [dateRange]);

  useEffect(() => {
    const fetchTransactions = async () => {
      // const data: Data = {
      //   startDate: dateRange.from
      //     ? format(dateRange.from, "yyyyMMdd")
      //     : format(firstDayOfMonth, "yyyyMMdd"),
      //   endDate: dateRange.to
      //     ? format(dateRange.to, "yyyyMMdd")
      //     : format(today, "yyyyMMdd"),
      //   transactionType: "A", //M:입금, D:출금, A:전체
      //   orderByType: "ASC", //ASC:오름차순, DESC:내림차순
      // };

      const startDate = dateRange.from
        ? format(dateRange.from, "yyyyMMdd")
        : format(firstDayOfMonth, "yyyyMMdd");
      const endDate = dateRange.to
        ? format(dateRange.to, "yyyyMMdd")
        : format(today, "yyyyMMdd");
      const transactionType = "A"; // M:입금, D:출금, A:전체
      const orderByType = "ASC"; // ASC:오름차순, DESC:내림차순

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
        console.log(transactionResponse);
        // setTransactions(transactionResponse);
      } catch (error) {
        console.log("거래 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchTransactions();
  }, []);

  // const formatCurrency = (value: number) => {
  //   return new Intl.NumberFormat("ko-KR", {
  //     // style: "currency",
  //     currency: "KRW",
  //   }).format(value);
  // };

  const transactions: Transaction[] = [
    {
      status: {
        code: "200",
        message: "성공적으로 데이터를 가져왔습니다.",
      },
      content: {
        totalCount: "10",
        list: [
          {
            transaction_date: "2025-04-01",
            transaction_time: "08:30:00",
            transaction_type: "DEPOSIT",
            transaction_type_name: "입금",
            transcation_balance: "500,000",
            transaction_after_balance: "1,500,000",
            transaction_summary: "급여 입금, 50,000, 서울 강남",
          },
          {
            transaction_date: "2025-04-02",
            transaction_time: "09:15:00",
            transaction_type: "WITHDRAWAL",
            transaction_type_name: "출금",
            transcation_balance: "200,000",
            transaction_after_balance: "1,300,000",
            transaction_summary: "마트 쇼핑, 20,000, 서울 명동",
          },
          {
            transaction_date: "2025-04-03",
            transaction_time: "12:45:00",
            transaction_type: "WITHDRAWAL",
            transaction_type_name: "출금",
            transcation_balance: "100,000",
            transaction_after_balance: "1,200,000",
            transaction_summary: "친구에게 송금, 10,000, 부산 해운대",
          },
          {
            transaction_date: "2025-04-04",
            transaction_time: "14:20:00",
            transaction_type: "WITHDRAWAL",
            transaction_type_name: "출금",
            transcation_balance: "50,000",
            transaction_after_balance: "1,150,000",
            transaction_summary: "카페에서 커피, 5,000, 서울 홍대",
          },
          {
            transaction_date: "2025-04-05",
            transaction_time: "16:00:00",
            transaction_type: "DEPOSIT",
            transaction_type_name: "입금",
            transcation_balance: "200,000",
            transaction_after_balance: "1,350,000",
            transaction_summary: "보너스 입금, 20,000, 서울 종로",
          },
          {
            transaction_date: "2025-04-06",
            transaction_time: "10:30:00",
            transaction_type: "WITHDRAWAL",
            transaction_type_name: "출금",
            transcation_balance: "120,000",
            transaction_after_balance: "1,230,000",
            transaction_summary: "식사비, 12,000, 서울 강남",
          },
          {
            transaction_date: "2025-04-06",
            transaction_time: "11:00:00",
            transaction_type: "WITHDRAWAL",
            transaction_type_name: "출금",
            transcation_balance: "150,000",
            transaction_after_balance: "1,080,000",
            transaction_summary: "세금, 15,000, 서울 여의도",
          },
          {
            transaction_date: "2025-04-06",
            transaction_time: "13:30:00",
            transaction_type: "WITHDRAWAL",
            transaction_type_name: "출금",
            transcation_balance: "80,000",
            transaction_after_balance: "1,000,000",
            transaction_summary: "영화관, 8,000, 서울 신촌",
          },
          {
            transaction_date: "2025-04-06",
            transaction_time: "15:10:00",
            transaction_type: "DEPOSIT",
            transaction_type_name: "입금",
            transcation_balance: "300,000",
            transaction_after_balance: "1,300,000",
            transaction_summary: "투자금 입금, 30,000, 서울 강남",
          },
          {
            transaction_date: "2025-04-06",
            transaction_time: "17:45:00",
            transaction_type: "WITHDRAWAL",
            transaction_type_name: "출금",
            transcation_balance: "150,000",
            transaction_after_balance: "1,150,000",
            transaction_summary: "기타 지출, 15,000, 서울 마포",
          },
        ],
      },
    },
  ];

  useEffect(() => {
    const spent = transactions[0].content.list.reduce((total, transaction) => {
      const { amount } = parseTransactionSummary(
        transaction.transaction_summary
      );
      if (transaction.transaction_type === "DEPOSIT") {
        return total + amount;
      } else if (transaction.transaction_type === "WITHDRAWAL") {
        return total - amount;
      }
      return total;
    }, 0);

    const saved = transactions[0].content.list.reduce((total, transaction) => {
      const balance = parseInt(
        transaction.transcation_balance.replace(",", ""),
        10
      );
      if (transaction.transaction_type === "DEPOSIT") {
        return total + balance;
      } else if (transaction.transaction_type === "WITHDRAWAL") {
        return total - balance;
      }
      return total;
    }, 0);

    setTotalSpent(spent);
    setTotalSaved(saved);
  }, [transactions]);

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
                  <div className="flex flex-row items-center gap-2 cursor-pointer">
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
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex-1 mb-[80px]">
            {transactions.length > 0 &&
            transactions[0].content.list.length > 0 ? (
              transactions[0].content.list.map((transaction, index) => {
                const { description, amount } =
                  // const { description, amount, location } =
                  parseTransactionSummary(transaction.transaction_summary);

                return (
                  <div key={index} className="py-4 border-b border-gray-100">
                    <div className="text-sm text-gray-500 mb-3">
                      {transaction.transaction_date}{" "}
                      {transaction.transaction_time}
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
                            className={`text-medium text-nowrap ${transaction.transaction_type === "DEPOSIT" ? "text-blue-600" : "text-green-600"}`}
                          >
                            {transaction.transaction_type === "DEPOSIT"
                              ? "+ " + transaction.transcation_balance + "원"
                              : "- " + transaction.transcation_balance + "원"}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 ml-6 flex justify-between items-center mt-3 mb-[-2]">
                      <div className="text-sm text-nowrap">{description}</div>
                      <div className="text-right text-xs text-gray-500">
                        잔액 {transaction.transaction_after_balance} 원
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
