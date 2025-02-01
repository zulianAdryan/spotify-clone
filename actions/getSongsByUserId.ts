import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getSongsByUserId(): Promise<Array<Song>> {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error(sessionError.message);
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
  }

  return data || [];
}
