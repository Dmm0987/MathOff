import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import OperationChoice from './screens/OperationChoiseScreen';
import GameScreen from './screens/Game/gameScreen';
import LoginScreen from './screens/loginScreen'; // caminho conforme tua estrutura
import SignupScreen from './screens/SignupScreen'; // idem
import OnboardingScreen from './screens/OnboardingScreen'; // idem

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Choice" component={OperationChoice} options={{ headerShown: false }}/>
        <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, title: 'Entrar' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false, title: 'Cadastrar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
