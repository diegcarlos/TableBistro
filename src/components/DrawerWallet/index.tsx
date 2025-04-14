import {useEffect, useState} from 'react';
import {useCart} from '../../context/CartContext';
import {PedidoTable} from '../../types/pedidoTable';
import BarLoader from '../BarLoader';
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
  const {getOrderTable} = useCart();
  const {isOpen = false, onClose} = props;
  const [dataPedido, setDataPedido] = useState({} as PedidoTable);
  const [loading, setLoading] = useState(false);

  const get = async () => {
    setLoading(true);
    try {
      const resp = await getOrderTable();
      setDataPedido(resp);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      get();
    }

    return () => {
      setDataPedido({} as PedidoTable);
    };
  }, [isOpen]);

  return (
    <Drawer
      isOpen={isOpen}
      title="Minha Conta"
      onClose={() => onClose?.(false)}>
      <Container>
        {loading ? (
          <BarLoader
            size={50}
            color="#E11D48"
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          />
        ) : (
          <ScrollViewItems>
            {dataPedido?.produtos?.map((wall, i) => (
              <ViewItems key={wall?.produto?.codigo + i}>
                <ViewItemsProduct>
                  <TextItemsProduct>{wall?.produto?.nome}</TextItemsProduct>
                  <TextItemsProductDesc numberOfLines={1} ellipsizeMode="tail">
                    {wall?.produto?.descricao}
                  </TextItemsProductDesc>
                </ViewItemsProduct>
                <ViewItemsValues>
                  <TextItemsValues>
                    <TextItemsQuantity>{wall.quantidade}x </TextItemsQuantity>
                    <TextItemsValues>
                      {wall?.produto?.preco.toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                      })}
                    </TextItemsValues>
                  </TextItemsValues>
                </ViewItemsValues>
              </ViewItems>
            ))}
          </ScrollViewItems>
        )}
        <Footer>
          <FooterHeader>
            <FooterHeaderText>
              {dataPedido?.produtos?.length} Items pedidos
            </FooterHeaderText>
            <FooterSubTotal>
              SubTotal:{' '}
              <FooterTotal>
                {dataPedido?.produtos
                  ?.reduce((a, b) => a + b?.produto?.preco * b?.quantidade, 0)
                  ?.toLocaleString('pt-BR', {
                    currency: 'BRL',
                    style: 'currency',
                  })}
              </FooterTotal>
            </FooterSubTotal>
          </FooterHeader>
          <FooterButtons>
            <ButtonRed block fontWeight="bold" loading={loading}>
              Finalizar a Conta
            </ButtonRed>
          </FooterButtons>
        </Footer>
      </Container>
    </Drawer>
  );
}
