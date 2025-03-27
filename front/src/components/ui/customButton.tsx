import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type buttonProps = {
  name: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  );
}

export const LongButton: React.FC<buttonProps> = ({
  name,
  color,
  disabled,
  onClick,
}) => {
  return (
    <>
      <div className="flex w-full justify-center items-center">
        <Button
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-[80%] h-[48px] text-lg font-semibold justify-center items-center"
          style={{ backgroundColor: disabled ? "#c7c7c7" : color }}
          onClick={onClick}
          disabled={disabled}
        >
          {name}
        </Button>
      </div>
    </>
  );
};

export const ShortButton: React.FC<buttonProps> = ({
  name,
  disabled,
  color,
  onClick,
}) => {
  return (
    <>
      <div className="w-full">
        <Button
          className="fixed bottom-20 h-[48px] text-lg font-semibold justify-center items-center"
          style={{ backgroundColor: disabled ? "#c7c7c7" : color }}
          onClick={onClick}
          disabled={disabled}
        >
          {name}
        </Button>
      </div>
    </>
  );
};

export const ShortOutlineButton: React.FC<buttonProps> = ({
  name,
  disabled,
  onClick,
}) => {
  return (
    <>
      <div className="flex w-full">
        <Button
          variant="outline"
          className="fixed bottom-20 h-[48px] text-lg font-semibold justify-center items-center"
          onClick={onClick}
          disabled={disabled}
        >
          {name}
        </Button>
      </div>
    </>
  );
};
