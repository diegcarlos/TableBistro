import styled from 'styled-components/native';
import {TextBold, TextMedium, TextRegular} from '../Text';

export const Container = styled.TouchableOpacity<{block?: boolean}>`
  width: ${(p: any) => (p.block ? '100%' : '')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c83a2e;
  padding: 16px 26px 16px 26px;
  border-radius: 8px;
`;

export const ButtonTextRegular = styled(TextRegular)`
  font-size: 18px;
  color: #f9f9f9;
`;
export const ButtonTextMedium = styled(TextMedium)`
  font-size: 18px;
  color: #f9f9f9;
`;
export const ButtonTextBold = styled(TextBold)`
  font-size: 18px;
  color: #f9f9f9;
`;
