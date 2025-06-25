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

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 20 },
  subtitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },

  scrollArea: { width: '100%', maxHeight: 300 },
  cardsContainer: { paddingBottom: 20 },
  noScore: { fontSize: 16, textAlign: 'center', marginTop: 10 },

  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardText: { fontSize: 16 },

  clearButton: {
    marginTop: 10,
    backgroundColor: "#E1D045",
    shadowColor: '#000',
    borderWidth: 2,         // define a espessura da borda
    borderColor: 'yellow', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  clearText: { color: '#333', fontWeight: 'bold' },

  logoutButton: {
    marginTop: 20,
    backgroundColor: "#E16E46",
    shadowOpacity: 0.1,
    borderWidth: 2,         // define a espessura da borda
    borderColor: 'red', 
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
