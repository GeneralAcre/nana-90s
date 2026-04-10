"use client";
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext({
  suitColor: '#6a0dad',
  setSuitColor: (color: string) => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [suitColor, setSuitColor] = useState('#6a0dad');
  return (
    <GameContext.Provider value={{ suitColor, setSuitColor }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);