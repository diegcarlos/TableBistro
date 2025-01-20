import React, {useState} from 'react';
import {View} from 'react-native';
import CheckIcon from '../../assets/svg/checkCheckBox.svg'; // Importação como componente
import UncheckIcon from '../../assets/svg/unCheckCheckBox.svg'; // Importação como componente
import {CheckBoxContainer, TextCheckBox} from './styles';

interface CheckBoxProps {
  onPress?: (data: boolean) => void;
  children?: string;
}

const CheckBox = ({onPress, children}: CheckBoxProps) => {
  const [checked, setChecked] = useState(false);

  const handlePress = (ck: boolean) => {
    setChecked(ck);
    onPress?.(ck);
  };

  return (
    <CheckBoxContainer onPress={() => handlePress(!checked)}>
      <View>
        {checked ? (
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
