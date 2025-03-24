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
    <div className="w-full md:w-[300px] min-h-[20vh] flex flex-col justify-center items-center rounded-lg bg-linear-to-l from-gray-500 to-gray-100 shadow-xl">
      <div>{companyName}</div>
      <div>{cardNumber}</div>
      <div>{expirationDate}</div>
    </div>
  );
};

export default CardImage;
