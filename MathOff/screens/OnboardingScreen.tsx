import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MathBubblesBackground from './background/MathBubblesBackground'; // seu componente de bolhas
import MathSymbolBackground  from './background/MathSymbolBackground'; // seu componente de bolhas

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Bem-vindo ao MathOff!',
    description: 'Desafie sua mente com cálculos rápidos e melhore sua agilidade mental.',
    image: require('../assets/img1.png'),
  },
  {
    key: '2',
    title: 'Três níveis de desafio',
    description: 'Escolha entre fácil, médio ou difícil e avance seu raciocínio lógico!',
    image: require('../assets/img2.png'),
  },
  {
    key: '3',
    title: 'Diversas operações',
    description: 'Treine adição, subtração, multiplicação ou divisão — você escolhe!',
    image: require('../assets/img3.png'),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Home');
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      {item.image && <Image source={item.image} style={styles.image} resizeMode="contain" />}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MathBubblesBackground style={StyleSheet.absoluteFill} />

      {/* Conteúdo em cima */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        style={{ flex: 1 }} // só garantir que ocupe a tela
      />

      {/* Dots e botão */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index}
              style={[styles.dot, { backgroundColor: isActive ? 'rgba(173, 216, 230, 0.7)' : '#ccc' }]}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <MathSymbolBackground />
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Começar' : 'Avançar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009af2',
    justifyContent: 'space-between',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 100,
  },
  image: {
    width: 360,
    height: 360,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 26,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 40,
    zIndex: 1,
  },
  buttonText: {
    color: '#009af2',
    fontSize: 18,
    fontWeight: '600',
  },
});
