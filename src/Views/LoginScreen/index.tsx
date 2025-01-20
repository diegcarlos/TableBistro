import {zodResolver} from '@hookform/resolvers/zod';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import EnterpriseIcon from '../../assets/svg/enterprise.svg';
import PadLockIcon from '../../assets/svg/padLock.svg';
import UserIcon from '../../assets/svg/user.svg';
import CheckBox from '../../components/CheckBox';
import TextInputWithIcon from '../../components/TextInput';
import Tooltip, {useTooltip} from '../../components/Toltip';
import {
  CheckboxContainer,
  Container,
  ForgotPasswordContainer,
  ForgotPasswordText,
  FormContainer,
  LoginButton,
  LoginButtonContainer,
  LoginButtonText,
  Logo,
  LogoContainer,
  SavePasswordContainer,
} from './styles';

const acesso = {
  username: 'admin',
  password: '123456',
  cnpj: '12345678900000',
};

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
  const [_savePassword, setSavePassword] = useState(false);
  const {visible, text, showTooltip, hideTooltip} = useTooltip();

  const {handleSubmit, control, reset} = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      cnpj: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    try {
      if (
        data.username === acesso.username &&
        data.password === acesso.password &&
        data.cnpj === acesso.cnpj
      ) {
        navigation.navigate('InsertTable');
        reset();
      } else {
        showTooltip('Usuário, senha ou CNPJ incorretos');
      }
    } catch (error) {
      showTooltip('Usuário, senha ou CNPJ incorretos');
    }
  };

  return (
    <Container>
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
                console.log(numericValue);
                onChange(numericValue);
              }}
              value={value ? formatCNPJ(value) : ''}
              maxLength={18}
            />
          )}
        />

        <SavePasswordContainer>
          <CheckboxContainer>
            <CheckBox onPress={setSavePassword}>Salvar senha</CheckBox>
          </CheckboxContainer>

          <ForgotPasswordContainer>
            <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>
            <ForgotPasswordText red> Clique aqui</ForgotPasswordText>
          </ForgotPasswordContainer>
        </SavePasswordContainer>

        <LoginButtonContainer>
          <LoginButton
            onPress={handleSubmit(onSubmit, errors => {
              const firstError = Object.values(errors)[0];
              if (firstError?.message) {
                showTooltip(String(firstError.message));
              }
            })}>
            <LoginButtonText>Login</LoginButtonText>
          </LoginButton>
        </LoginButtonContainer>
      </FormContainer>
    </Container>
  );
}
