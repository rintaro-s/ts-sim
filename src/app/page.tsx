import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import GameGrid from '../components/game/GameGrid';
import StatusBar from '../components/game/StatusBar';
import ActionPanel from '../components/game/ActionPanel';
import ChatWindow from '../components/game/ChatWindow';

export default function HomePage() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("HomePage must be used within a GameProvider");
  }
  const { state } = context;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-serif
      ${state.mode === 'mahito' ? 'bg-mahito-background text-mahito-foreground' : 'bg-onii-background text-onii-foreground'}
    `}>
      <div className="w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          TS Sim: まひろライフゲーム
        </h1>

        <StatusBar />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <GameGrid />
          </div>
          <div className="md:col-span-1 flex flex-col space-y-6">
            <ActionPanel />
            <ChatWindow />
          </div>
        </div>
      </div>
    </div>
  );
}