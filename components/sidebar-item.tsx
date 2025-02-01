import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  className?: ClassValue;
}

const SidebarItem: React.FC<Props> = ({
  className,
  href,
  icon: Icon,
  label,
  active,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1",
        active && "text-white",
        className
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
