"use client";

import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("RootLayoutContent must be used within a GameProvider");
  }
  const { state } = context;

  return (
    <html lang="ja" className={state.mode === 'mahito' ? 'mahito' : 'onii'}>
      <body>
        {children}
      </body>
    </html>
  );
}
