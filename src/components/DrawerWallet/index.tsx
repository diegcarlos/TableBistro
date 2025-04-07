import {useCart} from '../../context/CartContext';
import {ButtonRed} from '../ButtonRed';
import {Drawer} from '../Drawer';
import {
  Container,
  Footer,
  FooterButtons,
  FooterHeader,
  FooterHeaderText,
  FooterSubTotal,
  FooterTotal,
  ScrollViewItems,
  TextItemsProduct,
  TextItemsProductDesc,
  TextItemsQuantity,
  TextItemsValues,
  ViewItems,
  ViewItemsProduct,
  ViewItemsValues,
} from './styled';

interface Props {
  isOpen?: boolean;
  onClose?: (data: boolean) => void;
}

export function DrawerWallet(props: Props) {
  const {dataWallet} = useCart();
  const {isOpen = false, onClose} = props;
  return (
    <Drawer
      isOpen={isOpen}
      title="Minha Conta"
      onClose={() => onClose?.(false)}>
      <Container>
        <ScrollViewItems>
          {dataWallet.map(wall => (
            <ViewItems key={wall.name}>
              <ViewItemsProduct>
                <TextItemsProduct>{wall.name}</TextItemsProduct>
                <TextItemsProductDesc numberOfLines={1} ellipsizeMode="tail">
                  {wall.description}
                </TextItemsProductDesc>
              </ViewItemsProduct>
              <ViewItemsValues>
                <TextItemsValues>
                  <TextItemsQuantity>{wall.quantity}x </TextItemsQuantity>
                  <TextItemsValues>
                    {wall.price.toLocaleString('pt-BR', {
                      currency: 'BRL',
                      style: 'currency',
                    })}
                  </TextItemsValues>
                </TextItemsValues>
              </ViewItemsValues>
            </ViewItems>
          ))}
        </ScrollViewItems>
        <Footer>
          <FooterHeader>
            <FooterHeaderText>
              {dataWallet.length} Items pedidos
            </FooterHeaderText>
            <FooterSubTotal>
              SubTotal:{' '}
              <FooterTotal>
                {dataWallet
                  .reduce((a, b) => a + b.price, 0)
                  .toLocaleString('pt-BR', {
                    currency: 'BRL',
                    style: 'currency',
                  })}
              </FooterTotal>
            </FooterSubTotal>
          </FooterHeader>
          <FooterButtons>
            <ButtonRed block fontWeight="bold">
              Finalizar a Conta
            </ButtonRed>
          </FooterButtons>
        </Footer>
      </Container>
    </Drawer>
  );
}
