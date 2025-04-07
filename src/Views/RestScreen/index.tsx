import React, {useEffect} from 'react';
import {ImageSourcePropType} from 'react-native';
import Swiper from 'react-native-swiper';
import Logo from '../../assets/logoKukan.png';
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

// Imagens normais (PNG/JPG)
const images: ImageSourcePropType[] = [
  require('../../assets/screen.png'),
  require('../../assets/screen1.jpg'),
  require('../../assets/screen2.jpg'),
];

export function RestScreen({navigation}: {navigation: any}) {
  const {user, mesa} = useAuth();
  const handelPressNext = () => {
    if (user && mesa) {
      navigation.navigate('Products');
    } else {
      if (user) {
        navigation.navigate('InsertTable');
      } else {
        navigation.navigate('Login');
      }
    }
  };

  useEffect(() => {
    handelPressNext();
  }, []);

  return (
    <Container>
      <ScreenTopContainer>
        <ImgLogo source={Logo} />
        <ScreenTop source={TopScreen} />
      </ScreenTopContainer>

      <Swiper autoplay autoplayTimeout={5} showsPagination={false}>
        {images.map((image, index) => (
          <StyledImage key={image} source={image} resizeMode="cover" />
        ))}
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
