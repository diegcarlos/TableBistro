import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Container, TextButton} from './styles';

interface ButtonRedProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  block?: boolean;
}

export function ButtonRed({
  title,
  onPress,
  loading = false,
  block = false,
}: ButtonRedProps) {
  return (
    <Container
      block={block}
      onPress={loading ? undefined : onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <TextButton>{title}</TextButton>
      )}
    </Container>
  );
}
