import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {PropsSettings, useAuth} from '../../context/AuthContext';
import {useCart} from '../../context/CartContext';
import {usePrinter} from '../../hooks/usePrinter';
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
  const [settings, setSettings] = useState({} as PropsSettings);

  const {printText} = usePrinter();
  const {mesa} = useAuth();

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
    const getSettings = async () => {
      const settings = await AsyncStorage.getItem('settings');
      if (settings) {
        setSettings(JSON.parse(settings));
      }
    };
    getSettings();
  }, []);

  useEffect(() => {
    if (isOpen) {
      get();
    }

    return () => {
      setDataPedido({} as PedidoTable);
    };
  }, [isOpen]);

  const calculateItemTotal = (produto: PedidoTable['produtos'][0]) => {
    const produtoTotal = produto.produto.preco * produto.quantidade;
    const adicionaisTotal =
      produto.adicionais?.reduce((total: number, adicional) => {
        return total + adicional.preco * adicional.quantidade;
      }, 0) || 0;
    return produtoTotal + adicionaisTotal;
  };

  const handlePressFinish = () => {
    if (
      settings.ipPrintBill &&
      settings.portaPrintBill &&
      dataPedido?.produtos?.length > 0
    ) {
      printText(`<CB>FECHAR A CONTA DA MESA ${mesa.mesa}</CB>`, {
        host: settings.ipPrintBill,
        port: settings.portaPrintBill,
      });
    }
  };

  const calculateTotal = () => {
    return (
      dataPedido?.produtos?.reduce((total, produto) => {
        return total + calculateItemTotal(produto);
      }, 0) || 0
    );
  };

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
                  {wall.adicionais?.map((adicional, j: number) => (
                    <TextItemsProductDesc
                      key={j}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      + {adicional.quantidade}x {adicional.adicional.nome}
                    </TextItemsProductDesc>
                  ))}
                </ViewItemsProduct>
                <ViewItemsValues>
                  <TextItemsValues>
                    <TextItemsQuantity>{wall.quantidade}x </TextItemsQuantity>
                    <TextItemsValues>
                      {calculateItemTotal(wall).toLocaleString('pt-BR', {
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
                {calculateTotal().toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })}
              </FooterTotal>
            </FooterSubTotal>
          </FooterHeader>
          <FooterButtons>
            <ButtonRed
              onPress={() => {
                handlePressFinish();
              }}
              block
              fontWeight="bold"
              loading={loading}>
              {loading ? 'Finalizando...' : 'Finalizar a Conta'}
            </ButtonRed>
          </FooterButtons>
        </Footer>
      </Container>
    </Drawer>
  );
}
