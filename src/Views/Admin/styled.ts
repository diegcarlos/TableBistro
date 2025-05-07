import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
export const Container = styled.View`
  flex-grow: 1;
  width: 100%;
  padding: 20px;
  padding-top: 100px;
  padding-bottom: 40px;
  background-color: #181818;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #f9f9f9;
  margin-bottom: 8px;
  text-align: center;
`;

export const Content = styled.View`
  width: 100%;
  max-width: 75%;
  flex-direction: row;
  elevation: 4;
  padding: 24px;
  gap: 24px;
  align-items: center;
  background-color: #2a2a2a;
  border-radius: 16px;
  margin: auto;
`;

export const LeftSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #3a3a3a;
  border-radius: 12px;
`;

export const RightSection = styled.View`
  flex: 2;
  padding: 20px;
`;

export const PasswordContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: #3a3a3a;
  border-radius: 12px;
  background-color: #2a2a2a;
  overflow: hidden;
  width: 100%;
  elevation: 2;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 56px;
  padding-horizontal: 16px;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
`;

export const EyeIcon = styled(TouchableOpacity)`
  padding: 16px;
  background-color: #3a3a3a;
  border-left-width: 2px;
  border-left-color: #3a3a3a;
`;

export const EyeIconText = styled.Text`
  font-size: 20px;
`;

export const ErrorText = styled.Text`
  color: #c83a2e;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
  font-weight: 500;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 8px;
  line-height: 20px;
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  height: 56px;
  background-color: #c83a2e;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  elevation: 4;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const PasswordLabel = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-bottom: 12px;
  font-weight: 500;
`;
