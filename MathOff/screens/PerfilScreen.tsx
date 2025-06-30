// PerfilScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { clearUserToken } from '../authSession';
import { useScore } from '../context/ScoreContext';
import styles from "./styles/StylePerfil";

export default function PerfilScreen() {
  const navigation = useNavigation();
  const { scores, clearScores } = useScore();

  const handleLogout = () => {
    clearUserToken();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.info}>Você está logado.</Text>

      <Text style={styles.subtitle}>Histórico de Pontuação</Text>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.cardsContainer}>
        {scores.length === 0 ? (
          <Text style={styles.noScore}>Nenhuma pontuação registrada.</Text>
        ) : (
          scores.map((score, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>
                Jogo {index + 1}: {score} ponto{score !== 1 ? 's' : ''}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

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