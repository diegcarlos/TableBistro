import styled from 'styled-components/native';
import {TextBold} from '../Text';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24px;
`;

export const Button = styled.TouchableOpacity`
  width: 83px;
  height: 83px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${(props: any) =>
    props.disabled ? '#ccc' : props.add ? '#e74c3c' : '#e0e0e0'};
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props: any) => (props.add ? '#fff' : '#333')};
`;

export const CountText = styled(TextBold)`
  font-size: 62px;
  font-weight: bold;
  color: #f9f9f9;
  min-width: 30px;
  text-align: center;
`;
