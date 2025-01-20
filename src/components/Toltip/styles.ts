import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

export const TooltipContainer = styled.View`
  position: absolute;
  background-color: #ffc700;
  padding: 8px 12px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  top: 20px;
  right: 20px;
  height: 60px;
  width: 480px;
  z-index: 1000;
`;

export const WarningIcon = styled.View`
  margin-right: 8px;
`;

export const TooltipText = styled.Text`
  color: #000000;
  font-size: 14px;
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  margin-left: 8px;
`;

export const CloseIcon = styled.Text`
  color: #000000;
  font-size: 16px;
`;
