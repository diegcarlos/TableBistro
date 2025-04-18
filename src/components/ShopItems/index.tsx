import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {CartItems} from '../../context/CartContext';
import {AddRemoveShop} from '../AddRemoveShop';
import {
  ComplementText,
  ComplementValue,
  ComplementsContainer,
  Container,
  ContainerContent,
  ContainerItem,
  ContainerScroll,
  DescriptionProduct,
  ImageProduct,
  ObservationText,
  PriceProduct,
  TitleProduct,
} from './styled';

interface Props {
  products: CartItems[];
  onUpdate?: (data: CartItems, index: number) => void;
  onTotalChange?: (total: number) => void;
}

export function ShopItems(props: Props) {
  const {products, onUpdate, onTotalChange} = props;

  const calculateTotalWithComplements = (product: CartItems) => {
    let total = product.price * product.quantity;

    if (product.selectedOptions) {
      Object.values(product.selectedOptions).forEach(options => {
        options.forEach(option => {
          if ('amount' in option && 'value' in option) {
            // Complementos múltiplos
            total += option.value * option.amount;
          } else if ('price' in option) {
            // Opções de seleção única (RadioOption)
            total += (option.price || 0) * product.quantity;
          }
        });
      });
    }

    return total;
  };

  React.useEffect(() => {
    const calculateTotalAllItems = () => {
      return products.reduce((total, product) => {
        return total + calculateTotalWithComplements(product);
      }, 0);
    };

    onTotalChange?.(calculateTotalAllItems());
  }, [products, onTotalChange]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <ContainerScroll
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          alwaysBounceVertical={true}
          nestedScrollEnabled={true}
          contentContainerStyle={{marginBottom: 16}}
          overScrollMode="never">
          {products.map((product, index) => (
            <ContainerItem key={product.name}>
              <ImageProduct src={product?.image} />
              <ContainerContent>
                <TitleProduct>{product?.name}</TitleProduct>
                <DescriptionProduct numberOfLines={1} ellipsizeMode="tail">
                  {product?.description}
                </DescriptionProduct>
                {product.observacao && (
                  <ObservationText>Obs: {product.observacao}</ObservationText>
                )}
                {product.selectedOptions && (
                  <ComplementsContainer>
                    {Object.values(product.selectedOptions).map(
                      (options, i) => (
                        <View key={i}>
                          {options.map((option, j) => {
                            if ('amount' in option) {
                              if ('value' in option && option.amount > 0) {
                                return (
                                  <View
                                    key={j}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <ComplementText>
                                      - {option.amount}x {option.name}
                                    </ComplementText>
                                    <ComplementValue>
                                      {(
                                        option.value * option.amount
                                      ).toLocaleString('pt-BR', {
                                        currency: 'BRL',
                                        style: 'currency',
                                      })}
                                    </ComplementValue>
                                  </View>
                                );
                              }
                            } else if ('text' in option && 'price' in option) {
                              return (
                                <View
                                  key={j}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <ComplementText>
                                    - {option.text}
                                  </ComplementText>
                                  {option.price && option.price > 0 && (
                                    <ComplementValue>
                                      {(
                                        option.price * product.quantity
                                      ).toLocaleString('pt-BR', {
                                        currency: 'BRL',
                                        style: 'currency',
                                      })}
                                    </ComplementValue>
                                  )}
                                </View>
                              );
                            }
                            return null;
                          })}
                        </View>
                      ),
                    )}
                  </ComplementsContainer>
                )}
                <PriceProduct>
                  {(calculateTotalWithComplements(product) || 0).toLocaleString(
                    'pt-BR',
                    {
                      currency: 'BRL',
                      style: 'currency',
                    },
                  )}
                </PriceProduct>
              </ContainerContent>
              <AddRemoveShop
                onChange={qtd => onUpdate?.({...product, quantity: qtd}, index)}
                value={product?.quantity}
              />
            </ContainerItem>
          ))}
        </ContainerScroll>
      </Container>
    </TouchableWithoutFeedback>
  );
}
