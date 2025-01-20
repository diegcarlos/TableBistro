import React from 'react';
import {ImageSourcePropType} from 'react-native';
import Swiper from 'react-native-swiper';
import Logo from '../../assets/logoKukan.png';
import BottomScreen from '../../assets/screenBottom.png';
import TopScreen from '../../assets/screenTop.png';

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

// Imagens normais (PNG/JPG)
const images: ImageSourcePropType[] = [
  require('../../assets/screen.png'),
  require('../../assets/screen1.jpg'),
  require('../../assets/screen2.jpg'),
];

export function RestScreen({navigation}: {navigation: any}) {
  return (
    <Container>
      <ScreenTopContainer>
        <ImgLogo source={Logo} />
        <ScreenTop source={TopScreen} />
      </ScreenTopContainer>

      <Swiper autoplay autoplayTimeout={5} showsPagination={false}>
        {images.map((image, index) => (
          <StyledImage key={index} source={image} resizeMode="cover" />
        ))}
      </Swiper>

      <ScreenBottomContainer>
        <ScreenBottom source={BottomScreen} />
        <ButtonContainer onPress={() => navigation.navigate('Login')}>
          <ButtonText>Toque para continuar</ButtonText>
        </ButtonContainer>
      </ScreenBottomContainer>
    </Container>
  );
}
