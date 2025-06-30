import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ScoreItem = {
  pontos: number;
  nivel: number;
  operacao: string;
};

type ScoreContextType = {
  scores: ScoreItem[];
  addScore: (pontos: number, nivel: number, operacao: string) => void;
  clearScores: () => void;
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

const SCORES_KEY = 'userScores';

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<ScoreItem[]>([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(SCORES_KEY);
      if (saved) setScores(JSON.parse(saved));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  }, [scores]);

  const addScore = (pontos: number, nivel: number, operacao: string) => {
    const novoItem: ScoreItem = { pontos, nivel, operacao };
    setScores(prev => [...prev, novoItem]);
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