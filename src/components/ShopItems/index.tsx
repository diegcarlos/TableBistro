import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {CartItems} from '../../context/CartContext';
import {AddRemoveShop} from '../AddRemoveShop';
import {
  Container,
  ContainerContent,
  ContainerItem,
  ContainerScroll,
  DescriptionProduct,
  ImageProduct,
  PriceProduct,
  TitleProduct,
} from './styled';

interface Props {
  products: CartItems[];
  onUpdate?: (data: CartItems, index: number) => void;
}

export function ShopItems(props: Props) {
  const {products, onUpdate} = props;

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
                <PriceProduct>
                  {product?.price.toLocaleString('pt-BR', {
                    currency: 'BRL',
                    style: 'currency',
                  })}
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
