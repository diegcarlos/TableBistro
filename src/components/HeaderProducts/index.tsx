import React from 'react';
import MyAccount from '../../assets/svg/meyAccount.svg';
import MyCartIcon from '../../assets/svg/meyCart.svg';
import SearchIcon from '../../assets/svg/search.svg';
import WaiterIcon from '../../assets/svg/waiter.svg';
import {
  Container,
  MenuHeader,
  MenuItem,
  MenuItemBody,
  MenuItemText,
  MenuTouchable,
  TextMesa,
  TextNumMesa,
  ViewMesa,
} from './styles';

const itens = [
  {id: 1, name: 'Buscar', Icon: SearchIcon},
  {id: 2, name: 'Minha Conta', Icon: MyAccount},
  {id: 3, name: 'Chamar Garçom', Icon: WaiterIcon},
  {id: 4, name: 'Meu Carrinho', Icon: MyCartIcon},
];

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {useCart} from '../../context/CartContext';
import BarLoader from '../BarLoader';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  InsertTable: undefined;
  Products: undefined;
  Admin: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  onPressWaiter?: () => void;
  onPressWallet?: () => void;
  onPressShopCar?: () => void;
  loading?: boolean;
}

function HeaderProducts(props: Props) {
  const {onPressWaiter, onPressWallet, onPressShopCar, loading = false} = props;
  const {mesa} = useAuth();
  const {cartItems} = useCart();
  const navigation = useNavigation<NavigationProp>();
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const rotate = Animated.sequence([
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(rotateAnimation, {
        toValue: -1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]);

    const pulse = Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.3,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]);

    Animated.parallel([
      Animated.loop(rotate, {iterations: -1}),
      Animated.loop(pulse, {iterations: -1}),
    ]).start();
  }, [rotateAnimation, scaleAnimation]);

  const spin = rotateAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const handleLongPress = () => {
    navigation.replace('Admin');
  };

  const handlePressIn = () => {
    const timer = setTimeout(() => {
      handleLongPress();
    }, 3000); // 3 segundos
    setPressTimer(timer);
  };

  const handlePressOut = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  if (loading) {
    return (
      <Container>
        <BarLoader />
      </Container>
    );
  }

  return (
    <Container>
      <ViewMesa
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}>
        <TextMesa>Mesa: </TextMesa>
        <TextNumMesa>
          <TextMesa>{mesa?.mesa || '0'}</TextMesa>
        </TextNumMesa>
      </ViewMesa>
      <MenuHeader>
        {itens.map((item, i) => {
          const Icon = item.Icon;
          const isLast = i === itens.length - 1;
          return (
            <MenuItem key={item.id} isLast={isLast}>
              <MenuTouchable
                onPress={() => {
                  item.id === 4 && onPressShopCar?.();
                  item.id === 3 && onPressWaiter?.();
                  item.id === 2 && onPressWallet?.();
                }}>
                <MenuItemBody>
                  <Animated.View
                    style={[
                      isLast &&
                        cartItems.length > 0 && {
                          transform: [{rotate: spin}, {scale: scaleAnimation}],
                        },
                    ]}>
                    <Icon fill={!isLast ? '#C83A2E' : '#F9F9F9'} width={30} />
                  </Animated.View>
                  <MenuItemText>{item.name}</MenuItemText>
                </MenuItemBody>
              </MenuTouchable>
            </MenuItem>
          );
        })}
      </MenuHeader>
    </Container>
  );
}

export default HeaderProducts;
