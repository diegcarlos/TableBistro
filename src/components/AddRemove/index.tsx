import React from 'react';
import Minus from '../../assets/svg/minus.svg';
import Plus from '../../assets/svg/plus.svg';
import {Button, ButtonText, Container, CountText} from './styled';

interface AddRemoveProps {
  value?: number;
  onChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
}

const AddRemove: React.FC<AddRemoveProps> = ({
  value = 0,
  onChange,
  minValue = 0,
  maxValue = Infinity,
}) => {
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
      <Button onPress={handleDecrement} disabled={value <= minValue}>
        <ButtonText>
          <Minus />
        </ButtonText>
      </Button>

      <CountText>{value}</CountText>

      <Button onPress={handleIncrement} disabled={value >= maxValue} add>
        <ButtonText add>
          <Plus />
        </ButtonText>
      </Button>
    </Container>
  );
};

export default AddRemove;
