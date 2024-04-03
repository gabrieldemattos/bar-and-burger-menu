import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...props }, ref) => {
    return (
      <textarea
        className="border rounded-md p-2 text-sm focus:outline-none focus:border-gray-400 resize-none"
        ref={ref}
        {...props}
      ></textarea>
    );
  }
);

export default Textarea;
