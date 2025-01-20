import React, {forwardRef, useState} from 'react';
import {KeyboardTypeOptions, TextInput as RNTextInput} from 'react-native';
import {SvgProps} from 'react-native-svg';
import EyeIconClose from '../../assets/svg/eyeClose.svg';
import EyeIconOpen from '../../assets/svg/eyeOpen.svg';

import {Icon, Input, InputContainer} from './styles';

interface TextInputWithIconProps {
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  icon?: React.FC<SvgProps>;
  autoFocus?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  maxLength?: number;
}

const TextInputWithIcon = forwardRef<RNTextInput, TextInputWithIconProps>(
  (
    {
      placeholder,
      placeholderTextColor,
      secureTextEntry,
      keyboardType,
      icon: IconComponent,
      autoFocus,
      onChangeText,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <InputContainer>
        {IconComponent && (
          <Icon>
            <IconComponent width={25} height={25} fill="#fff" />
          </Icon>
        )}
        <Input
          ref={ref}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          keyboardAppearance="dark"
          enablesReturnKeyAutomatically
          {...rest}
        />
        {secureTextEntry &&
          (!showPassword ? (
            <Icon secureTextEntry={true} onPress={() => setShowPassword(true)}>
              <EyeIconClose width={25} height={25} stroke="#fff" />
            </Icon>
          ) : (
            <Icon secureTextEntry={true} onPress={() => setShowPassword(false)}>
              <EyeIconOpen width={25} height={25} stroke="#fff" />
            </Icon>
          ))}
      </InputContainer>
    );
  },
);

export default TextInputWithIcon;
