import React from 'react';
import BarLoader from '../BarLoader';
import {Container} from './styles';

interface ContentProductsProps {
  children: React.ReactNode;
  loading?: boolean;
}

const ContentProducts = ({children, loading = false}: ContentProductsProps) => {
  return (
    <Container>
      {loading ? (
        <BarLoader
          size={50}
          color="#E11D48"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        children
      )}
    </Container>
  );
};

export default ContentProducts;
