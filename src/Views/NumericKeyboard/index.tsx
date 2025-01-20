import React, {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  ActionButtonsContainer,
  CancelButton,
  CancelButtonText,
  ConfirmButton,
  ConfirmButtonText,
  Container,
  ContainerHeader,
  ControlButtonsContainer,
  DeleteButton,
  Header,
  InputDisplay,
  InputText,
  KeyboardContainer,
  KeyboardRow,
  KeyButton,
  KeyText,
  Title,
} from './styles';

import BackSpaceIcon from '../../assets/svg/backSpace.svg';
import TableIcon from '../../assets/svg/table.svg';

export function NumericKeyboard({navigation}: any) {
  const [value, setValue] = useState('');
  const [isLandscape, setIsLandscape] = useState(false);
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    setIsLandscape(width > height);
  }, [width, height]);

  const handleNumberPress = (number: string) => {
    if (value.length < 4) {
      setValue(prev => prev + number);
    }
  };

  const handleDelete = () => {
    setValue(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    if (value) {
      console.log('Mesa selecionada:', value);
      navigation.navigate('Products');
    }
  };

  const renderKeyboardRow = (numbers: string[]) => (
    <KeyboardRow>
      {numbers.map(num => (
        <KeyButton key={num} onPress={() => handleNumberPress(num)}>
          <KeyText>{num}</KeyText>
        </KeyButton>
      ))}
    </KeyboardRow>
  );

  return (
    <Container isLandscape={!isLandscape}>
      <ActionButtonsContainer isLandscape={!isLandscape}>
        <ContainerHeader>
          <Header>
            <TableIcon width={50} height={50} fill="#fff" />
            <Title>Selecione a Mesa</Title>
          </Header>

          <InputDisplay>
            <InputText>{value}</InputText>
          </InputDisplay>
        </ContainerHeader>
        <ControlButtonsContainer>
          <CancelButton onPress={() => navigation.goBack()}>
            <CancelButtonText>Cancelar</CancelButtonText>
          </CancelButton>
          <ConfirmButton onPress={handleConfirm}>
            <ConfirmButtonText>Confirmar</ConfirmButtonText>
          </ConfirmButton>
        </ControlButtonsContainer>
      </ActionButtonsContainer>

      <KeyboardContainer isLandscape={!isLandscape}>
        {renderKeyboardRow(['7', '8', '9'])}
        {renderKeyboardRow(['4', '5', '6'])}
        {renderKeyboardRow(['1', '2', '3'])}
        <KeyboardRow>
          <KeyButton>
            <KeyText />
          </KeyButton>
          <KeyButton onPress={() => handleNumberPress('0')}>
            <KeyText>0</KeyText>
          </KeyButton>
          <DeleteButton onPress={handleDelete}>
            <KeyText style={{marginRight: 20}}>
              <BackSpaceIcon width={65.17} height={39.28} fill="#C83A2E" />
            </KeyText>
          </DeleteButton>
        </KeyboardRow>
      </KeyboardContainer>
    </Container>
  );
}
