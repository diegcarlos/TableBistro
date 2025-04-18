import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import BarLoader from '../BarLoader';
import {
  ButtonTextBold,
  ButtonTextMedium,
  ButtonTextRegular,
  Container,
} from './styles';

interface ButtonRedProps {
  children: React.ReactNode;
  onPress?: () => void;
  loading?: boolean;
  block?: boolean;
  fontWeight?: 'regular' | 'bold' | 'medium';
  style?: StyleProp<ViewStyle>;
}

export const ButtonText = (
  fontWeight: 'regular' | 'bold' | 'medium',
  children: React.ReactNode,
) => {
  switch (fontWeight) {
    case 'regular':
      return <ButtonTextRegular>{children}</ButtonTextRegular>;
    case 'bold':
      return <ButtonTextBold>{children}</ButtonTextBold>;

    case 'medium':
      return <ButtonTextMedium>{children}</ButtonTextMedium>;

    default:
      return <ButtonTextMedium>{children}</ButtonTextMedium>;
  }
};

export function ButtonRed({
  children,
  onPress,
  loading = false,
  block = false,
  fontWeight = 'medium',
  style,
}: ButtonRedProps) {
  return (
    <Container
      style={style}
      block={block}
      onPress={loading ? undefined : onPress}
      disabled={loading}>
      {loading ? (
        <BarLoader color="#FFFFFF" size={20} style={{margin: 0}} />
      ) : (
        ButtonText(fontWeight, children)
      )}
    </Container>
  );
}
