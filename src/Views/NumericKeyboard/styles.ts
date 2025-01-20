import styled from 'styled-components/native';
import {fonts} from '../../theme/fonts';

export const Container = styled.View<{isLandscape?: boolean}>`
  flex: 1;
  width: 100%;
  flex-direction: ${({isLandscape}: {isLandscape: boolean}) =>
    isLandscape ? 'column' : 'row'};
  background-color: #181818;
  padding: 74px;
`;

export const ContainerHeader = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 24px;
  font-family: ${fonts.bold};
  margin-top: 20px;
`;

export const TableIcon = styled.Image`
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
`;

export const InputDisplay = styled.View`
  display: flex;
  width: 368px;
  height: 62px;
  background-color: #2f2f2f;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #4e4e4e;
  margin-bottom: 32px;
  align-self: center;
`;

export const InputText = styled.Text`
  color: #ffffff;
  font-size: 39.2px;
  font-family: ${fonts.bold};
  text-align: center;
`;

export const KeyboardContainer = styled.View<{isLandscape?: boolean}>`
  width: ${({isLandscape}: {isLandscape: boolean}) =>
    isLandscape ? '100%' : '50%'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111111;
  flex-direction: column;
  padding: 0 63px;
  flex-wrap: wrap;
  border-radius: 0 16px 16px 0;
`;

export const KeyboardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const KeyButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;

export const KeyText = styled.Text`
  color: #ffffff;
  font-size: 55px;
  font-family: ${fonts.medium};
`;

export const ActionButtonsContainer = styled.View<{isLandscape?: boolean}>`
  width: ${({isLandscape}: {isLandscape: boolean}) =>
    isLandscape ? '100%' : '50%'};
  background-color: #232323;
  flex-direction: column;
  justify-content: space-between;
  padding: 63px;
  border-radius: 16px 0 0 16px;
`;

export const ControlButtonsContainer = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: row;
  gap: 24px;
`;

export const CancelButton = styled.TouchableOpacity`
  width: 206px;
  padding: 19px 28px 19px 28px;
  border: 1px solid #ffffff;
  border-radius: 8px;
`;

export const CancelButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  align-self: center;
  font-weight: bold;
`;

export const ConfirmButton = styled.TouchableOpacity`
  width: 206px;
  padding: 19px 28px 19px 28px;
  background-color: #c83a2e;
  border-radius: 8px;
`;

export const ConfirmButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  align-self: center;
`;

export const DeleteButton = styled.TouchableOpacity`
  justify-content: center;
`;
