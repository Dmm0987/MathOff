import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/StyleGame';
import MathSymbolBackground from "../background/MathSymbolBackground"; 
import LupaBackGround from "../background/LupaBackground"; 

const generateEquationWithError = (level: number) => {
  const operations = ['+', '-', '*', '/'];
  const op = operations[Math.floor(Math.random() * operations.length)];

  let a = Math.floor(Math.random() * (level * 10)) + 1;
  let b = Math.floor(Math.random() * (level * 10)) + 1;

  if (op === '/') a = a * b;

  const correctAnswer = eval(`${a} ${op} ${b}`);

  const hasError = Math.random() < 0.5;

  let displayedAnswer = correctAnswer;
  if (hasError) {
    const delta = Math.floor(Math.random() * 2) + 1;
    displayedAnswer = Math.random() < 0.5 ? correctAnswer + delta : correctAnswer - delta;
  }

  const question = `${a} ${op} ${b} = ${displayedAnswer}`;

  return { question, correctAnswer, displayedAnswer, hasError };
};

export default function ErrorHuntMode() {
  const [level] = useState(2);
  const [data, setData] = useState(generateEquationWithError(level));
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswer = (userSaysError: boolean) => {
    if (userSaysError === data.hasError) {
      setFeedback('✅ Acertou!');
      setScore(score + 1);
    } else {
      setFeedback('❌ Errou!');
      setScore(score > 0 ? score - 1 : 0);
    }

    setTimeout(() => {
      setFeedback(null);
      setData(generateEquationWithError(level));
    }, 1500);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Ache o erro</Text>
        <LupaBackGround />
      <Text style={styles.question}>{data.question}</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => handleAnswer(false)}>
            <MathSymbolBackground />
          <Text style={styles.buttonText}>Está correta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleAnswer(true)}>
            <MathSymbolBackground />
          <Text style={styles.buttonText}>Está errada</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.score}>Pontuação: {score}</Text>
      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
}

