import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
const d = Dimensions.get('screen');

export const Container = styled.View`
  height: 100%;
  width: 220px;
  background-color: #0d1110;
`;

export const Logo = styled.View`
  color: #fff;
  width: 100%;
  height: 171px;
`;

export const LogoImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const NavList = styled.View`
  margin-top: 20px;
  flex: 1;
`;
export const NavItem = styled.TouchableOpacity<{isActive?: boolean}>`
  width: 100%;
  flex-direction: row;
  height: ${d.height * 0.08}px;
  justify-content: left;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
  background-color: ${(p: any) => (p.isActive ? '#C83A2E' : 'transparent')};
`;

export const NavItemText = styled.Text`
  color: #fff;
  font-family: 'Montserrat-Bold';
  font-size: 16px;
`;
