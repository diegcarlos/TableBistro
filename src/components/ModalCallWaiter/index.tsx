import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import CallWaiter from '../../assets/svg/call-waiter.svg';
import {PropsSettings, useAuth} from '../../context/AuthContext';
import {usePrinter} from '../../hooks/usePrinter';
import {
  CancelButton,
  CancelButtonText,
} from '../../Views/NumericKeyboard/styles';
import {ButtonRed} from '../ButtonRed';
import {Modal} from '../Modal';
import {
  BoxButtons,
  Container,
  TitleWater,
  TitleWaterDescription,
} from './styled';

interface Props {
  isOpen?: boolean;
  onClose?: (isOpen: boolean) => void;
}

export function ModalCallWaiter(props: Props) {
  const {mesa} = useAuth();
  const {isOpen = false, onClose} = props;
  const {printText} = usePrinter();
  const [settings, setSettings] = useState({} as PropsSettings);

  const handlePressTalkWaiter = async () => {
    try {
      onClose?.(false);
      if (settings.ipPrintNotification && settings.portaPrintNotification) {
        const text = `<CB>CHAMANDO GARCOM DA MESA ${mesa.mesa}</CB>`;
        await printText(text, {
          host: settings.ipPrintNotification,
          port: settings.portaPrintNotification,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSettings = async () => {
      const settings = await AsyncStorage.getItem('settings');
      if (settings) {
        setSettings(JSON.parse(settings));
      }
    };
    getSettings();
  }, []);

  return (
    <Modal
      closeButton={false}
      visible={isOpen}
      width={'75%'}
      height={'75%'}
      backgroundColor="#2E2E2E"
      overlayColor="#6B6B6BDE"
      onClose={() => onClose?.(false)}>
      <Container>
        <CallWaiter />
        <TitleWater>Deseja Chamar o Garçom? </TitleWater>
        <TitleWaterDescription>
          Deseja chamar um garçom para atendê-lo? Toque em 'Confirmar' e alguém
          virá até sua mesa em breve!
        </TitleWaterDescription>
        <BoxButtons style={{width: '50%'}}>
          <CancelButton onPress={() => onClose?.(false)}>
            <CancelButtonText>Voltar</CancelButtonText>
          </CancelButton>
          <ButtonRed
            onPress={handlePressTalkWaiter}
            fontWeight="bold"
            style={{width: '50%'}}>
            Sim, chamar
          </ButtonRed>
        </BoxButtons>
      </Container>
    </Modal>
  );
}
