import React from 'react';
import {TouchableOpacity} from 'react-native';
import Minus from '../../assets/svg/minus-white.svg';
import Plus from '../../assets/svg/plus-dark.svg';
import {
  BoxCount,
  ComplementBoxText,
  ComplementContent,
  ComplementText,
  ComplementTextValue,
  Container,
  TextCount,
  Title,
} from './styled';

interface Props {
  minValue?: number;
  maxValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  title: string;
  complements?: {amount: number; value: number; name: string}[];
}

export function Complements(props: Props) {
  const {
    minValue = 0,
    maxValue = 0,
    value = 0,
    onChange,
    complements,
    title,
  } = props;
  const handleDecrement = () => {
    if (value > minValue) {
      onChange?.(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < maxValue) {
      onChange?.(value + 1);
    }
  };
  return (
    <Container>
      <Title>{title}</Title>
      {complements?.map(item => {
        return (
          <ComplementContent key={item.name}>
            <BoxCount>
              <TouchableOpacity>
                <Minus />
              </TouchableOpacity>
              <TextCount>{item.amount}</TextCount>
              <TouchableOpacity>
                <Plus />
              </TouchableOpacity>
            </BoxCount>
            <ComplementBoxText>
              <ComplementText>{item.name}</ComplementText>
              <ComplementTextValue>
                +{' '}
                {item.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </ComplementTextValue>
            </ComplementBoxText>
          </ComplementContent>
        );
      })}
    </Container>
  );
}
