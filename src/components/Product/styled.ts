import styled from 'styled-components/native';
import NTPen from '../../assets/svg/pen.svg';
import {TextMedium, TextRegular} from '../../components/Text';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  pointer-events: box-none;
`;

export const ViewProduct = styled.View`
  gap: 3px;
  width: 45%;
  background-color: #161616;
  padding: 24px;
  overflow: hidden;
`;

export const ImageProduct = styled.Image`
  width: 100%;
  height: 45%;
  border-radius: 8px;
`;

export const TitleProduct = styled.Text`
  font-size: 24px;
  color: #f9f9f9;
  font-family: 'Montserrat-Medium';
`;

export const DescriptionProduct = styled.Text`
  font-size: 16px;
  color: #e6e6e6;
  font-family: 'Montserrat-Medium';
`;

export const Steps = styled.ScrollView`
  flex: 1;
`;

export const StepsOptions = styled.TouchableOpacity<{active: boolean}>`
  position: relative;
  background-color: ${(p: any) => (p.active ? '#292929' : '#161616')};
  border-radius: 16px;
  margin-top: 16px;
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 16px 0 16px;
`;

export const Pen = styled(NTPen)`
  position: absolute;
  right: 16px;
`;

export const StepsOptionsContent = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StepsShapeIndex = styled.View<{active: boolean}>`
  width: 36px;
  height: 36px;
`;

export const StepsOptionsIcon = styled.View`
  width: 34px;
  flex-direction: row;
  height: 34px;
  border-radius: 16px;
  border: 2px solid #bdbdbd;
  justify-content: center;
  align-items: center;
`;

export const StepsOptionsIconText = styled(TextRegular)`
  color: #bdbdbd;
  font-size: 20px;
`;
export const StepsOptionsText = styled(TextRegular)`
  color: #bdbdbd;
  font-size: 20px;
  margin-left: 8px;
`;

export const SubTotal = styled.View`
  padding: 0 18px 0 18px;
  width: 100%;
  height: 56px;
  background-color: #292929;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 16px;
`;

export const SubtotalText = styled.Text`
  font-size: 24px;
  color: #e6e6e6;
  font-family: 'Montserrat-Medium';
  font-weight: 500;
`;

export const SubTotalValue = styled(TextMedium)`
  font-size: 16px;
  color: #e6e6e6;
`;

export const Complement = styled.View`
  flex: 1;
  padding: 24px;
`;

export const ComplementContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  gap: 16px;
`;

export const ComplementFooter = styled.View``;
