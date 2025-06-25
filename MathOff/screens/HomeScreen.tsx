import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./styles/StyleHome";
import BubbleBackground from "./background/BubbleBackground"; 
import MathSymbolBackground  from './background/MathSymbolBackground'; 
import { getUserToken } from '../authSession'; // ajuste o caminho

type RootStackParamList = {
  Home: undefined;
  Choice: { level: number };
  Game: { level: number; operationType: string };
  Login: undefined;
  Perfil: undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToOperationChoice = (level: number) => {
    navigation.navigate("Choice", { level });
  };

  const handleProfilePress = async () => {
    try {
      const token = await getUserToken();
      if (token) {
        navigation.navigate("Perfil");
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível verificar o estado do usuário.");
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      {/* Fundo animado com bolhas */}
      <BubbleBackground />

      {/* Botão de perfil */}
      <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
        <Feather name="user" size={28} color="#333" />
      </TouchableOpacity>

      {/* Conteúdo principal */}
      <Text style={styles.title}>🧠 MathOff</Text>
      <Text style={styles.subtitle}>Escolha seu nível de desafio:</Text>

      <TouchableOpacity style={[styles.button]} onPress={() => goToOperationChoice(1)}>
        <MathSymbolBackground />
        <Text style={styles.buttonText}>Nível 1 — Fácil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button2]} onPress={() => goToOperationChoice(2)}>
        <MathSymbolBackground />
        <Text style={styles.buttonText}>Nível 2 — Médio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button3]} onPress={() => goToOperationChoice(3)}>
        <MathSymbolBackground />
        <Text style={styles.buttonText}>Nível 3 — Difícil</Text>
      </TouchableOpacity>
    </View>
  );
}
