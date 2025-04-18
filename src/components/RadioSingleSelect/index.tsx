import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {
  Container,
  Radio,
  RadioContent,
  RadioPrice,
  RadioText,
  RadioViewContent,
  Title,
} from './styled';

interface RadioSelectSingleProps {
  onChange?: (value: {id: number; text: string; price?: number}) => void;
  dataRadio: {
    title: string;
    data: {id: number; text: string; price?: number}[];
  };
  selectedOption?: {id: number; text: string; price?: number};
  onSelect?: (option: {id: number; text: string; price?: number}) => void;
}

export function RadioSelectSingle(props: RadioSelectSingleProps) {
  const {dataRadio, onChange, selectedOption, onSelect} = props;
  const [select, setSelect] = useState<number | null>(null);

  // Atualiza a seleção quando selectedOption muda externamente
  useEffect(() => {
    if (selectedOption) {
      setSelect(selectedOption.id);
    }
  }, [selectedOption]);

  useEffect(() => {
    return () => {
      setSelect(null);
    };
  }, []);

  const formatPrice = (price?: number) => {
    if (!price || price <= 0) return '';
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Container>
      <Title>{dataRadio?.title}</Title>
      {dataRadio?.data?.map(item => (
        <RadioContent
          key={item.id}
          onPress={() => {
            setSelect(item.id);
            onChange?.(item);
            onSelect?.(item);
          }}>
          <Radio check={select === item.id}>
            <Text style={{color: '#fff', fontSize: 16}}>
              {select === item.id ? '✓' : ''}
            </Text>
          </Radio>
          <RadioViewContent>
            <RadioText>{item.text}</RadioText>
            {formatPrice(item.price) && (
              <RadioPrice>{formatPrice(item.price)}</RadioPrice>
            )}
          </RadioViewContent>
        </RadioContent>
      ))}
    </Container>
  );
}
