import React from 'react';
import {formatCurrency} from '../../utils/formatCurrency';
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
  subtotal: number;
  countItems?: number;
  onCheckout: () => void;
  loading?: boolean;
}

export function FooterShop({
  subtotal = 0,
  countItems = 0,
  onCheckout,
  loading = false,
}: Props) {
  return (
    <Container>
      <FooterHead>
        <TextCountItems>{countItems} Items pedidos</TextCountItems>
        <TextSubTotal>
          Subtotal: <TextTotal>{formatCurrency(subtotal)}</TextTotal>
        </TextSubTotal>
      </FooterHead>
      <FooterButtons>
        <ButtonRed
          onPress={onCheckout}
          block
          fontWeight="bold"
          loading={loading}>
          Fazer Pedido
        </ButtonRed>
      </FooterButtons>
    </Container>
  );
}
