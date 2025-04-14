import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface ModernLoaderProps {
  size?: number;
  color?: string;
  style?: any;
  type?: 'pulse' | 'rotate' | 'bounce';
}

const ModernLoader = ({
  size = 40,
  color = '#E11D48',
  style,
  type = 'pulse',
}: ModernLoaderProps) => {
  const animation = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    switch (type) {
      case 'pulse':
        animation.value = withRepeat(
          withTiming(1.3, {duration: 800, easing: Easing.inOut(Easing.ease)}),
          -1,
          true,
        );
        break;
      case 'rotate':
        rotation.value = withRepeat(
          withTiming(360, {duration: 1500, easing: Easing.linear}),
          -1,
          false,
        );
        break;
      case 'bounce':
        translateY.value = withRepeat(
          withTiming(-10, {duration: 500, easing: Easing.inOut(Easing.ease)}),
          -1,
          true,
        );
        break;
    }

    return () => {
      cancelAnimation(animation);
      cancelAnimation(rotation);
      cancelAnimation(translateY);
    };
  }, [type]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: type === 'pulse' ? animation.value : 1},
        {rotate: type === 'rotate' ? `${rotation.value}deg` : '0deg'},
        {translateY: type === 'bounce' ? translateY.value : 0},
      ],
    };
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModernLoader;
