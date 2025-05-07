import {useQuery} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import io from 'socket.io-client';
import CardProducts from '../../components/CardProducts';
import ContentProducts from '../../components/ContentProducts';
import {DrawerCarShop} from '../../components/DrawerCarShop';
import {DrawerWallet} from '../../components/DrawerWallet';
import {GroupItens} from '../../components/GroupItems';
import HeaderProducts from '../../components/HeaderProducts';
import {Modal} from '../../components/Modal';
import {ModalCallWaiter} from '../../components/ModalCallWaiter';
import NavProducts from '../../components/NavProducts';
import {Product} from '../../components/Product';
import {useAuth} from '../../context/AuthContext';
import {CartItems, useCart} from '../../context/CartContext';
import api from '../../http/api';
import {PaginatedResult} from '../../types/pagination';
import {Category, Product as TypesProduct} from '../../types/products';
import {Container, ContentFluid} from './styles';

const Products = ({navigation}: {navigation: any}) => {
  const {addToCart, setDataProducts} = useCart();
  const {user, checkAuthAndTable} = useAuth();

  const scrollViewRef = useRef<ScrollView>(null);
  const groupLayouts = useRef<{[key: string]: LayoutRectangle}>({});
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [selectProduct, setSelectProduct] = useState({} as TypesProduct);
  const [isModalProduct, setIsModalProduct] = useState(false);
  const [indexProduct, setIndexProduct] = useState<number | null>(null);
  const [isModalWaiter, setIsModalWaiter] = useState(false);
  const [isDrawerWallet, setIsDrawerWallet] = useState(false);
  const [isDrawerShopCar, setIsDrawerShopCar] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pendingScrollIndex, setPendingScrollIndex] = useState<number | null>(
    null,
  );

  // Verificar autenticação e mesa selecionada
  useEffect(() => {
    const {isAuthenticated, hasMesa} = checkAuthAndTable();

    if (!isAuthenticated) {
      navigation.replace('Login');
      return;
    }

    if (!hasMesa) {
      navigation.replace('InsertTable');
      return;
    }
  }, []);

  const products = useQuery<AxiosResponse, Error, PaginatedResult<Category>>({
    queryKey: ['Products'],
    queryFn: async () =>
      await api.get(`/restaurantCnpj/${user?.restaurantCnpj}/categorias`),
    select: data => data.data,
  });

  // Implementação do socket para atualizar status dos produtos
  useEffect(() => {
    if (user?.restaurantCnpj) {
      const socket = io(api.defaults.baseURL || 'https://api.bistro.app.br/');

      socket.on('connect', () => {
        socket.emit('join:restaurant', user.restaurantCnpj);
      });

      socket.on(
        `produto:status:updated:${user.restaurantCnpj}`,
        (data: {produtoId: string; status: string}) => {
          // Atualiza a lista de produtos quando houver mudança de status
          products.refetch();
        },
      );

      return () => {
        socket.disconnect();
      };
    }
  }, [user?.restaurantCnpj, products]);

  const onGroupLayout = useCallback(
    (groupId: string, layout: LayoutRectangle) => {
      groupLayouts.current[groupId] = layout;
    },
    [],
  );

  // Array de grupos visíveis (apenas categorias ativas e com produtos)
  const visibleGroups =
    products.data?.data?.filter(g => g.ativo && g.produtos.length > 0) || [];

  const scrollToGroup = useCallback((visibleIndex: number) => {
    setActiveGroupIndex(visibleIndex);
    setPendingScrollIndex(visibleIndex);
  }, []);

  useEffect(() => {
    if (
      pendingScrollIndex !== null &&
      visibleGroups[pendingScrollIndex] &&
      groupLayouts.current[visibleGroups[pendingScrollIndex].id]
    ) {
      const group = visibleGroups[pendingScrollIndex];
      const layout = groupLayouts.current[group.id];
      const headerHeight = 96;
      const offset = headerHeight;
      const targetPosition = Math.max(0, layout.y - offset);

      setIsScrolling(true);
      scrollViewRef.current?.scrollTo({
        y: targetPosition,
        animated: true,
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 300);

      setPendingScrollIndex(null);
    }
  }, [pendingScrollIndex, visibleGroups]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isScrolling) return;

      const scrollY = event.nativeEvent.contentOffset.y;
      const headerHeight = 96;
      const offset = headerHeight;
      const adjustedScrollY = scrollY + offset;

      if (!visibleGroups.length) return;

      let currentIndex = 0;
      let minDistance = Number.MAX_VALUE;

      visibleGroups.forEach((group, index) => {
        const layout = groupLayouts.current[group.id];
        if (!layout) return;

        // Calcula a distância considerando a posição do topo do grupo
        const distance = Math.abs(layout.y - adjustedScrollY);
        if (distance < minDistance) {
          minDistance = distance;
          currentIndex = index;
        }
      });

      if (currentIndex !== activeGroupIndex) {
        setActiveGroupIndex(currentIndex);
      }
    },
    [visibleGroups, isScrolling, activeGroupIndex],
  );

  // Efeito para atualizar os layouts quando os dados mudarem
  useEffect(() => {
    if (products.data?.data) {
      groupLayouts.current = {};
    }
  }, [products.data?.data]);

  const handleAddCard = (data: CartItems, index: number | null) => {
    if (index !== null) {
      addToCart(data);
    }
    setIsModalProduct(false);
  };

  useEffect(() => {
    setDataProducts(products.data?.data || []);
  }, [products.data]);

  return (
    <Container>
      <NavProducts
        onSelectGroup={scrollToGroup}
        activeIndex={activeGroupIndex}
        loading={products.isLoading}
        itens={visibleGroups.map(pro => ({name: pro.nome}))}
      />
      <ContentFluid>
        <HeaderProducts
          onPressWaiter={() => setIsModalWaiter(true)}
          onPressWallet={() => setIsDrawerWallet(true)}
          onPressShopCar={() => setIsDrawerShopCar(true)}
          loading={products.isLoading}
        />
        <ContentProducts loading={products.isLoading || products.isFetching}>
          <ScrollView
            ref={scrollViewRef}
            onScroll={onScroll}
            scrollEventThrottle={16}
            style={{flex: 1}}>
            {visibleGroups.map((group, index) => {
              // Filtra os produtos ativos
              const produtosAtivos = group.produtos.filter(produto => {
                // Se o produto estiver ativo, exibe
                if (produto.ativo) return true;

                // Se não estiver ativo, verifica se tem adicionais com seleção única
                if (group.adicionais && group.adicionais.length > 0) {
                  return group.adicionais.some(
                    adicional =>
                      adicional.qtdMinima === 1 &&
                      adicional.qtdMaxima === 1 &&
                      adicional.opcoes.some(opcao => opcao.preco > 0),
                  );
                }

                return false;
              });

              // Se não houver produtos ativos ou com adicionais válidos, não renderiza o grupo
              if (produtosAtivos.length === 0) return null;

              return (
                <GroupItens
                  key={group.id}
                  active={group.ativo}
                  title={group.nome}
                  onLayout={event =>
                    onGroupLayout(group.id, event.nativeEvent.layout)
                  }>
                  <View style={{gap: 16}}>
                    {produtosAtivos.map((product, i) => {
                      if (product.ativo) {
                        return (
                          <CardProducts
                            onPressAdd={() => {
                              setSelectProduct(product);
                              setIndexProduct(i);
                              setIsModalProduct(true);
                            }}
                            key={product.id}
                            image={product.imagem}
                            title={product.nome}
                            description={product.descricao}
                            price={product.preco}
                            discount={0}
                            loading={products.isLoading}
                          />
                        );
                      }
                    })}
                  </View>
                </GroupItens>
              );
            })}
          </ScrollView>
        </ContentProducts>
      </ContentFluid>

      <Modal
        overlayColor="#6B6B6BDE"
        backgroundColor="#2E2E2E"
        width={'90%'}
        height={'90%'}
        visible={isModalProduct}
        onClose={() => setIsModalProduct(false)}>
        <Product
          product={selectProduct}
          category={products.data?.data?.find(
            g => g.id === selectProduct?.categoria?.id,
          )}
          onProductFinish={p => handleAddCard(p, indexProduct)}
          indexProduct={indexProduct}
        />
      </Modal>
      <DrawerWallet isOpen={isDrawerWallet} onClose={setIsDrawerWallet} />
      <DrawerCarShop isOpen={isDrawerShopCar} onClose={setIsDrawerShopCar} />
      <ModalCallWaiter isOpen={isModalWaiter} onClose={setIsModalWaiter} />
    </Container>
  );
};

export default Products;
