import styled from 'styled-components/native';
import {TextBold, TextMedium} from '../Text';

export const ContainerScroll = styled.ScrollView`
  flex: 1;
  display: flex;
  width: 100%;
  padding: 16px 16px 0 16px;
`;

export const Container = styled.View`
  flex: 1;
  position: relative;
  width: 100%;
`;

export const ContainerItem = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  height: 87px;
  background-color: #242424;
  padding: 0 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
`;

export const ImageProduct = styled.Image`
  width: 61px;
  height: 61px;
  border-radius: 12px;
`;

export const ContainerContent = styled.View`
  width: 60%;
`;

export const TitleProduct = styled(TextBold)`
  color: #f9f9f9;
  font-size: 20px;
`;

export const DescriptionProduct = styled(TextMedium)`
  color: #a8a8a8;
  font-size: 12px;
`;

export const PriceProduct = styled(TextBold)`
  color: #f9f9f9;
  font-size: 15px;
`;
