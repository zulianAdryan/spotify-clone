import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/supabase-provider";
import UserProvider from "@/providers/user-provider";
import ModalProvider from "@/providers/modal-provider";
import ToasterProvider from "@/providers/toaster-provider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

const font = Figtree({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Clone",
  description:
    "This app is for educational purposes only and does not claim ownership of any content or rights associated with Spotify",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
