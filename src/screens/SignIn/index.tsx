import React from 'react';
import { Alert, Platform } from 'react-native';
import {
  Container,
  Backgroud,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel
} from './styles';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { InputForm } from '@components/Form/InputForm';
import { Button } from '@components/Button';

import { BrandImg } from '@assets/brand.png';
import { useAuth } from '@contexts/auth';

interface FormData {
  email: string;
  password: string;
}

/* Validation Form - Start */
const schema = Yup.object().shape({
  email: Yup.string().required('Digite o seu e-mail'),
  password: Yup.string().required('Digite a sua senha')
});
/* Validation Form - End */

export function SignIn({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { signInWithXano, user } = useAuth();

  async function handleSignInWithXano(form: FormData) {
    const SignInUser = {
      email: form.email,
      password: form.password
    }

    try {
      await signInWithXano(SignInUser)
      if (user.isAdmin) {
        navigation.navigate('Home Admin')
      } else {
        navigation.navigate('Home')
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Credenciais inválidas.');
    }
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Backgroud>
        <Content>
          <Brand source={BrandImg} />

          <Title>Login</Title>
          <InputForm
            placeholder='email@exemplo.com'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            name='email'
            control={control}
            error={errors.email && errors.email.message}
          />

          <InputForm
            placeholder='Sua senha'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            name='password'
            control={control}
            error={errors.password && errors.password.message}
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>
              Esqueci minha senha
            </ForgotPasswordLabel>
          </ForgotPasswordButton>
          <Button
            type='primary'
            title='Entrar'
          />
        </Content>
      </Backgroud>
    </Container>
  );
}