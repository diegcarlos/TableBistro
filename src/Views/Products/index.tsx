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
import NavProducts from '../../components/NavProducts';
import {useAuth} from '../../context/AuthContext';
import {useCart} from '../../context/CartContext';
import api from '../../http/api';
import {Container, ContentFluid} from './styles';

interface Group {
  id: number;
  name: string;
  products: Product[];
}

interface Product {
  name: string;
  image: any;
  description?: string;
  price: number;
  discount: number;
}

export interface Category {
  id: string;
  nome: string;
  imagem: string;
  cor: string;
  ordem: number;
  temPromocao: boolean;
  externoId: any;
  restaurantCnpj: string;
  delete: boolean;
  createAt: string;
  updateAt: any;
  produtos: Produto[];
  impressoras: any[];
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  categoriaId: string;
  externoId: any;
  codigo: any;
  restaurantCnpj: string;
  delete: boolean;
  createAt: string;
  updateAt: any;
}

const Groups: Group[] = [
  {
    id: 1,
    name: 'Os mais pedidos',
    products: [
      {
        name: 'Nordestino - burguer',
        image: require('../../assets/images/burger1.png'),
        description:
          'Pão brioche, salada, suculento hambúrguer 200g, queijo coalho em volto com bacon artesanal, melaço.',
        price: 59.0,
        discount: 10,
      },
      {
        name: 'Mineiro - burguer',
        image: require('../../assets/images/burger2.png'),
        description:
          'Pão brioche, salada, suculento hambúrguer 200g, queijo canastra maçaricado, melaço, crispy.',
        price: 46.4,
        discount: 0,
      },
      {
        name: 'Trash - burguer',
        image: require('../../assets/images/burger3.png'),
        description:
          'Pão brioche, salada, suculento hambúrguer 200g, queijo canastra maçaricado, melaço, crispy.',
        price: 53.4,
        discount: 0,
      },
      {
        name: 'Nº 4 - burguer',
        image: require('../../assets/images/burger4.png'),
        description:
          'Pão brioche, salada, suculento hambúrguer 200g, queijo canastra maçaricado, melaço, crispy.',
        price: 53.4,
        discount: 0,
      },
    ],
  },
  {id: 2, name: 'Burguers', products: []},
  {
    id: 3,
    name: 'Porções',
    products: [
      {
        name: 'Porção de Batata',
        image: require('../../assets/images/batata.webp'),
        price: 15.9,
        discount: 0,
      },
      {
        name: 'Porção de Calabresa',
        description: 'Imagem meramente ilustrativa',
        image: require('../../assets/images/p_calabresa.webp'),
        price: 25.0,
        discount: 0,
      },
      {
        name: 'Porção de File',
        description: 'Imagem meramente ilustrativa',
        image: require('../../assets/images/p_file.jpg'),
        price: 38.0,
        discount: 10,
      },
      {
        name: 'Porção de Peixe',
        description: 'Imagem meramente ilustrativa',
        image: require('../../assets/images/p_peixe.jpeg'),
        price: 30.0,
        discount: 0,
      },
    ],
  },
  {id: 4, name: 'Milkshakes', products: []},
  {
    id: 5,
    name: 'Bebidas',
    products: [
      {
        name: 'Coca-Cola',
        image: require('../../assets/images/coca.jpg'),
        price: 6.8,
        discount: 0,
      },
      {
        name: 'Guaraná',
        image: require('../../assets/images/guarana.jpg'),
        price: 5.5,
        discount: 0,
      },
    ],
  },
  {id: 6, name: 'Cervejas', products: []},
  {id: 7, name: 'Sucos', products: []},
];

const Products = () => {
  const {setIsCartOpen} = useCart();
  const {user} = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const groupLayouts = useRef<{[key: string]: LayoutRectangle}>({});
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const scrollToGroup = (index: number) => {
    const group = Groups[index];
    if (group && scrollViewRef.current && groupLayouts.current[group.id]) {
      const layout = groupLayouts.current[group.id];

      scrollViewRef.current.scrollTo({
        y: Math.max(0, layout.y),
        animated: true,
      });
    }
  };
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

  console.log(JSON.stringify(products.data?.data[0], null, 2));

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = event.nativeEvent.contentOffset.y;

      const visibleGroups = Groups.filter(g => g.products.length > 0);
      let closestGroup = 0;
      let minDistance = Number.MAX_VALUE;

      visibleGroups.forEach((group, index) => {
        const layout = groupLayouts.current[group.id];
        if (layout) {
          const distance = Math.abs(layout.y - scrollY);
          if (distance < minDistance) {
            minDistance = distance;
            closestGroup = index;
          }
        }
      });

      setActiveGroupIndex(
        Groups.findIndex(g => g.id === visibleGroups[closestGroup].id),
      );
    },
    [],
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
        <HeaderProducts />
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
                    {group.produtos.map(product => (
                      <CardProducts
                        onPressAdd={() => {
                          setIsCartOpen(true);
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
    </Container>
  );
};

export default Products;
