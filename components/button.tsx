import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { children, loading, className, disabled, type = "button", ...props },
    refs
  ) => {
    return (
      <button
        type={type}
        className={cn(
          "w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition",
          className
        )}
        disabled={disabled}
        ref={refs}
        {...props}
      >
        {loading ? (
          <AiOutlineLoading3Quarters
            className="mx-auto animate-spin origin-center"
            size={20}
          />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
