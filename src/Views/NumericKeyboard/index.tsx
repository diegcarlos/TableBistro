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
import Tooltip, {useTooltip} from '../../components/Toltip';
import {useAuth} from '../../context/AuthContext';
import api from '../../http/api';

export function NumericKeyboard({navigation}: any) {
  const {showTooltip, visible, hideTooltip, text} = useTooltip();
  const {user, setMesaStorage, mesa} = useAuth();
  const [value, setValue] = useState('');
  const [isLandscape, setIsLandscape] = useState(false);
  const {width, height} = useWindowDimensions();

  const handleNumberPress = (number: string) => {
    if (value.length < 4) {
      setValue(prev => prev + number);
    }
  };

  const handleDelete = () => {
    setValue(prev => prev.slice(0, -1));
  };

  const handleConfirm = async () => {
    try {
      if (!value) {
        showTooltip('Por favor, insira o número da mesa');
        return;
      }

      if (!user || !user.restaurantCnpj) {
        showTooltip('Informações do usuário não disponíveis');
        return;
      }

      const resp = await api.get(
        `/restaurantCnpj/${user.restaurantCnpj}/mesa`,
        {params: {mesaNumber: value}},
      );

      if (resp.status === 200) {
        setMesaStorage(String(value), resp.data.id);
        navigation.navigate('Products');
      }
    } catch (error: any) {
      console.error('Erro ao confirmar mesa:', error);
      const errorMessage =
        error.response?.data?.message || 'Erro ao conectar com o servidor';
      showTooltip(errorMessage);
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

  useEffect(() => {
    setIsLandscape(width > height);
  }, [width, height]);

  useEffect(() => {
    if (mesa && mesa.mesa) {
      setValue(String(mesa.mesa));
    }
  }, [mesa]);

  return (
    <Container isLandscape={!isLandscape}>
      {visible && <Tooltip text={text} onClose={hideTooltip} />}
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
            <KeyText>{null}</KeyText>
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
