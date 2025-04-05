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
          <SelectItem value="싸피 계좌번호">싸피은행 | 계좌번호</SelectItem>
          <SelectItem value="신한 계좌번호">신한은행 | 계좌번호</SelectItem>
          <SelectItem value="국민 계좌번호">국민은행 | 계좌번호</SelectItem>
          <SelectItem value="농협 계좌번호">농협은행 | 계좌번호</SelectItem>
          <SelectItem value="우리 계좌번호">우리은행 | 계좌번호</SelectItem>
          <SelectItem value="하나 계좌번호">하나은행 | 계좌번호</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectBankBook;
