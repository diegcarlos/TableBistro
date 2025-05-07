import React from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Container, ContainerTitle, Content, Title} from './styles';

interface GroupItemsProps {
  children?: React.ReactNode;
  title: string;
  onLayout?: (event: LayoutChangeEvent) => void;
  active?: boolean;
}

export function GroupItens({
  children,
  title,
  onLayout,
  active,
}: GroupItemsProps) {
  return (
    <Container active={active} onLayout={onLayout}>
      <ContainerTitle>
        <Title>{title}</Title>
      </ContainerTitle>
      <Content>{children}</Content>
    </Container>
  );
}
