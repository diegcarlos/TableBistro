import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import Swiper from 'react-native-swiper';
import BottomScreen from '../../assets/screenBottom.png';
import TopScreen from '../../assets/screenTop.png';

import {useAuth} from '../../context/AuthContext';
import {
  ButtonContainer,
  ButtonText,
  Container,
  ImgLogo,
  ScreenBottom,
  ScreenBottomContainer,
  ScreenTop,
  ScreenTopContainer,
  StyledImage,
} from './styles';

export function RestScreen({navigation}: {navigation: any}) {
  const {settings} = useAuth();

  const handelPressNext = () => {
    navigation.navigate('Products');
  };

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Verificar se existe um usuário salvo no AsyncStorage
      const userStored = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('access-token');

      if (userStored && token) {
        // Usuário já está logado, verificar se tem mesa selecionada
        const mesaStored = await AsyncStorage.getItem('mesa');

        if (mesaStored) {
          // Tem mesa selecionada, mas permanece na Home em vez de ir para Products
          // Não redireciona automaticamente
        } else {
          // Não tem mesa selecionada, ir para InsertTable
          navigation.replace('InsertTable');
        }
      } else {
        // Não redireciona automaticamente para o login
        navigation.replace('Login');
      }
    };

    checkAuthAndRedirect();
  }, []);

  return (
    <Container>
      <ScreenTopContainer>
        <ImgLogo source={{uri: settings.data?.data.logo}} />
        <ScreenTop source={TopScreen} />
      </ScreenTopContainer>

      <Swiper autoplay autoplayTimeout={5} showsPagination={false}>
        {settings?.data?.data?.Banner.map((banner, index) => (
          <StyledImage
            key={banner?.id}
            source={{uri: banner?.url}}
            resizeMode="cover"
          />
        )) || []}
      </Swiper>

      <ScreenBottomContainer>
        <ScreenBottom source={BottomScreen} />
        <ButtonContainer onPress={handelPressNext}>
          <ButtonText>Toque para continuar</ButtonText>
        </ButtonContainer>
      </ScreenBottomContainer>
    </Container>
  );
}
