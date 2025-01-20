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
} from './styles';

const itens = [
  {id: 1, name: 'Buscar', Icon: SearchIcon},
  {id: 2, name: 'Minha Conta', Icon: MyAccount},
  {id: 3, name: 'Chamar Garçom', Icon: WaiterIcon},
  {id: 4, name: 'Meu Carrinho', Icon: MyCartIcon},
];

import {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

function HeaderProducts() {
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

  return (
    <Container>
      <MenuHeader>
        {itens.map((item, i) => {
          const Icon = item.Icon;
          const isLast = i === itens.length - 1;
          return (
            <MenuItem key={item.id} isLast={isLast}>
              <MenuTouchable>
                <MenuItemBody>
                  <Animated.View
                    style={[
                      isLast && {
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
