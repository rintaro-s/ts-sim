import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { GameProvider } from "../contexts/GameContext";
import RootLayoutContent from "../components/layout/RootLayoutContent"; // 新しいインポートパス

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TS Sim：まひろライフゲーム",
  description: "性別が揺れ動く人生シミュレーター",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GameProvider>
      <RootLayoutContent>
        <body className={`${notoSerifJp.variable} font-serif`}>
          {children}
        </body>
      </RootLayoutContent>
    </GameProvider>
  );
}