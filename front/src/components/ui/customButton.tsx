import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type buttonProps = {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
  name: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: React.CSSProperties;
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
  variant,
  name,
  color = "#2b88d9",
  disabled,
  onClick,
}) => {
  return (
    <>
      <div className="flex w-full justify-center items-center">
        <Button
          variant={variant}
          className="cursor-pointer absolute bottom-[5vh] mt-auto left-1/2 transform -translate-x-1/2 w-[80%] h-[48px] text-lg font-semibold justify-center items-center hover:bg-blue-300"
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
  variant,
  name,
  disabled,
  color,
  onClick,
  style,
}) => {
  return (
    <>
      <div>
        <Button
          variant={variant}
          className="cursor-pointer absolute bottom-[-5vh] mt-auto transform -translate-x-1/2 w-[80%] h-[48px] text-lg font-semibold justify-center items-center"
          style={{
            backgroundColor: disabled ? "#c7c7c7" : color,
            width: "120px",
            ...style,
          }}
          onClick={onClick}
          disabled={disabled}
        >
          {name}
        </Button>
      </div>
    </>
  );
};
