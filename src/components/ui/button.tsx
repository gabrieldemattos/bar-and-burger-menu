import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant: "submit" | "destructive" | "neutral";
}

const Button = ({ text, variant, ...props }: ButtonProps) => {
  const variantClass = {
    global:
      "w-fit text-white font-bold py-2 px-5 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    submit: "bg-green-500 hover:bg-green-600",
    destructive: "bg-red-500 hover:bg-red-600",
    neutral: "bg-slate-800 hover:bg-slate-700",
  };

  return (
    <button
      className={`${variantClass.global} ${variantClass[variant]}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
