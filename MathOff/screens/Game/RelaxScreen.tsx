import React, { useState, useRef } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/StyleGame';
import MathBubblesBackground from '../background/MathBubblesBackground';
import MathSymbolBackground from '../background/MathSymbolBackground';

const generateEquation = (level: number, operationType: string) => {
  let operations: string[];
  if (operationType === 'any') {
    operations =
      level === 1
        ? ['+', '-']
        : level === 2
        ? ['+', '-', '*']
        : ['+', '-', '*', '/'];
  } else {
    operations = [operationType];
  }

  const op = operations[Math.floor(Math.random() * operations.length)];
  let a = Math.floor(Math.random() * (level * 10)) + 1;
  let b = Math.floor(Math.random() * (level * 10)) + 1;
  if (op === '/') a = a * b;
  const question = `${a} ${op} ${b}`;
  const answer = eval(question);
  return { question, answer };
};

export default function RelaxScreen() {
  const navigation = useNavigation();

  const level = 2;
  const operationType = 'any';

  const [questionData, setQuestionData] = useState(
    generateEquation(level, operationType)
  );
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const bgAnim = useRef(new Animated.Value(0)).current;
  const [targetColor, setTargetColor] = useState<'green' | 'red' | null>(null);

  const animateBackground = (toValue: number, onEnd?: () => void) => {
    Animated.timing(bgAnim, {
      toValue,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      if (onEnd) onEnd();
    });
  };

  const handleSubmit = () => {
    if (Number(input) === questionData.answer) {
      setScore(score + 1);
      setFeedback('✅ Correto!');
      setTargetColor('green');
      animateBackground(1);
    } else {
      setFeedback(`❌ Errado! Resposta: ${questionData.answer}`);
      setTargetColor('red');
      animateBackground(1);
    }

    setTimeout(() => {
      setFeedback(null);
      animateBackground(0, () => {
        setTargetColor(null);
      });
    }, 1500);

    setInput('');
    setQuestionData(generateEquation(level, operationType));
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange:
      targetColor === 'green'
        ? ['rgba(255,255,255,1)', 'rgba(128, 255, 128, 0.3)']
        : targetColor === 'red'
        ? ['rgba(255,255,255,1)', 'rgba(255, 129, 129, 0.3)']
        : ['rgba(255,255,255,1)', 'rgba(255,255,255,1)'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <MathBubblesBackground style={StyleSheet.absoluteFill} />
      <Text style={styles.title}>Sem contagem</Text>
      <Text style={styles.question}>{questionData.question}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleSubmit}
        placeholder="Digite a resposta"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <MathSymbolBackground />
        <Text style={styles.buttonText}>Responder</Text>
      </TouchableOpacity>
      <Text style={styles.score}>Pontuação: {score}</Text>
      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
    </Animated.View>
  );
}
