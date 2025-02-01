import { Song } from "@/types";
import usePlayer from "./usePlayer";

export default function useOnPlay(songs: Array<Song>) {
  const player = usePlayer();
  // const authModal = useAuthModal();
  // const { user } = useUser();

  const onPlay = (id: string) => {
    // INFO: allow play music to everyone without logged in
    // if (!user) {
    //   authModal.onOpen();
    //   return;
    // }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
}
