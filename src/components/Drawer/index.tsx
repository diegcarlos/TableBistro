import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, TouchableWithoutFeedback} from 'react-native';
import BackIcon from '../../assets/svg/back.svg';
import * as S from './styles';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
}

export const DrawerCar: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  children,
}) => {
  const translateValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Animação para abrir o drawer com efeito de spring para movimento mais natural
      Animated.parallel([
        Animated.spring(translateValue, {
          toValue: 1,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    } else {
      // Animação para fechar o drawer
      Animated.parallel([
        Animated.timing(translateValue, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
      });
    }
  }, [isOpen, translateValue, opacityValue]);

  const getTransform = () => {
    const transform = [];
    switch (placement) {
      case 'right':
        transform.push({
          translateX: translateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [611, 0],
          }),
        });
        break;
      case 'left':
        transform.push({
          translateX: translateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-611, 0],
          }),
        });
        break;
      case 'top':
        transform.push({
          translateY: translateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-400, 0],
          }),
        });
        break;
      case 'bottom':
        transform.push({
          translateY: translateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [400, 0],
          }),
        });
        break;
    }
    return transform;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <S.Overlay style={{opacity: opacityValue}} />
      </TouchableWithoutFeedback>
      <S.DrawerContainer
        placement={placement}
        style={{
          transform: getTransform(),
          opacity: translateValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 0.9, 1],
          }),
        }}>
        <S.Header>
          <S.CloseButton onPress={onClose}>
            <BackIcon width={24} height={24} color="#fff" />
          </S.CloseButton>
          <S.Title>Seu Carrinho</S.Title>
        </S.Header>
        <S.Content>
          {children}
        </S.Content>
      </S.DrawerContainer>
    </>
  );
};
