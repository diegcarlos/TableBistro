import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import BackIcon from '../../assets/svg/back.svg';
import * as S from './styles';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
}

export const DrawerCarrinho: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  children,
}) => {
  const translateValue = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      Animated.timing(translateValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
      });
    }
  }, [isOpen, translateValue]);

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
      <S.Overlay onPress={onClose} />
      <S.DrawerContainer
        placement={placement}
        style={{
          transform: getTransform(),
        }}>
        <S.Header>
          <S.CloseButton onPress={onClose}>
            <BackIcon width={24} height={24} color="#fff" />
          </S.CloseButton>
          <S.Title>Seu Carrinho</S.Title>
        </S.Header>
        <S.Content>
          <S.Content>{children}</S.Content>
        </S.Content>
      </S.DrawerContainer>
    </>
  );
};
