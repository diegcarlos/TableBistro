import CallWaiter from '../../assets/svg/call-waiter.svg';
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
  const {isOpen = false, onClose} = props;
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
            onPress={() => onClose?.(false)}
            fontWeight="bold"
            style={{width: '50%'}}>
            Sim, chamar
          </ButtonRed>
        </BoxButtons>
      </Container>
    </Modal>
  );
}
