import styled, {css} from 'styled-components/native';
import {fonts} from '../../theme/fonts';

export const InputContainer = styled.View`
  position: relative;
  margin-bottom: 16px;
  justify-content: center;
`;

export const Input = styled.TextInput`
  background-color: #2c2c2c;
  border-radius: 16px;
  border: 1px solid #808080;
  padding: 16px;
  padding-left: 50px;
  color: #f9f9f9;
  font-size: 16px;
  font-family: ${fonts.medium};
`;

export const Icon = styled.Pressable<{secureTextEntry?: boolean}>`
  position: absolute;
  color: #fff;
  width: 30px;
  height: 30px;
  margin-left: 10px;

  ${(p: any) =>
    p.secureTextEntry &&
    css`
      right: 0;
      padding-top: 5px;
      margin-right: 15px;
    `}
  z-index: 1;
`;
