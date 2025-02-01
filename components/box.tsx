import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: ClassValue;
}
const Box: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("bg-neutral-900 rounded-lg h-fit w-full", className)}>
      {children}
    </div>
  );
};

export default Box;
