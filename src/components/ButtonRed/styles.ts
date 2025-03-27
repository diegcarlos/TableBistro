import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{block?: boolean}>`
  width: ${p => (p.block ? '100%' : '')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c83a2e;
  padding: 16px 26px 16px 26px;
  border-radius: 8px;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  font-family: 'Montserrat-Medium';
  color: #f9f9f9;
`;
