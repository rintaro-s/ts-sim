"use client";

import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { Progress } from '../ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function StatusBar() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("StatusBar must be used within a GameProvider");
  }
  const { state } = context;

  const getModeText = (mode: 'mahito' | 'onii') => {
    return mode === 'mahito' ? 'まひろモード' : 'お兄ちゃんモード';
  };

  const getModeColorClass = (mode: 'mahito' | 'onii') => {
    return mode === 'mahito' ? 'text-mahito-primary' : 'text-onii-primary';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          現在のモード: <span className={getModeColorClass(state.mode)}>{getModeText(state.mode)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-lg font-semibold">男成分ゲージ</p>
          <Progress value={state.maleScore} className="w-full" />
          <p className="text-right">{state.maleScore}%</p>
        </div>
        <div>
          <p className="text-lg font-semibold">女成分ゲージ</p>
          <Progress value={state.femaleScore} className="w-full" />
          <p className="text-right">{state.femaleScore}%</p>
        </div>
        <div>
          <p className="text-lg font-semibold">混乱度 (Identity Crisis)</p>
          <Progress value={state.crisisScore} className="w-full" />
          <p className="text-right">{state.crisisScore}%</p>
        </div>
        <p className="text-xl font-bold text-center">ターン数: {state.turn}</p>
      </CardContent>
    </Card>
  );
}