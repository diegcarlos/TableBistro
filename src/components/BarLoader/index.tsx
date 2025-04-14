import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface BarLoaderProps {
  size?: number;
  color?: string;
  style?: any;
  barCount?: number;
}

const BarLoader = ({
  size = 40,
  color = '#E11D48',
  style,
  barCount = 3,
}: BarLoaderProps) => {
  // Criando um array de valores animados para cada barra
  const animations = Array.from({length: barCount}, () => useSharedValue(0));

  useEffect(() => {
    // Animando cada barra com um pequeno atraso entre elas
    animations.forEach((anim, index) => {
      anim.value = withDelay(
        index * 200, // Atraso progressivo para cada barra
        withRepeat(
          withTiming(1, {duration: 800, easing: Easing.inOut(Easing.ease)}),
          -1, // Repetição infinita
          true, // Yoyo (vai e volta)
        ),
      );
    });

    return () => {
      // Cancelando todas as animações quando o componente for desmontado
      animations.forEach(anim => cancelAnimation(anim));
    };
  }, []);

  // Calculando a largura de cada barra com base no tamanho total
  const barWidth = size / 3;
  const barHeight = size;
  const barSpacing = 5; // Espaçamento entre as barras

  return (
    <View style={[styles.container, style]}>
      {animations.map((anim, index) => {
        // Criando um estilo animado para cada barra
        const animatedStyle = useAnimatedStyle(() => {
          return {
            height: barHeight * (0.4 + anim.value * 0.6), // Altura varia de 40% a 100%
            opacity: 0.4 + anim.value * 0.6, // Opacidade varia de 40% a 100%
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                width: barWidth,
                backgroundColor: color,
                marginHorizontal: barSpacing / 2,
              },
              animatedStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end', // Alinha as barras pela base
  },
  bar: {
    borderRadius: 2, // Bordas levemente arredondadas
  },
});

export default BarLoader;
