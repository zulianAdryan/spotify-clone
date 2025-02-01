"use client";

import LikeButton from "@/components/like-button";
import MediaItem from "@/components/media-item";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  songs: Array<Song>;
}

const LikedContent: React.FC<Props> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  if (!songs.length) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song, i) => {
        return (
          <div key={`song-${i}`} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem
                data={song}
                onClick={(id: string) => {
                  onPlay(id);
                }}
              />
            </div>
            <LikeButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
};

export default LikedContent;
