import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getSongs(): Promise<Array<Song>> {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
  }

  return data || [];
}
