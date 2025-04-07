import React from 'react';
import {ButtonRed} from '../ButtonRed';
import {
  Container,
  DescriptionProduct,
  ImageProduct,
  PriceOriginal,
  PriceProduct,
  TitleProduct,
  Wrapper,
  WrapperPrice,
  WrapperPrices,
} from './styles';

interface CardProductsProps {
  image?: string;
  title: string;
  description?: string;
  price: number;
  priceDesconto?: number;
  discount: number;
  onPressAdd?: () => void;
}

const CardProducts = ({
  image,
  title,
  description,
  price,
  discount = 0,
  onPressAdd,
}: CardProductsProps) => {
  const valueDiscount = discount > 0 ? price - (price * discount) / 100 : price;
  return (
    <Container>
      <ImageProduct resizeMode="cover" source={{uri: image || '#'}} />
      <Wrapper>
        <TitleProduct>{title}</TitleProduct>
        <DescriptionProduct>{description}</DescriptionProduct>
        <WrapperPrice>
          <WrapperPrices>
            <PriceProduct desconto={discount > 0}>
              {valueDiscount?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </PriceProduct>
            {discount > 0 && (
              <PriceOriginal>
                {price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </PriceOriginal>
            )}
          </WrapperPrices>
          <ButtonRed onPress={() => onPressAdd?.()}>
            Adicionar ao carrinho
          </ButtonRed>
        </WrapperPrice>
      </Wrapper>
    </Container>
  );
};

export default CardProducts;
