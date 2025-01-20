import React from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Container, ContainerTitle, Content, Title} from './styles';

interface GroupItensProps {
  children?: React.ReactNode;
  title: string;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export function GroupItens({children, title, onLayout}: GroupItensProps) {
  return (
    <Container onLayout={onLayout}>
      <ContainerTitle>
        <Title>{title}</Title>
      </ContainerTitle>
      <Content>{children}</Content>
    </Container>
  );
}
