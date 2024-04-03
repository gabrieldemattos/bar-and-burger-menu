import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface QuantityControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const QuantityControlButton = ({
  text,
  ...props
}: QuantityControlButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        "rounded bg-gray-200 py-1 hover:bg-gray-300 transition-all duration-300",
        props.className
      )}
    >
      {text}
    </button>
  );
};

export default QuantityControlButton;
