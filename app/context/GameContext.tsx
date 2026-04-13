"use client";
import React, { createContext, useContext, useState } from 'react';

interface P1Result {
  score: number;
  total: number;
  hearts: number;
}

interface GameContextType {
  suitColor:      string;
  setSuitColor:   (color: string) => void;
  playerCount:    1 | 2;
  setPlayerCount: (n: 1 | 2) => void;
  player2Color:   string;
  setPlayer2Color:(color: string) => void;
  p1Result:       P1Result | null;
  setP1Result:    (r: P1Result | null) => void;
  // Online multiplayer
  roomCode:       string | null;
  setRoomCode:    (code: string | null) => void;
  onlinePlayer:   1 | 2 | null;
  setOnlinePlayer:(p: 1 | 2 | null) => void;
}

const GameContext = createContext<GameContextType>({
  suitColor:       '#6a0dad',
  setSuitColor:    () => {},
  playerCount:     1,
  setPlayerCount:  () => {},
  player2Color:    '#A10535',
  setPlayer2Color: () => {},
  p1Result:        null,
  setP1Result:     () => {},
  roomCode:        null,
  setRoomCode:     () => {},
  onlinePlayer:    null,
  setOnlinePlayer: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [suitColor,    setSuitColor]    = useState('#6a0dad');
  const [playerCount,  setPlayerCount]  = useState<1 | 2>(1);
  const [player2Color, setPlayer2Color] = useState('#A10535');
  const [p1Result,     setP1Result]     = useState<P1Result | null>(null);
  const [roomCode,     setRoomCode]     = useState<string | null>(null);
  const [onlinePlayer, setOnlinePlayer] = useState<1 | 2 | null>(null);

  return (
    <GameContext.Provider value={{
      suitColor,    setSuitColor,
      playerCount,  setPlayerCount,
      player2Color, setPlayer2Color,
      p1Result,     setP1Result,
      roomCode,     setRoomCode,
      onlinePlayer, setOnlinePlayer,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
