import styled from 'styled-components/native';
import {fonts} from '../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: #181818;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const LogoContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  height: 100px;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 100%;
  border: 1px solid #a8a8a8;
  border-radius: 16px;
`;

export const FormContainer = styled.View`
  width: 100%;
  max-width: 488px;
  background-color: #242424;
  border-radius: 24px;
  padding: 40px 52px;
`;

export const SavePasswordContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxText = styled.Text`
  color: #e6e6e6;
  margin-left: 8px;
  font-size: 14px;
  font-family: ${fonts.regular};
`;

export const ForgotPasswordContainer = styled.View`
  flex-direction: row;
`;

export const ForgotPasswordText = styled.Text<{red?: boolean}>`
  color: ${(p: any) => (p.red ? '#c83a2e' : '#e6e6e6')};
  font-family: ${fonts.regular};
  font-size: 14px;
`;

export const LoginButtonContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #c83a2e;

  width: 314px;
  display: flex;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
`;

export const LoginButtonText = styled.Text`
  font-family: ${fonts.bold};
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`;
