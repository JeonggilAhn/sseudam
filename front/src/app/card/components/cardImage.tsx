"use client";

interface CardImageProps {
  companyName: string;
  cardNumber: string;
  expirationDate: string;
}

const CardImage = ({
  companyName,
  cardNumber,
  expirationDate,
}: CardImageProps) => {
  return (
    <div className="min-w-[250px] h-[150px] sm:w-[300px] md:w-[250px] lg:w-[300px] xl:w-[300px] 2xl:w-[300px] flex flex-col justify-center items-center rounded-lg bg-linear-to-l from-gray-500 to-gray-100 shadow-xl">
      <div>{companyName}</div>
      <div>{cardNumber}</div>
      <div>{expirationDate}</div>
    </div>
  );
};

export default CardImage;
