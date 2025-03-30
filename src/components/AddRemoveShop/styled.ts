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

export const ComplementContent = styled.View`
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
export const BoxCount = styled.View`
  flex-direction: row;
  width: 100px;
  justify-content: space-between;
`;

export const TextCount = styled(TextMedium)`
  font-size: 20px;
  color: #4c4c4c;
`;

export const ComplementBoxText = styled.View`
  margin-left: 16px;
`;

export const ComplementText = styled(TextRegular)`
  font-size: 18px;
  color: #f9f9f9;
`;

export const ComplementTextValue = styled(TextRegular)`
  font-size: 14px;
  color: #bdbdbd;
`;
