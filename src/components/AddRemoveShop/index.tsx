import React from 'react';
import {TouchableOpacity} from 'react-native';
import Minus from '../../assets/svg/minus-white.svg';
import Plus from '../../assets/svg/plus-red.svg';
import {BoxCount, TextCount} from './styled';

interface Props {
  minValue?: number;
  maxValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  complements?: {amount: number; value: number; name: string}[];
}

export function AddRemoveShop(props: Props) {
  const {minValue = 0, maxValue = Infinity, value = 0, onChange} = props;
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
    <BoxCount>
      <TouchableOpacity onPress={handleDecrement}>
        <Minus width={26} height={26} />
      </TouchableOpacity>
      <TextCount>{value}</TextCount>
      <TouchableOpacity onPress={handleIncrement}>
        <Plus />
      </TouchableOpacity>
    </BoxCount>
  );
}
