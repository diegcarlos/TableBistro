import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import CheckIcon from '../../assets/svg/checkCheckBox.svg'; // Importação como componente
import UncheckIcon from '../../assets/svg/unCheckCheckBox.svg'; // Importação como componente
import {CheckBoxContainer, TextCheckBox} from './styles';

interface CheckBoxProps {
  onPress?: (data: boolean) => void;
  checkBox?: boolean;
  children?: string;
}

const CheckBox = ({onPress, children, checkBox = false}: CheckBoxProps) => {
  const [isCheck, setIsCheck] = useState(false);

  const handlePress = (ck: boolean) => {
    setIsCheck(ck);
    onPress?.(ck);
  };

  useEffect(() => {
    setIsCheck(checkBox);
  }, [checkBox]);

  return (
    <CheckBoxContainer onPress={() => handlePress(!isCheck)}>
      <View>
        {isCheck ? (
          <CheckIcon fill="#626262" stroke="#868686" width={25} height={25} />
        ) : (
          <UncheckIcon fill="#626262" stroke="#868686" width={25} height={25} />
        )}
      </View>
      <TextCheckBox>{children}</TextCheckBox>
    </CheckBoxContainer>
  );
};

export default CheckBox;
