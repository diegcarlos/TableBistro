import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const Overlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(107, 107, 107, 0.9);
  backdrop-filter: blur(8px);
  z-index: 1;
`;

export const DrawerContainer = styled(Animated.View)<{placement: string}>`
  position: absolute;
  width: 611px;
  height: 100%;
  background-color: #2e2e2e;
  z-index: 2;
  ${({placement}: any) => {
    switch (placement) {
      case 'right':
        return `
          top: 0;
          right: 0;
        `;
      case 'left':
        return `
          top: 0;
          left: 0;
        `;
      case 'top':
        return `
          top: 0;
          left: 0;
          right: 0;
          height: 400px;
          width: 100%;
        `;
      case 'bottom':
        return `
          bottom: 0;
          left: 0;
          right: 0;
          height: 400px;
          width: 100%;
        `;
      default:
        return '';
    }
  }}
`;

export const Header = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  margin: 12px;
  border-bottom-color: #808080;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'Montserrat-Bold';
  color: #e6e6e6;
`;

export const CloseButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-right: 15px;
`;

export const Content = styled.View`
  flex: 1;
  background-color: #2e2e2e;
  margin: 0 12px 12px 12px;
`;
