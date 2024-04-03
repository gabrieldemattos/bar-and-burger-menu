import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string;
  [key: string]: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errors, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <label
          data-error={errors}
          className="font-bold text-xl data-[error]:text-red-500"
        >
          {label}:
        </label>
        <input
          data-error={errors}
          className="w-full border-b outline-none rounded-sm p-2 px-3 focus:border-gray-400 focus:border-b-2 font-medium text-lg disabled:cursor-not-allowed data-[error]:border-red-500"
          ref={ref}
          {...props}
        />
        {errors && <p className="text-red-500">{errors}</p>}
      </div>
    );
  }
);

export default Input;
