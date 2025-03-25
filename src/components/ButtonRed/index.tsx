import React from 'react';
import {Container, TextButton} from './styles';

interface ButtonRedProps {
  title: string;
  onPress: () => void;
}

export function ButtonRed({title, onPress}: ButtonRedProps) {
  return (
    <Container onPress={onPress}>
      <TextButton>{title}</TextButton>
    </Container>
  );
}
