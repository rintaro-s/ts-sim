import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { GameProvider, GameContext } from "../contexts/GameContext";
import { useContext } from "react";

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TS Sim：まひろライフゲーム",
  description: "性別が揺れ動く人生シミュレーター",
};

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("RootLayoutContent must be used within a GameProvider");
  }
  const { state } = context;

  return (
    <html lang="ja" className={state.mode === 'mahito' ? 'mahito' : 'onii'}>
      <body className={`${notoSerifJp.variable} font-serif`}>
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GameProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </GameProvider>
  );
}
