import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const d = Dimensions.get('screen');
export const Container = styled.View`
  position: relative;
  flex-direction: column;
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
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 60px;
  white-space: nowrap;
`;

export const MenuItemText = styled.Text`
  color: #fff;
  font-family: 'Montserrat-Medium';
  font-size: 16px;
  width: 79px;
  flex-shrink: 1;
  text-align: left;
`;

export const ViewMesa = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  left: 16px;
  z-index: 1;
  height: 60px;
`;
export const TextMesa = styled.Text`
  color: #e6e6e6;
  font-family: 'Montserrat-Medium';
  font-size: 18px;
  font-weight: 600;
  font-family: 'Montserrat-Medium';
`;

export const TextNumMesa = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #545454;
  width: 34px;
  height: 32px;
  border-radius: 5px;
`;
