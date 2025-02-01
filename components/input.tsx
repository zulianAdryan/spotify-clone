import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type, disabled, ...props }, refs) => {
    return (
      <input
        className={cn(
          "flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
          className
        )}
        type={type}
        disabled={disabled}
        {...props}
        ref={refs}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
