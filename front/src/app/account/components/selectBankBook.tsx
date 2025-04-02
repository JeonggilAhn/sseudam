import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type selectBankBookProps = {
  selectedBankBook: string | null;
  setSelectedBankBook: React.Dispatch<React.SetStateAction<string | null>>;
};

// 추후 설정 예정
// 사용자가 가지고 있는 통장내역 불러와서 선택 항목에 넣기
const SelectBankBook: React.FC<selectBankBookProps> = ({
  selectedBankBook,
  setSelectedBankBook,
}) => {
  return (
    <>
      <Select
        onValueChange={setSelectedBankBook}
        value={selectedBankBook ?? undefined}
      >
        <SelectTrigger className="w-[90%]">
          <SelectValue placeholder="통장을 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectBankBook;
