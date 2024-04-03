import { ShoppingCart } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string | number;
}

const CartButton = ({ text, ...props }: CartButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge("bg-gray-900 rounded text-white", props.className)}
    >
      <ShoppingCart />
      {text}
    </button>
  );
};

export default CartButton;
