import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text} from 'react-native';
import {
  CloseIcon,
  Container,
  ModalCloseButton,
  ModalContainer,
  ModalContent,
} from './styles';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  overlayColor?: string;
  children: React.ReactNode;
  closeButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  width,
  height,
  backgroundColor,
  overlayColor,
  children,
  closeButton = true,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 65,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.3,
          tension: 65,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, fadeAnim, scaleAnim]);

  if (!modalVisible) return null;

  return (
    <Container>
      <Animated.View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          opacity: fadeAnim,
        }}>
        <ModalContainer overlayColor={overlayColor}>
          <Animated.View
            style={{
              transform: [{scale: scaleAnim}],
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ModalContent
              width={width}
              height={height}
              backgroundColor={backgroundColor}>
              {closeButton && (
                <ModalCloseButton title="Fechar" onPress={() => onClose()}>
                  <Text style={{color: '#fff'}}>
                    <CloseIcon />
                  </Text>
                </ModalCloseButton>
              )}
              {children}
            </ModalContent>
          </Animated.View>
        </ModalContainer>
      </Animated.View>
    </Container>
  );
};
