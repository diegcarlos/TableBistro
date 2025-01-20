import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {fonts} from '../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  position: relative;
`;

export const LogoContainer = styled.View`
  position: relative;
  width: 146px;
  height: 122px;
`;

export const ImgLogo = styled.Image`
  position: absolute;
  right: 28px;
  top: 48px;
  z-index: 2;
  width: 146px;
  height: 122px;
  resize-mode: contain;
`;

export const BackgroundImage = styled.Image`
  align-self: center;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const StyledImage = styled(Animated.Image)`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const ScreenTopContainer = styled.View`
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  top: -39px;
  width: 100%;
  height: 227.5px;
  left: 0;
  z-index: 1;
`;

export const ScreenTop = styled.Image`
  position: absolute;
  width: 245px;
  right: 0;
  z-index: 1;
  resize-mode: contain;
`;
export const ScreenBottomContainer = styled.View`
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 227.5px;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

export const ScreenBottom = styled.Image`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 732px;
  height: 100%;
  resize-mode: contain;
`;

export const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c83a2e;
  border-radius: 6.76px;
  padding: 20px 30px;
  bottom: 30px;
  left: 36px;
  z-index: 2;
`;

export const ButtonText = styled.Text`
  font-size: 20.88px;
  color: #ffffff;
  font-family: ${fonts.bold};
`;
