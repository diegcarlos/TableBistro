import React from 'react';
import {Container, TextButton} from './styles';

interface ButtonRedProps {
  title: string;
}

export function ButtonRed({title}: ButtonRedProps) {
  return (
    <Container>
      <TextButton>{title}</TextButton>
    </Container>
  );
}
