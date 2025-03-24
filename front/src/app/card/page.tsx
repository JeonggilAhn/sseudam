"use client";
import { useState } from "react";
import CardImage from "./components/cardImage";
import TimeBackground from "./components/timeBackground";
import GrassBackground from "./components/grassBackground";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <TimeBackground />
      <GrassBackground />
      <Carousel>
        <CarouselContent>
          {cardList.map((card, index) => (
            <CarouselItem key={index}>
              <CardImage
                companyName={card.cardIssuerName}
                cardNumber={card.cardNo}
                expirationDate={card.expirationDate}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MainPage;
