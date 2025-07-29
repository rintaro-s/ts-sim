"use client";

import { createContext, useReducer, Dispatch, ReactNode } from 'react';

// ゲームの状態の型定義
export type GameState = {
  mode: 'mahito' | 'onii';
  turn: number;
  maleScore: number;
  femaleScore: number;
  crisisScore: number;
};

// アクションの型定義
export type GameAction = 
  | { type: 'SET_MODE'; payload: 'mahito' | 'onii' }
  | { type: 'INCREMENT_TURN' }
  | { type: 'UPDATE_SCORES'; payload: { male: number; female: number; crisis: number } };

// 初期状態
const initialState: GameState = {
  mode: 'mahito',
  turn: 0,
  maleScore: 0,
  femaleScore: 0,
  crisisScore: 0,
};

// レデューサー関数
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'INCREMENT_TURN':
      return { ...state, turn: state.turn + 1 };
    case 'UPDATE_SCORES':
      return {
        ...state,
        maleScore: state.maleScore + action.payload.male,
        femaleScore: state.femaleScore + action.payload.female,
        crisisScore: state.crisisScore + action.payload.crisis,
      };
    default:
      return state;
  }
};

// Contextの作成
export const GameContext = createContext<{
  state: GameState;
  dispatch: Dispatch<GameAction>;
} | undefined>(undefined);

// GameProviderコンポーネント
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};