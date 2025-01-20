import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text} from 'react-native';
import IconWarning from '../../assets/svg/warning.svg';
import {
  AnimatedContainer,
  CloseButton,
  CloseIcon,
  TooltipContainer,
  TooltipText,
  WarningIcon,
} from './styles';

interface TooltipProps {
  text: string;
  onClose: () => void;
  visible?: boolean;
  duration?: number;
}

export const useTooltip = (initialDuration: number = 3000) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [duration, setDuration] = useState(initialDuration);

  const showTooltip = (message: string, tooltipDuration?: number) => {
    setText(message);
    if (tooltipDuration) {
      setDuration(tooltipDuration);
    }
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
    setText('');
  };

  return {
    visible,
    text,
    duration,
    showTooltip,
    hideTooltip,
  };
};

const Tooltip: React.FC<TooltipProps> = ({
  text,
  onClose,
  visible = true,
  duration = 3000,
}) => {
  const slideAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 500,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onClose());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, slideAnim, onClose, duration]);

  if (!visible) {
    return null;
  }

  return (
    <AnimatedContainer style={{transform: [{translateX: slideAnim}]}}>
      <TooltipContainer>
        <WarningIcon>
          <Text>
            <IconWarning width={20} height={20} />
          </Text>
        </WarningIcon>
        <TooltipText>{text}</TooltipText>
        <CloseButton onPress={onClose}>
          <CloseIcon>✕</CloseIcon>
        </CloseButton>
      </TooltipContainer>
    </AnimatedContainer>
  );
};

export default Tooltip;
