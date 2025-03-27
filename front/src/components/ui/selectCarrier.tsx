import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type selectCarrierProps = {
  name: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: React.FocusEventHandler<HTMLButtonElement>;
};

export const SelectCarrier: React.FC<selectCarrierProps> = ({
  name,
  id,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a MobileCarrier" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>통신사</SelectLabel>
          <SelectItem value="">-- 선택해주세요 --</SelectItem>
          <SelectItem value="SKT">SKT</SelectItem>
          <SelectItem value="KT">KT</SelectItem>
          <SelectItem value="LG U+">LG U+</SelectItem>
          <SelectItem value="SKT 알뜰폰">SKT 알뜰폰</SelectItem>
          <SelectItem value="KT 알뜰폰">KT 알뜰폰</SelectItem>
          <SelectItem value="LG U+ 알뜰폰">LG U+ 알뜰폰</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
