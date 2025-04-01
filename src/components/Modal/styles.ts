import styled from 'styled-components/native';
import Plus from '../../assets/svg/plus.svg';

interface ModalContainerProps {
  backgroundColor?: string;
  overlayColor?: string;
}

interface ModalContentProps {
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
}

export const Container = styled.View`
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.Pressable<ModalContainerProps>`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ModalContainerProps) =>
    props.overlayColor || 'rgba(0, 0, 0, 0.5)'};
`;

export const ModalContent = styled.View<ModalContentProps>`
  position: relative;
  width: ${(props: ModalContentProps) =>
    typeof props.width === 'number'
      ? `${props.width}px`
      : props.width || '80%'};
  height: ${(props: ModalContentProps) =>
    typeof props.height === 'number'
      ? `${props.height}px`
      : props.height || 'auto'};
  background-color: ${(props: ModalContentProps) =>
    props.backgroundColor || '#FFFFFF'};
  border-radius: 10px;
  border-radius: 16px;
  overflow: hidden;
  align-self: center;
  margin: auto;
`;

export const ModalCloseButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  border-radius: 0 0 0 16px;
  right: 0px;
  z-index: 10000;
`;

export const CloseIcon = styled(Plus)`
  transform: rotate(45deg);
  width: 20px;
  height: 20px;
`;
