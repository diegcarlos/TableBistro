import styled from 'styled-components/native';
import {TextMedium, TextRegular} from '../Text';

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: 24px;
`;

export const Title = styled(TextMedium)`
  font-size: 16px;
  color: #d1d1d1;
`;

export const RadioContent = styled.TouchableOpacity`
  width: 100%;
  height: 58px;
  gap: 4px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #3a3a3a;
  margin-bottom: 12px;
`;

export const Radio = styled.View<{check: boolean}>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(p: any) => (p.check ? '#161616' : '#d4d5d7')};
  border: 2.5px solid #a8a8a8;
`;

export const RadioText = styled(TextRegular)`
  font-size: 20px;
  color: #d1d1d1;
  margin-left: 16px;
`;
