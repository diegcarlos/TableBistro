import {useQuery} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import React, {useCallback, useRef, useState} from 'react';
import {
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import CardProducts from '../../components/CardProducts';
import ContentProducts from '../../components/ContentProducts';
import {GroupItens} from '../../components/GroupItems';
import HeaderProducts from '../../components/HeaderProducts';
import {Modal} from '../../components/Modal';
import {ModalCallWaiter} from '../../components/ModalCallWaiter';
import NavProducts from '../../components/NavProducts';
import {Product} from '../../components/Product';
import {useAuth} from '../../context/AuthContext';
import {CartItems, useCart} from '../../context/CartContext';
import api from '../../http/api';
import {Category, Product as TypesProduct} from '../../types/products';
import {Container, ContentFluid} from './styles';

const Products = () => {
  const {addToCart} = useCart();
  const {user} = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const groupLayouts = useRef<{[key: string]: LayoutRectangle}>({});
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [selectProduct, setSelectProduct] = useState({} as TypesProduct);
  const [isModalProduct, setIsModalProduct] = useState(false);
  const [indexProduct, setIndexProduct] = useState<number | null>(null);
  const [isModalWaiter, setIsModalWaiter] = useState(false);

  const products = useQuery<AxiosResponse<Category[]>>({
    queryKey: ['Products'],
    queryFn: () =>
      api.get(`/restaurantCnpj/${user?.restaurantCnpj}/categorias`),
  });

  const onGroupLayout = useCallback(
    (groupId: string, layout: LayoutRectangle) => {
      groupLayouts.current[groupId] = layout;
    },
    [],
  );

  const scrollToGroup = (index: number) => {
    console.log(index);
    const group = products.data?.data[index];
    if (group && scrollViewRef.current && groupLayouts.current[group.id]) {
      const layout = groupLayouts.current[group.id];

      scrollViewRef.current.scrollTo({
        y: Math.max(0, layout.y),
        animated: true,
      });
    }
  };

  const handleAddCard = (data: CartItems, index: number | null) => {
    if (index) {
      addToCart(data, index);
    }
    setIsModalProduct(false);
  };

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = event.nativeEvent.contentOffset.y;

      const visibleGroups = products.data?.data.filter(
        g => g.produtos.length > 0,
      );
      let closestGroup = 0;
      let minDistance = Number.MAX_VALUE;

      visibleGroups?.forEach((group, index) => {
        const layout = groupLayouts.current[group.id];
        if (layout) {
          const distance = Math.abs(layout.y - scrollY);
          if (distance < minDistance) {
            minDistance = distance;
            closestGroup = index;
          }
        }
      });

      if (
        visibleGroups &&
        visibleGroups.length > 0 &&
        closestGroup < visibleGroups.length
      ) {
        const activeGroupId = visibleGroups[closestGroup].id;
        const activeIndex =
          products.data?.data.findIndex(g => g.id === activeGroupId) ?? 0;
        setActiveGroupIndex(activeIndex);
      }
    },
    [products.data?.data],
  );

  return (
    <Container>
      <NavProducts
        onSelectGroup={scrollToGroup}
        activeIndex={activeGroupIndex}
        itens={
          products.data?.data.map(pro => {
            return {name: pro.nome};
          }) || []
        }
      />
      <ContentFluid>
        <HeaderProducts onPressWaiter={() => setIsModalWaiter(true)} />
        <ContentProducts>
          <ScrollView
            ref={scrollViewRef}
            onScroll={onScroll}
            scrollEventThrottle={16}
            style={{flex: 1}}>
            {products.data?.data.map(group => {
              if (group.produtos.length === 0) {
                return null;
              }
              return (
                <GroupItens
                  key={group.id}
                  title={group.nome}
                  onLayout={event =>
                    onGroupLayout(group.id, event.nativeEvent.layout)
                  }>
                  <View style={{gap: 16}}>
                    {group.produtos.map((product, i) => (
                      <CardProducts
                        onPressAdd={() => {
                          setSelectProduct(product);
                          setIndexProduct(i);
                          setIsModalProduct(true);
                        }}
                        key={product.nome}
                        image={product.imagem}
                        title={product.nome}
                        description={product.descricao}
                        price={product.preco}
                        discount={0}
                      />
                    ))}
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
          onProductFinish={p => handleAddCard(p, indexProduct)}
          indexProduct={indexProduct}
        />
      </Modal>
      <ModalCallWaiter isOpen={isModalWaiter} onClose={setIsModalWaiter} />
    </Container>
  );
};

export default Products;
