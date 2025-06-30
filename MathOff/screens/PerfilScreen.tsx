import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { clearUserToken } from '../authSession';
import { useScore } from '../context/ScoreContext';
import styles from './styles/StylePerfil';
import Animated, { FadeInUp } from 'react-native-reanimated';
import AnimatedGradientBackground from './background/AnimatedGradientBackground';

type RootParamList = {
  Signup: undefined;
  Login: undefined;
};

type AuthNavigationProp = NativeStackNavigationProp<RootParamList>;

export default function PerfilScreen() {
  const navigation = useNavigation<AuthNavigationProp>(); 
  const { scores, clearScores } = useScore();

  const handleLogout = () => {
    clearUserToken();
    navigation.replace('Login'); 
  };

  // Estatísticas extras
  const totalJogos = scores.length;
  const maiorPontuacao = scores.length > 0 ? Math.max(...scores.map(s => s.pontos)) : 0;

  return (
    <View style={styles.container}>
      <AnimatedGradientBackground />
      <Text style={styles.title}>👤 Perfil</Text>
      <Text style={styles.info}>Você está logado no MathOff.</Text>

      <Text style={styles.subtitle}>Histórico de Pontuação</Text>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.cardsContainer}>
        {scores.length === 0 ? (
          <Text style={styles.noScore}>Nenhuma pontuação registrada.</Text>
        ) : (
          scores.map((item, index) => (
            <Animated.View
              entering={FadeInUp.delay(index * 100)}
              key={index}
              style={styles.card}
            >
              <Text style={styles.cardText}>
                🧠 Jogo {index + 1}
              </Text>
              <Text style={styles.cardText}>
                Nível: {item.nivel}
              </Text>
              <Text style={styles.cardText}>
                Operação: {item.operacao}
              </Text>
              <Text style={styles.cardText}>
                Pontuação: {item.pontos} ponto{item.pontos !== 1 ? 's' : ''}
              </Text>
            </Animated.View>
          ))
        )}
      </ScrollView>

      {/* Card animado de estatísticas */}
      <Animated.View
        entering={FadeInUp.delay(300)}
        style={styles.statsCard}
      >
        <Text style={styles.statsTitle}>📊 Suas Estatísticas</Text>
        <View style={styles.statsRow}>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>{totalJogos}</Text>
            <Text style={styles.statsLabel}>Jogos</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>{maiorPontuacao}</Text>
            <Text style={styles.statsLabel}>Maior Pontuação</Text>
          </View>
        </View>
        <Text style={styles.statsMotivation}>
          Obrigado por estar jogando MathOff! Continue praticando para melhorar.
        </Text>
      </Animated.View>
      {scores.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearScores}>
          <Text style={styles.clearText}>Limpar pontuações</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}