import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getLikedSongs(): Promise<Array<Song>> {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    // console.error(error.message);
    return [];
  }

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs,
  }));
}
