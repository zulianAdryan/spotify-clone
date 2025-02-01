"use client";

import useLoadImageUrl from "@/hooks/useLoadImageUrl";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./play-button";

interface Props {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<Props> = ({ data, onClick }) => {
  const imagePath = useLoadImageUrl(data);

  return (
    <div
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
      onClick={() => onClick(data.id)}
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "images/liked.webp"}
          fill
          alt="album-cover"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full" aria-label="title">
          {data.title}
        </p>
        <p
          className="text-neutral-400 text-sm pb-4 w-full truncate"
          aria-label="author"
        >
          {data.author}
        </p>
      </div>

      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
