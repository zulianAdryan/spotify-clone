"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface Props {
  image: string;
  name: string;
  href: string;
  className?: ClassValue;
}

const ListItem: React.FC<Props> = ({ href, image, name, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      authModal.onOpen();
      return;
    }
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4",
        className
      )}
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image src={image} alt="liked" className="object-cover" fill />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-sky-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
