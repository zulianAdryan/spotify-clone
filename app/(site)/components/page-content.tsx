"use client";

import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import SongItem from "@/components/song-item";

interface Props {
  songs: Array<Song>;
}
const PageContent: React.FC<Props> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (!songs.length) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((item, i) => {
        return (
          <SongItem
            key={`songs-${i}`}
            onClick={(id: string) => onPlay(id)}
            data={item}
          />
        );
      })}
    </div>
  );
};

export default PageContent;
