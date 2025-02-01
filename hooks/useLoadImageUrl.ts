import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";

const useLoadImageUrl = (song: Song) => {
  const { supabaseClient } = useSessionContext();

  if (!song) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImageUrl;
