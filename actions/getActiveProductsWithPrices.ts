import { ProductWithPrice } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getActiveProductsWithPrices(): Promise<
  Array<ProductWithPrice>
> {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  if (error) {
    console.error(error.message);
  }

  return data || [];
}
