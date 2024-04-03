import { InputHTMLAttributes, forwardRef } from "react";

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  error?: boolean;
}

const InputRadio = forwardRef<HTMLInputElement, InputRadioProps>(
  ({ text, error = false, ...props }, ref) => {
    return (
      <div className="flex items-center gap-1">
        <input type="radio" className="w-4 h-4" ref={ref} {...props} />
        <span data-error={error} className="data-[error=true]:text-red-500">
          {text}
        </span>
      </div>
    );
  }
);
export default InputRadio;
