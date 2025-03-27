import {zodResolver} from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Dimensions, Keyboard, ScrollView} from 'react-native';
import {z} from 'zod';
import EnterpriseIcon from '../../assets/svg/enterprise.svg';
import PadLockIcon from '../../assets/svg/padLock.svg';
import UserIcon from '../../assets/svg/user.svg';
import {ButtonRed} from '../../components/ButtonRed';
import CheckBox from '../../components/CheckBox';
import TextInputWithIcon from '../../components/TextInput';
import Tooltip, {useTooltip} from '../../components/Toltip';
import {useAuth} from '../../context/AuthContext';
import {
  CheckboxContainer,
  Container,
  ForgotPasswordContainer,
  ForgotPasswordText,
  FormContainer,
  LoginButtonContainer,
  Logo,
  LogoContainer,
  SavePasswordContainer,
} from './styles';

const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
  cnpj: z.string().min(14, 'CNPJ deve ter 14 dígitos').max(14),
});

type LoginFormData = z.infer<typeof loginSchema>;

const formatCNPJ = (value: string) => {
  const cnpj = value.replace(/\D/g, '');
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
    '$1.$2.$3/$4-$5',
  );
};

export function LoginScreen({navigation}: {navigation: any}) {
  const {signIn} = useAuth();

  const {visible, text, showTooltip, hideTooltip} = useTooltip();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const screenHeight = Dimensions.get('screen').height;
  const [savePassword, setSavePassword] = useState<boolean | null>(null);

  const {handleSubmit, control, reset, setValue} = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      cnpj: '',
    },
  });

  const handleSavePassword = async (data: LoginFormData) => {
    try {
      await AsyncStorage.setItem('form-login-save', JSON.stringify(data));
    } catch (error) {}
  };

  const handleGetPassword = async () => {
    try {
      const login = await AsyncStorage.getItem('form-login-save');
      const res: LoginFormData = JSON.parse(login || '{}');
      return res;
    } catch (error) {}
  };

  useEffect(() => {
    const fetch = async () => {
      if (savePassword !== null) {
        await AsyncStorage.setItem('save-pass', `${savePassword}`);
      }
    };
    fetch();
  }, [savePassword]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    const fetch = async () => {
      const check = await AsyncStorage.getItem('save-pass');
      const isCheck = check === 'true';
      setSavePassword(isCheck);
      if (isCheck) {
        const login = await handleGetPassword();

        setValue('username', login?.username || '');
        setValue('password', login?.password || '');
        setValue('cnpj', login?.cnpj || '');
      }
    };

    fetch();

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const resp = await signIn(data);
      if (resp.status === 201) {
        navigation.navigate('InsertTable');
        if (savePassword === true) {
          handleSavePassword(data);
        }
        reset();
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      showTooltip(error.response.data.error || 'Erro interno');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: screenHeight - keyboardHeight,
        justifyContent: 'center',
      }}
      keyboardShouldPersistTaps="handled">
      <Container
        style={{
          flex: 1,
          marginBottom: keyboardHeight || 0,
        }}>
        {visible && <Tooltip text={text} onClose={hideTooltip} />}
        <FormContainer>
          <LogoContainer>
            <Logo source={require('../../assets/logoKukan.png')} />
          </LogoContainer>

          <Controller
            control={control}
            name="username"
            render={({field: {onChange, value}}) => (
              <TextInputWithIcon
                placeholder="Usuário"
                placeholderTextColor="#F9F9F9"
                icon={UserIcon}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <TextInputWithIcon
                placeholder="Senha"
                placeholderTextColor="#F9F9F9"
                secureTextEntry={true}
                icon={PadLockIcon}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="cnpj"
            render={({field: {onChange, value}}) => (
              <TextInputWithIcon
                placeholder="CNPJ"
                placeholderTextColor="#F9F9F9"
                keyboardType="numeric"
                icon={EnterpriseIcon}
                onChangeText={text => {
                  const numericValue = text.replace(/\D/g, '');
                  onChange(numericValue);
                }}
                value={value ? formatCNPJ(value) : ''}
                maxLength={18}
              />
            )}
          />

          <SavePasswordContainer>
            <CheckboxContainer>
              <CheckBox
                checkBox={savePassword || false}
                onPress={() => setSavePassword(!savePassword)}>
                Salvar senha
              </CheckBox>
            </CheckboxContainer>

            <ForgotPasswordContainer>
              <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>
              <ForgotPasswordText red> Clique aqui</ForgotPasswordText>
            </ForgotPasswordContainer>
          </SavePasswordContainer>

          <LoginButtonContainer>
            <ButtonRed
              title="Login"
              block
              loading={loading}
              onPress={handleSubmit(onSubmit, errors => {
                const firstError = Object.values(errors)[0];
                if (firstError?.message) {
                  showTooltip(String(firstError.message));
                }
              })}
            />
          </LoginButtonContainer>
        </FormContainer>
      </Container>
    </ScrollView>
  );
}
