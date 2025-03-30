import styled from 'styled-components/native';
import {TextMedium} from '../Text';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TitleWater = styled(TextMedium)`
  font-size: 28px;
  color: #f9f9f9;
`;

export const TitleWaterDescription = styled(TextMedium)`
  width: 600px;
  text-align: center;
  font-size: 16px;
  color: #d1d1d1;
`;

export const BoxButtons = styled.View`
  flex-direction: row;
  overflow: hidden;
  gap: 12px;
  width: 600px;
  margin-top: 60px;
  justify-content: space-between;
`;
