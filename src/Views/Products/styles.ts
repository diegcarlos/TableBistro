import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
const d = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  width: ${d.width}px;
  background-color: #181818;
`;

export const ContentFluid = styled.View`
  width: 100%;
  flex-direction: column;
  height: ${d.height}px;
`;
