import styled from 'styled-components/native';
import {TextMedium, TextRegular} from '../Text';

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
  height: auto;
  min-height: 87px;
  background-color: #242424;
  padding: 12px;
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
  gap: 4px;
`;

export const TitleProduct = styled(TextMedium)`
  color: #f9f9f9;
  font-size: 16px;
`;

export const DescriptionProduct = styled(TextRegular)`
  color: #bdbdbd;
  font-size: 14px;
  margin-bottom: 2px;
`;

export const PriceProduct = styled(TextMedium)`
  color: #f9f9f9;
  font-size: 16px;
  margin-top: 4px;
`;

export const ComplementsContainer = styled.View`
  margin-top: 4px;
  gap: 2px;
`;

export const ComplementText = styled(TextRegular)`
  color: #bdbdbd;
  font-size: 12px;
`;

export const ComplementValue = styled(TextRegular)`
  color: #bdbdbd;
  font-size: 12px;
  margin-left: 8px;
`;

export const ObservationText = styled(TextRegular)`
  color: #bdbdbd;
  font-size: 12px;
  margin-top: 2px;
  font-style: italic;
`;
