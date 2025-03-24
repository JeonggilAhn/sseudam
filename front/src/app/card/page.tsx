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
    <div className="overflow-hidden h-screen w-full relative">
      <Image
        className="h-[31vh] w-[50vw] z-[150] -translate-x-[50%] -translate-y-[55%] absolute top-1/4 left-1/2"
        src={logo}
        alt="logo"
        width={100}
        height={100}
      />
      <TimeBackground />
      <GrassBackground />
      <div className="z-[200] m-1 absolute w-full h-[50vh] bottom-1/6 flex justify-end items-center translate-x-[50%]">
        <Carousel>
          <CarouselContent>
            {cardList.map((card, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center basis-[70vw]"
              >
                <CardImage
                  companyName={card.cardIssuerName}
                  cardNumber={card.cardNo}
                  expirationDate={card.expirationDate}
                />
              </CarouselItem>
            ))}
            <CarouselItem className="flex justify-center basis-[80vw]">
              <div className="w-full pl-4 max-w-[250px] h-[150px] flex justify-start items-center rounded-lg bg-linear-to-l from-gray-500 to-gray-100 shadow-xl">
                <CirclePlus className="text-gray-500 w-12 h-12 transition-all" />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default MainPage;
