// context/ScoreContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ScoreContextType = {
  scores: number[];               // lista das pontuações
  addScore: (score: number) => void;  // função para adicionar uma nova pontuação
  clearScores: () => void;        // função para limpar as pontuações
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<number[]>([]);

  const addScore = (score: number) => {
    setScores(prev => [...prev, score]);
  };

  const clearScores = () => {
    setScores([]);
  };

  return (
    <ScoreContext.Provider value={{ scores, addScore, clearScores }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}
