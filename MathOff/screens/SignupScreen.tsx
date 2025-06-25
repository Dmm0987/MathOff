import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import BubbleBackground from "./background/BubbleBackground";
import MathSymbolBackground from './background/MathSymbolBackground';

type RootParamList = {
  Signup: undefined;
  Login: undefined;
};

const FIREBASE_API_KEY = "AIzaSyBTnPyNYc2IZNGceCLwC9pvkRA6jz5-uxA";

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let message = 'Erro ao cadastrar usuário.';
        if (data?.error?.message) {
          switch (data.error.message) {
            case 'EMAIL_EXISTS':
              message = 'Este e-mail já está em uso.';
              break;
            case 'INVALID_EMAIL':
              message = 'E-mail inválido.';
              break;
            case 'WEAK_PASSWORD : Password should be at least 6 characters':
              message = 'A senha deve ter pelo menos 6 caracteres.';
              break;
          }
        }
        Alert.alert('Erro', message);
        return;
      }

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro no fetch:', error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <BubbleBackground />
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <MathSymbolBackground />
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});
