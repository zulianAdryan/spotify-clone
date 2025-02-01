import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

export default function useOnPlay(songs: Array<Song>) {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
}
