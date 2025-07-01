import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ScoreItem = {
  pontos: number;
  nivel?: number;
  operacao?: string;
  modo?: string;
};

type ScoreContextType = {
  scores: ScoreItem[]; 
  historico: ScoreItem[]; 
  addScore: (
    pontos: number,
    nivel?: number,
    operacao?: string,
    modo?: string
  ) => void;
  clearScores: () => void; // limpa tudo
  clearRecentScores: () => void; // limpa só os cards visíveis
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

const SCORES_KEY = 'userScores';
const HISTORICO_KEY = 'userHistorico';

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<ScoreItem[]>([]);
  const [historico, setHistorico] = useState<ScoreItem[]>([]);
  const [hasCleared, setHasCleared] = useState(false);

  // Ao iniciar, carrega histórico e scores (só scores se não limpou)
  useEffect(() => {
    (async () => {
      try {
        const savedHistorico = await AsyncStorage.getItem(HISTORICO_KEY);
        const parsedHistorico: ScoreItem[] = savedHistorico
          ? JSON.parse(savedHistorico)
          : [];

        setHistorico(parsedHistorico);

        if (!hasCleared) {
          const savedScores = await AsyncStorage.getItem(SCORES_KEY);
          const parsedScores: ScoreItem[] = savedScores
            ? JSON.parse(savedScores)
            : [];
          setScores(parsedScores);
        } else {
          setScores([]);
        }
      } catch (error) {
        console.error('Erro ao carregar dados', error);
      }
    })();
  }, [hasCleared]);

  // Sempre que histórico muda, salva no AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem(HISTORICO_KEY, JSON.stringify(historico)).catch(console.error);
  }, [historico]);

  useEffect(() => {
    AsyncStorage.setItem(SCORES_KEY, JSON.stringify(scores)).catch(console.error);
  }, [scores]);

  const addScore = (
    pontos: number,
    nivel?: number,
    operacao?: string,
    modo?: string
  ) => {
    const novoItem: ScoreItem = { pontos, nivel, operacao, modo };
    setScores(prev => [...prev, novoItem]);
    setHistorico(prev => [...prev, novoItem]);
    setHasCleared(false);
  };

  const clearScores = async () => {
    setScores([]);
    setHistorico([]);
    setHasCleared(true);
    try {
      await AsyncStorage.setItem(SCORES_KEY, JSON.stringify([]));
      await AsyncStorage.setItem(HISTORICO_KEY, JSON.stringify([]));
    } catch (error) {
      console.error('Erro ao limpar tudo', error);
    }
  };

  const clearRecentScores = async () => {
    setScores([]);
    setHasCleared(true);
    try {
      await AsyncStorage.setItem(HISTORICO_KEY, JSON.stringify(historico));
      await AsyncStorage.setItem(SCORES_KEY, JSON.stringify([]));
    } catch (error) {
      console.error('Erro ao limpar cards visíveis', error);
    }
  };

  return (
    <ScoreContext.Provider
      value={{ scores, historico, addScore, clearScores, clearRecentScores }}
    >
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