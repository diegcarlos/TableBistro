import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 202px;
  background-color: #2e2e2e;
  border-radius: 8px;
  overflow: hidden;
  flex-direction: row;
`;

export const ImageProduct = styled.Image`
  width: 264px;
  height: 100%;
`;

export const TitleProduct = styled.Text`
  text-align: left;
  width: 100%;
  font-size: 26px;
  font-family: 'Montserrat-Medium';
  color: #f9f9f9;
`;

export const DescriptionProduct = styled.Text`
  font-size: 18px;
  text-align: left;
  width: 100%;
  color: #f9f9f9;
  font-family: 'Montserrat-Medium';
`;

export const PriceProduct = styled.Text<{desconto: boolean}>`
  font-size: 18px;
  font-family: 'Montserrat-Bold';
  color: ${(p: any) => (p.desconto ? '#50A773' : '#F9F9F9')};
`;

export const PriceOriginal = styled.Text`
  font-size: 18px;
  font-family: 'Montserrat-Medium';
  text-decoration: line-through;
  color: #949494;
`;

export const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 20px;
  height: 100%;
`;

export const WrapperPrices = styled.View`
  gap: 10px;
  flex-direction: row;
`;

export const WrapperPrice = styled.View`
  width: 100%;
  height: 63px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
