import styled from 'styled-components/native';
import {TextBold, TextRegular} from '../Text';

export const Container = styled.View`
  width: 100%;
  height: 166px;
  background-color: #292929;
`;

export const FooterHead = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
`;

export const TextCountItems = styled(TextRegular)`
  color: #f9f9f9;
  font-size: 24px;
`;

export const TextSubTotal = styled(TextRegular)`
  color: #f9f9f9;
  font-size: 24px;
`;

export const TextTotal = styled(TextBold)`
  color: #f9f9f9;
  font-size: 24.25px;
`;

export const FooterButtons = styled.View`
  flex-direction: row;
  gap: 12px;
  width: 100%;
  padding: 0 16px;
`;
