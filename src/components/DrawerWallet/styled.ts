import styled from 'styled-components/native';
import {TextBold, TextMedium, TextRegular} from '../Text';

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const ScrollViewItems = styled.ScrollView`
  flex: 1;
  padding: 10px;
  padding: 0 20px;
`;

export const ViewItems = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  padding-bottom: 20px;
`;

export const ViewItemsProduct = styled.View``;
export const ViewItemsValues = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextItemsProduct = styled(TextBold)`
  color: #f9f9f9;

  font-size: 19px;
`;
export const TextItemsProductDesc = styled(TextMedium)`
  color: #a8a8a8;
  max-width: 400px;
  font-size: 12px;
`;
export const TextItemsValues = styled(TextBold)`
  color: #f9f9f9;
  font-size: 20px;
  margin-left: 10px;
`;

export const TextItemsQuantity = styled(TextBold)`
  color: #808080;
  font-size: 15px;
`;

export const Footer = styled.View`
  width: 100%;
  padding: 20px;
  background-color: #292929;
`;

export const FooterHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
`;

export const FooterHeaderText = styled(TextRegular)`
  color: #f9f9f9;
  font-size: 24px;
`;

export const FooterSubTotal = styled(FooterHeaderText)``;
export const FooterTotal = styled(TextBold)`
  color: #f9f9f9;
  font-size: 24px;
`;

export const FooterButtons = styled.View``;
