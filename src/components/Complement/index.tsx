import React, {useEffect, useState} from 'react';
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

interface ComplementItem {
  id: string;
  amount: number;
  value: number;
  name: string;
}

interface Props {
  minValue?: number;
  maxValue?: number;
  title: string;
  complements?: ComplementItem[];
  onChange?: (complements: ComplementItem[]) => void;
  initialValues?: ComplementItem[];
  maxTotalItems?: number;
  currentTotalItems?: number;
}

export function Complements(props: Props) {
  const {
    minValue = 0,
    maxValue = 10,
    onChange,
    complements: initialComplements,
    title,
    initialValues = [],
    maxTotalItems = 10,
  } = props;

  const [complements, setComplements] = useState<ComplementItem[]>([]);

  // Calcula o total atual de itens
  const getCurrentTotal = () => {
    return complements.reduce((total, item) => total + item.amount, 0);
  };

  useEffect(() => {
    if (initialComplements) {
      const mergedComplements = initialComplements.map(comp => {
        const initialValue = initialValues.find(val => val.name === comp.name);
        return initialValue || comp;
      });
      setComplements(mergedComplements);
    }
  }, [initialComplements, initialValues]);

  const updateComplementAmount = (name: string, newAmount: number) => {
    const currentItem = complements.find(comp => comp.name === name);
    if (!currentItem) {
      return;
    }

    const totalWithoutCurrentItem = getCurrentTotal() - currentItem.amount;
    const totalAfterUpdate = totalWithoutCurrentItem + newAmount;

    if (totalAfterUpdate > maxTotalItems) {
      return;
    }

    if (newAmount > maxValue) {
      return;
    }

    const updatedComplements = complements.map(comp => {
      if (comp.name === name) {
        return {...comp, amount: newAmount};
      }
      return comp;
    });

    setComplements(updatedComplements);
    onChange?.(updatedComplements);
  };

  return (
    <Container>
      <Title>
        {title} (Mín: {minValue}, Máx: {maxValue})
      </Title>
      {complements.map(item => {
        return (
          <ComplementContent key={item.name}>
            <BoxCount>
              <TouchableOpacity
                onPress={() => {
                  if (item.amount > minValue) {
                    updateComplementAmount(item.name, item.amount - 1);
                  }
                }}>
                <Minus />
              </TouchableOpacity>
              <TextCount>{item.amount}</TextCount>
              <TouchableOpacity
                onPress={() => {
                  const remainingItems =
                    maxTotalItems - (getCurrentTotal() - item.amount);
                  const canAddMore =
                    item.amount < maxValue && remainingItems > 0;

                  if (canAddMore) {
                    updateComplementAmount(item.name, item.amount + 1);
                  }
                }}>
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
