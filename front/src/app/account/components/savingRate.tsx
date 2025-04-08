"use client";

import { Slider } from "@/components/ui/slider";
import SelectBankBook from "./selectBankBook";

type BankBookProps = {
  selectedBankBook: string | null;
  setSelectedBankBook: React.Dispatch<React.SetStateAction<string | null>>;
};

type RateBarProps = {
  selectedSavingRate: number;
  setSelectedSavingRate: React.Dispatch<React.SetStateAction<number>>;
};

type SelectSavingRateProps = {
  selectedBankBook: string | null;
  setSelectedBankBook: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSavingRate: number;
  setSelectedSavingRate: React.Dispatch<React.SetStateAction<number>>;
};

export const BankBook: React.FC<BankBookProps> = ({
  selectedBankBook,
  setSelectedBankBook,
}) => {
  return (
    <>
      <div className="flex flex-col mb-[48px]">
        <label htmlFor="" className="text-[#7b7b7b]/80 font-bold mb-[24px]">
          통장 선택
        </label>
        <div className="flex justify-center">
          <SelectBankBook
            selectedBankBook={selectedBankBook}
            setSelectedBankBook={setSelectedBankBook}
          />
        </div>
      </div>
    </>
  );
};

export const RateBar: React.FC<RateBarProps> = ({
  selectedSavingRate,
  setSelectedSavingRate,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="" className="text-[#7b7b7b]/80 font-bold mb-[36px]">
          저축 비율 설정
        </label>
      </div>
      <div className="flex justify-center">
        <Slider
          value={[selectedSavingRate]}
          onValueChange={(value) => setSelectedSavingRate(value[0])}
          max={100}
          step={5}
          className="w-[90%] h-2 mb-4 cursor-pointer"
        ></Slider>
      </div>
      <div className="text-center font-bold text-xl">{selectedSavingRate}%</div>
    </>
  );
};

const SelectSavingRate: React.FC<SelectSavingRateProps> = ({
  selectedBankBook,
  setSelectedBankBook,
  selectedSavingRate,
  setSelectedSavingRate,
}) => {
  return (
    <>
      <BankBook
        selectedBankBook={selectedBankBook}
        setSelectedBankBook={setSelectedBankBook}
      />
      <RateBar
        selectedSavingRate={selectedSavingRate}
        setSelectedSavingRate={setSelectedSavingRate}
      />
    </>
  );
};

export default SelectSavingRate;
