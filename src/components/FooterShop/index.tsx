import {useCart} from '../../context/CartContext';
import {
  CancelButton,
  CancelButtonText,
} from '../../Views/NumericKeyboard/styles';
import {ButtonRed} from '../ButtonRed';
import {
  Container,
  FooterButtons,
  FooterHead,
  TextCountItems,
  TextSubTotal,
  TextTotal,
} from './styled';

interface Props {
  countItems: number;
  onFinish?: () => void;
  subTotal: number;
}

export function FooterShop(props: Props) {
  const {clearCart} = useCart();
  const {countItems = 0, subTotal = 0, onFinish} = props;
  return (
    <Container>
      <FooterHead>
        <TextCountItems>{countItems} Items pedidos</TextCountItems>
        <TextSubTotal>
          Subtotal:{' '}
          <TextTotal>
            {subTotal?.toLocaleString('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            })}
          </TextTotal>
        </TextSubTotal>
      </FooterHead>
      <FooterButtons>
        <CancelButton style={{width: '50%'}}>
          <CancelButtonText style={{fontSize: 20}}>
            Continuar Comprando
          </CancelButtonText>
        </CancelButton>
        <ButtonRed
          onPress={() => {
            clearCart?.();
            onFinish?.();
          }}
          style={{width: '50%'}}
          fontWeight="bold">
          Fazer Pedido
        </ButtonRed>
      </FooterButtons>
    </Container>
  );
}
