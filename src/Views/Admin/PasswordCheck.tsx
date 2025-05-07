import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LockIcon from '../../assets/svg/lock.svg';
import {useAuth} from '../../context/AuthContext';
import {
  Button,
  ButtonText,
  Container,
  Content,
  ErrorText,
  EyeIcon,
  EyeIconText,
  Input,
  LeftSection,
  PasswordContainer,
  PasswordLabel,
  RightSection,
  Subtitle,
  Title,
} from './styled';

interface PasswordCheckProps {
  onSuccess: () => void;
}

const PasswordCheck: React.FC<PasswordCheckProps> = ({onSuccess}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const {dataSettings} = useAuth();

  const handleCheckPassword = () => {
    if (password === dataSettings?.adminPassword) {
      onSuccess();
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <KeyboardAwareScrollView
      ref={scrollViewRef}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1, backgroundColor: '#181818'}}
      extraScrollHeight={300}
      enableAutomaticScroll
      keyboardOpeningTime={0}
      scrollToOverflowEnabled={true}>
      <Container>
        <Content>
          <LeftSection>
            <LockIcon width={80} height={80} fill="#C83A2E" />
            <Title>Acesso Administrativo</Title>
            <Subtitle>
              Digite a senha para acessar o painel de administração
            </Subtitle>
          </LeftSection>

          <RightSection>
            <PasswordLabel>Senha de acesso</PasswordLabel>
            <PasswordContainer>
              <Input
                ref={passwordInputRef}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleCheckPassword}
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToPosition(0, 350, true);
                  }, 100);
                }}
              />
              <EyeIcon onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <EyeIconText>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</EyeIconText>
              </EyeIcon>
            </PasswordContainer>

            {error ? <ErrorText>{error}</ErrorText> : null}

            <Button onPress={handleCheckPassword}>
              <ButtonText>Acessar Painel</ButtonText>
            </Button>
          </RightSection>
        </Content>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default PasswordCheck;
