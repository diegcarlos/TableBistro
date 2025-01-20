import React from 'react';
import {Container} from './styles';

interface ContentProductsProps {
  children: React.ReactNode;
}

const ContentProducts = ({children}: ContentProductsProps) => {
  return <Container>{children}</Container>;
};

export default ContentProducts;
