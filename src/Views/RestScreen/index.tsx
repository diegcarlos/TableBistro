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
  const {user, mesa, settings} = useAuth();
  const handelPressNext = () => {
    if (user && mesa.idMesa) {
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
        <ImgLogo source={{uri: settings?.logo}} />
        <ScreenTop source={TopScreen} />
      </ScreenTopContainer>

      <Swiper autoplay autoplayTimeout={5} showsPagination={false}>
        {settings?.Banner?.map((banner, index) => (
          <StyledImage
            key={banner.id}
            source={{uri: banner.url}}
            resizeMode="cover"
          />
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
