import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CheckSteps from '../../assets/svg/checkSteps.svg';
import {ButtonRed} from '../../components/ButtonRed';
import {PriceProduct} from '../../components/CardProducts/styles';
import {useAuth} from '../../context/AuthContext';
import {CartItems} from '../../context/CartContext';
import {Category, Product as TypesProduct} from '../../types/products';
import AddRemove from '../AddRemove';
import {Complements} from '../Complement';
import {RadioSelectSingle} from '../RadioSingleSelect';
import Tooltip, {useTooltip} from '../Toltip';
import {
  Complement,
  ComplementContent,
  ComplementFooter,
  Container,
  DescriptionProduct,
  ImageProduct,
  ObservationInput,
  Pen,
  Steps,
  StepsContainer,
  StepsOptions,
  StepsOptionsContent,
  StepsOptionsIcon,
  StepsOptionsIconText,
  SubTotal,
  SubtotalText,
  TitleProduct,
  ValidationError,
  ValidationErrorText,
  ViewProduct,
} from './styled';

interface Props {
  product: TypesProduct;
  category?: Category;
  onRefresh?: () => void;
  indexProduct: number | null;
  onProductFinish?: (carItems: CartItems, index: number) => void;
}

export function Product(props: Props) {
  const {product, onProductFinish, indexProduct, category, onRefresh} = props;
  const {user} = useAuth();
  const [qtd, setQtd] = useState(1);
  const [observacao, setObservacao] = useState('');
  const [stepSelect, setStepSelect] = useState(0);
  const {showTooltip, visible, hideTooltip, text} = useTooltip();
  const stepsScrollRef = useRef<ScrollView>(null);
  const stepRefs = useRef<{[key: string]: View}>({});

  // Interfaces para as opções selecionadas
  interface RadioOption {
    id: number;
    text: string;
    price?: number;
  }

  interface ComplementOption {
    id: string;
    name: string;
    value: number;
    amount: number;
  }

  type SelectedOption = RadioOption | ComplementOption;

  // Add state to track selected options for each adicional
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: SelectedOption[];
  }>({});
  // Add state for validation error message
  const [validationError, setValidationError] = useState<string | null>(null);

  interface DataStep {
    active: boolean;
    text: string;
    type: string;
    adicionalId?: string;
    id: string;
  }

  const [dataSteps, setDataSteps] = useState<DataStep[]>([
    {
      active: false,
      type: 'qtd',
      text: 'Quantidade Opcional',
      id: 'step-qtd',
    },
    {
      active: false,
      type: 'obs',
      text: 'Observação',
      id: 'step-obs',
    },
  ]);

  const handlePressSteps = (index: number) => {
    if (index > stepSelect) {
      const currentStep = dataSteps[stepSelect];

      if (currentStep?.adicionalId) {
        const adicional = category?.adicionais?.find(
          a => a.id === currentStep.adicionalId,
        );

        if (adicional) {
          const totalSelectedItems = Object.values(selectedOptions).reduce(
            (total, options) => {
              return (
                total +
                options.reduce((sum, option) => {
                  if ('amount' in option) {
                    return sum + option.amount;
                  }
                  return sum + 1;
                }, 0)
              );
            },
            0,
          );

          if (totalSelectedItems > 10) {
            showTooltip(
              'Você pode selecionar no máximo 10 itens no total de todos os adicionais',
            );
            return;
          }

          const selectedCount =
            selectedOptions[adicional.id]?.reduce((total, option) => {
              if ('amount' in option) {
                return total + option.amount;
              }
              return total + 1;
            }, 0) || 0;

          if (selectedCount < adicional.qtdMinima) {
            showTooltip(
              `Selecione pelo menos ${adicional.qtdMinima} opção(ões) de "${adicional.titulo}"`,
            );
            return;
          }
        }
      }
    }

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

      // Scroll para o step selecionado
      const stepId = dataSteps[index].id;
      const stepRef = stepRefs.current[stepId];
      if (stepRef) {
        stepRef.measureLayout(
          stepsScrollRef.current as any,
          (x: number, y: number) => {
            stepsScrollRef.current?.scrollTo({
              y: y - 100, // Ajuste para mostrar um pouco acima do step
              animated: true,
            });
          },
          () => {},
        );
      }
    }

    if (index > dataSteps.length - 1) {
      onProductFinish?.(
        {
          id: product.id,
          name: product.nome,
          externoId: product.externoId,
          image: product.imagem,
          description: product.descricao,
          categoriaId: product.categoriaId,
          price: product.preco,
          quantity: qtd,
          total: product.preco * qtd,
          observacao: observacao,
          // Include selected options in the cart item
          selectedOptions: selectedOptions,
        },
        indexProduct as number,
      );
    }
  };

  // Handler for radio selection (single option)
  const handleRadioSelect = (
    adicionalId: string,
    selectedOption: RadioOption,
  ) => {
    setSelectedOptions(prev => ({
      ...prev,
      [adicionalId]: [
        {
          ...selectedOption,
          price: selectedOption.price || 0,
        },
      ],
    }));
    setValidationError(null);
  };

  // Função para calcular o total de itens selecionados
  const getTotalSelectedItems = () => {
    return Object.values(selectedOptions).reduce((total, options) => {
      return (
        total +
        options.reduce((sum, option) => {
          if ('amount' in option) {
            return sum + option.amount;
          }
          return sum + 1;
        }, 0)
      );
    }, 0);
  };

  // Handler para complement selection (multiple options)
  const handleComplementSelect = (
    adicionalId: string,
    options: ComplementOption[],
  ) => {
    const currentTotal = getTotalSelectedItems();
    const newOptions = options.filter(opt => opt.amount > 0);
    const newItemsCount = newOptions.reduce((sum, opt) => sum + opt.amount, 0);
    const existingItemsCount =
      selectedOptions[adicionalId]?.reduce((sum, opt) => {
        if ('amount' in opt) {
          return sum + opt.amount;
        }
        return sum + 1;
      }, 0) || 0;

    // Verifica se a adição não excederá o limite máximo
    if (currentTotal - existingItemsCount + newItemsCount > 10) {
      setValidationError(
        'Você pode selecionar no máximo 10 itens no total de todos os adicionais',
      );
      return;
    }

    setSelectedOptions(prev => ({
      ...prev,
      [adicionalId]: newOptions,
    }));
    setValidationError(null);
  };

  // Função para formatar texto em lowercase com primeira letra maiúscula
  const formatText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  useEffect(() => {
    // Criar steps dinâmicos baseados nos adicionais da categoria
    if (category?.adicionais && category.adicionais.length > 0) {
      const dynamicSteps: DataStep[] = category.adicionais.map(
        (adicional, index) => ({
          active: false,
          text: formatText(adicional.titulo),
          type:
            adicional.qtdMinima === 1 && adicional.qtdMaxima === 1
              ? 'single'
              : 'comp',
          adicionalId: adicional.id,
          id: `step-${index}-${adicional.id}`,
        }),
      );

      // Adicionar steps fixos ao final
      const allSteps = [
        ...dynamicSteps,
        {
          active: false,
          type: 'qtd',
          text: formatText('Quantidade'),
          id: 'step-qtd',
        },
        {
          active: false,
          type: 'obs',
          text: formatText('Observação'),
          id: 'step-obs',
        },
      ];

      setDataSteps(allSteps);
    } else {
      // Caso não tenha adicionais, manter apenas os steps fixos
      setDataSteps([
        {
          active: false,
          type: 'qtd',
          text: formatText('Quantidade'),
          id: 'step-qtd',
        },
        {
          active: false,
          type: 'obs',
          text: formatText('Observação'),
          id: 'step-obs',
        },
      ]);
    }

    // Resetar estados apenas quando o produto ou categoria mudar
    setQtd(1);
    setStepSelect(0);
    setSelectedOptions({});
    setObservacao('');

    return () => {
      setQtd(1);
      setStepSelect(0);
      setDataSteps([]);
      setSelectedOptions({});
      setObservacao('');
    };
  }, [category, product]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        {visible && <Tooltip text={text} onClose={hideTooltip} />}
        <ViewProduct>
          <ImageProduct src={product?.imagem} />
          <TitleProduct>{product?.nome}</TitleProduct>
          <DescriptionProduct>{product?.descricao}</DescriptionProduct>
          <StepsContainer>
            <Steps
              ref={stepsScrollRef}
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={true}
              scrollEventThrottle={16}
              alwaysBounceVertical={true}
              nestedScrollEnabled={true}
              overScrollMode="never">
              {dataSteps.map((dataStep, index) => (
                <StepsOptions
                  ref={(ref: View) => {
                    if (ref) {
                      stepRefs.current[dataStep.id] = ref;
                    }
                  }}
                  onPress={() => handlePressSteps(index)}
                  key={dataStep.id}
                  active={stepSelect === index}>
                  <StepsOptionsContent>
                    {dataStep.active ? (
                      <CheckSteps />
                    ) : (
                      <StepsOptionsIcon>
                        <StepsOptionsIconText>{index + 1}</StepsOptionsIconText>
                      </StepsOptionsIcon>
                    )}

                    <Text
                      style={{
                        color: '#bdbdbd',
                        fontSize: 20,
                        marginLeft: 8,
                        flex: 1,
                        maxWidth: '80%',
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {dataStep.text}
                    </Text>
                  </StepsOptionsContent>
                  {dataStep.active && <Pen />}
                </StepsOptions>
              ))}
            </Steps>
          </StepsContainer>
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
            {/* Show validation error if exists */}
            {validationError && (
              <ValidationError>
                <ValidationErrorText>{validationError}</ValidationErrorText>
              </ValidationError>
            )}

            {stepSelect < dataSteps.length && (
              <>
                {/* Renderização para steps dinâmicos (adicionais da categoria) */}
                {category?.adicionais?.map(adicional => {
                  // Encontrar o step atual nos dataSteps para verificar se é o mesmo adicional
                  const currentStep = dataSteps[stepSelect];
                  const isCurrentAdicional =
                    currentStep?.adicionalId === adicional.id;

                  if (!isCurrentAdicional) {
                    return null;
                  }

                  if (adicional.qtdMinima === 1 && adicional.qtdMaxima === 1) {
                    return (
                      <RadioSelectSingle
                        key={adicional.id}
                        dataRadio={{
                          title: `${adicional.titulo} ${
                            adicional.qtdMinima > 0
                              ? '(Obrigatório)'
                              : '(Opcional)'
                          }`,
                          data: adicional.opcoes.map((op, i) => ({
                            id: i,
                            text: op.nome,
                            price: op.preco,
                          })),
                        }}
                        onSelect={option =>
                          handleRadioSelect(adicional.id, option)
                        }
                        selectedOption={
                          selectedOptions[adicional.id]?.[0] as RadioOption
                        }
                      />
                    );
                  } else {
                    return (
                      <Complements
                        key={adicional.id}
                        title={`${adicional.titulo} ${
                          adicional.qtdMinima > 0
                            ? `(Obrigatório)`
                            : '(Opcional)'
                        }`}
                        complements={adicional.opcoes.map(op => {
                          const existingOption = selectedOptions[
                            adicional.id
                          ]?.find(
                            item => 'name' in item && item.name === op.nome,
                          ) as ComplementOption | undefined;
                          return {
                            name: op.nome,
                            value: op.preco,
                            amount: existingOption ? existingOption.amount : 0,
                            id: op.id,
                          };
                        })}
                        onChange={options =>
                          handleComplementSelect(adicional.id, options)
                        }
                        initialValues={
                          (selectedOptions[adicional.id]?.filter(
                            option =>
                              'amount' in option &&
                              'value' in option &&
                              'name' in option,
                          ) as ComplementOption[]) || []
                        }
                        maxTotalItems={adicional.qtdMaxima}
                        currentTotalItems={getTotalSelectedItems()}
                        minValue={adicional.qtdMinima}
                        maxValue={adicional.qtdMaxima}
                      />
                    );
                  }
                })}

                {/* Renderização para steps fixos */}
                {dataSteps[stepSelect]?.type === 'qtd' && (
                  <View key="qtd" style={{width: '100%'}}>
                    <AddRemove
                      value={qtd}
                      onChange={qtd => {
                        setQtd(qtd);
                      }}
                      minValue={1}
                    />
                  </View>
                )}

                {dataSteps[stepSelect]?.type === 'obs' && (
                  <View key="obs" style={{width: '100%'}}>
                    <ObservationInput
                      placeholder="Digite sua observação aqui..."
                      placeholderTextColor="#808080"
                      multiline={true}
                      numberOfLines={5}
                      value={observacao}
                      onChangeText={(text: string) => setObservacao(text)}
                    />
                  </View>
                )}
              </>
            )}
          </ComplementContent>
          <ComplementFooter>
            <ButtonRed
              onPress={() => handlePressSteps(stepSelect + 1)}
              fontWeight="bold">
              <Text>
                {stepSelect === dataSteps.length - 1 ? 'Finalizar' : 'Próximo'}
              </Text>
            </ButtonRed>
          </ComplementFooter>
        </Complement>
      </Container>
    </TouchableWithoutFeedback>
  );
}
