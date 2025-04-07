import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import CheckSteps from '../../assets/svg/checkSteps.svg';
import {ButtonRed} from '../../components/ButtonRed';
import {PriceProduct} from '../../components/CardProducts/styles';
import {CartItems} from '../../context/CartContext';
import {Product as TypesProduct} from '../../types/products';
import AddRemove from '../AddRemove';
import {Complements} from '../Complement';
import {RadioSelectSingle} from '../RadioSingleSelect';
import {
  Complement,
  ComplementContent,
  ComplementFooter,
  Container,
  DescriptionProduct,
  ImageProduct,
  Pen,
  Steps,
  StepsOptions,
  StepsOptionsContent,
  StepsOptionsIcon,
  StepsOptionsIconText,
  StepsOptionsText,
  SubTotal,
  SubtotalText,
  TitleProduct,
  ViewProduct,
} from './styled';

interface Props {
  product: TypesProduct;
  indexProduct: number | null;
  onProductFinish?: (carItems: CartItems, index: number) => void;
}

export function Product(props: Props) {
  const {product, onProductFinish, indexProduct} = props;
  const [qtd, setQtd] = useState(1);
  const [stepSelect, setStepSelect] = useState(0);
  const [dataRadio, setDataRadio] = useState({
    title: 'Como deseja o ponto da sua carne?',
    data: [
      {id: 1, text: 'Mal Passada'},
      {id: 2, text: 'Ao Ponto'},
      {id: 3, text: 'Bem Passada'},
    ],
  });
  const [dataComplement, setDataComplement] = useState({
    title: 'Como deseja o ponto da sua carne?',
    data: [
      {amount: 0, value: 4.0, name: 'Molho dom'},
      {amount: 0, value: 5.0, name: '1 Faria Mussarela'},
      {amount: 0, value: 5.0, name: 'Bacon'},
      {amount: 0, value: 18.0, name: 'Burger'},
      {amount: 0, value: 5.0, name: 'Cheddar'},
      {amount: 0, value: 4.0, name: 'Ovo'},
    ],
  });
  const [dataSteps, setDataSteps] = useState([
    {
      active: false,
      text: 'Ponto da Carne',
      type: 'single',
    },
    {
      active: false,
      text: 'Vamos turbinar?',
      type: 'comp',
    },
    {
      active: false,
      type: 'qtd',
      text: 'Quantidade Opcional',
    },
  ]);

  const handlePressSteps = (index: number) => {
    const newDataSteps = dataSteps.map((dataStep, indexStep) => {
      if (indexStep < index) {
        return {...dataStep, active: true};
      } else {
        return {...dataStep, active: false};
      }
    });
    if (index <= dataSteps.length - 1) {
      setStepSelect(index);
      setDataSteps(newDataSteps);
    }
    if (index > dataSteps.length - 1) {
      onProductFinish?.(
        {
          name: product.nome,
          image: product.imagem,
          description: product.descricao,
          categoriaId: product.categoriaId,
          price: product.preco,
          quantity: qtd,
          total: product.preco * qtd,
        },
        indexProduct as number,
      );
    }
  };

  useEffect(() => {
    return () => {
      setQtd(1);
      setStepSelect(0);
      setDataSteps([]);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <ViewProduct>
          <ImageProduct src={product?.imagem} />
          <TitleProduct>{product?.nome}</TitleProduct>
          <DescriptionProduct>{product?.descricao}</DescriptionProduct>
          <View style={{flex: 1, width: '100%', position: 'relative'}}>
            <Steps
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={true}
              scrollEventThrottle={16}
              alwaysBounceVertical={true}
              nestedScrollEnabled={true}
              overScrollMode="never">
              {dataSteps.map((dataStep, index) => (
                <StepsOptions
                  onPress={() => handlePressSteps(index)}
                  key={dataStep.type}
                  active={stepSelect === index}>
                  <StepsOptionsContent>
                    {dataStep.active ? (
                      <CheckSteps />
                    ) : (
                      <StepsOptionsIcon>
                        <StepsOptionsIconText>{index + 1}</StepsOptionsIconText>
                      </StepsOptionsIcon>
                    )}

                    <StepsOptionsText>{dataStep.text}</StepsOptionsText>
                  </StepsOptionsContent>
                  {dataStep.active && <Pen />}
                </StepsOptions>
              ))}
            </Steps>
          </View>
          <SubTotal>
            <SubtotalText>Subtotal</SubtotalText>
            <PriceProduct>
              {product?.preco.toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </PriceProduct>
          </SubTotal>
        </ViewProduct>
        <Complement>
          <ComplementContent>
            {dataSteps?.map((st, index) => {
              if (st.type === 'single' && stepSelect === index) {
                return <RadioSelectSingle key={index} dataRadio={dataRadio} />;
              } else if (st.type === 'comp' && stepSelect === index) {
                return (
                  <Complements
                    key={st.type}
                    title={dataComplement.title}
                    complements={dataComplement.data}
                  />
                );
              } else if (st.type === 'qtd' && stepSelect === index) {
                return (
                  <AddRemove
                    key={st.type}
                    value={qtd}
                    onChange={setQtd}
                    minValue={1}
                  />
                );
              }
            })}
          </ComplementContent>
          <ComplementFooter>
            <ButtonRed
              onPress={() => handlePressSteps(stepSelect + 1)}
              fontWeight="bold">
              Próximo
            </ButtonRed>
          </ComplementFooter>
        </Complement>
      </Container>
    </TouchableWithoutFeedback>
  );
}
