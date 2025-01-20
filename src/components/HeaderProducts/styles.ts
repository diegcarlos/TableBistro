import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const d = Dimensions.get('screen');
export const Container = styled.View`
  height: 60px;
  width: ${d.width - 220}px;
  background-color: #111111;
`;

export const MenuHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #0b0c0e;
`;

export const MenuItem = styled.View<{isLast?: boolean}>`
  justify-content: center;
  align-items: center;
  height: 60px;
  width: ${(p: any) => (p.isLast ? '200px' : '146px')};
  background-color: ${(p: any) => (!p.isLast ? '#071113' : '#C83A2E')};
  border-left-width: 1px;
  border-left-color: #6b6b6b;
`;

export const MenuTouchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const MenuItemBody = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  height: 60px;
  width: 100%;
`;

export const MenuItemText = styled.Text`
  color: #fff;
  font-family: 'Montserrat-Medium';
  font-size: 16px;
  width: 79px;
  flex-wrap: wrap;
  flex-shrink: 1;
  text-align: left;
`;
