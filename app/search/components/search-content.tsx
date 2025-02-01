"use client";

import LikeButton from "@/components/like-button";
import MediaItem from "@/components/media-item";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface Props {
  songs: Array<Song>;
}

const SearchContent: React.FC<Props> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (!songs.length) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song, i) => {
        return (
          <div key={`item-${i}`} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem
                onClick={(id: string) => {
                  onPlay(id);
                }}
                data={song}
              />
            </div>
            <LikeButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
};

export default SearchContent;
