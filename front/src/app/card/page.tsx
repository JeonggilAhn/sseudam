"use client";
import { useState } from "react";
import CardImage from "./components/cardImage";
import TimeBackground from "./components/timeBackground";
import GrassBackground from "./components/grassBackground";
import { CirclePlus } from "lucide-react";
import Image from "next/image";

//이미지
import logo from "../../../public/icons/logo.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import style from "styled-jsx/style";

interface Card {
  cardIssuerName: string;
  cardNo: string;
  expirationDate: string;
}

const MainPage = () => {
  const [cardList, setCardList] = useState<Card[]>([
    {
      cardIssuerName: "삼성카드",
      cardNo: "1234567890123456",
      expirationDate: "2025-12",
    },
    {
      cardIssuerName: "신한카드",
      cardNo: "1234567890123456",
      expirationDate: "2025-12",
    },
    {
      cardIssuerName: "하나카드",
      cardNo: "1234567890123456",
      expirationDate: "2025-12",
    },
  ]);
  return (
    <div className="overflow-hidden h-[100vh] w-[100vw]">
      <Image
        className="h-[300px] w-[220px] z-[150] -translate-x-[50%] -translate-y-[55%] absolute top-1/4 left-1/2"
        src={logo}
        alt="logo"
        width={100}
        height={100}
      />
      <TimeBackground />
      <GrassBackground />
      <div className="cursor-pointer z-[200] m-4 absolute w-[100vw] h-[50vh] bottom-1/5 left-0 flex justify-center items-center focus: size-110 ">
        <Carousel>
          <CarouselContent>
            {cardList.map((card, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center basis-[250px]"
              >
                <CardImage
                  companyName={card.cardIssuerName}
                  cardNumber={card.cardNo}
                  expirationDate={card.expirationDate}
                />
              </CarouselItem>
            ))}
            <CarouselItem className="flex justify-center basis-[250px]">
              <div className="w-full max-w-[250px] h-[150px] flex flex-col justify-center items-center rounded-lg bg-linear-to-l from-gray-500 to-gray-100 shadow-xl">
                <button className="cursor-pointer">
                  <CirclePlus className="w-12 h-12 transition-all" />
                </button>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default MainPage;
