import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import {
  Container,
  Backgroud,
  ContentScroll,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { ControlledInput } from '@components/Form/ControlledInput';
import { Button } from '@components/Button';

import BrandImg from '@assets/brand.png';

import {
  setUserId,
  setUserName,
  setUserLastName,
  setUserEmail,
  setUserPhone,
  setUserRole,
  setUserProfileImage,
  setUserTenantId,
} from '@slices/userSlice';

import {
  COLLECTION_USERS
} from '@configs/database';

import { signInWithXano } from '@services/auth';

type FormData = {
  email: string;
  password: string;
}

/* Validation Form - Start */
const schema = Yup.object().shape({
  email: Yup.string().required("Digite o seu e-mail"),
  password: Yup.string().required("Digite a sua senha")
});
/* Validation Form - End */

export function SignIn() {
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function handleSignInWithXano(data: FormData) {
    setButtonIsLoading(true)
    const SignInUser = {
      email: data.email,
      password: data.password
    }
    try {
      await signInWithXano(SignInUser);
      const jsonUserData = await AsyncStorage.getItem(COLLECTION_USERS);
      if (jsonUserData) {
        const loggedInUserData = JSON.parse(jsonUserData);
        dispatch(
          setUserId(loggedInUserData.id)
        );
        dispatch(
          setUserName(loggedInUserData.name)
        );
        dispatch(
          setUserLastName(loggedInUserData.last_name)
        );
        dispatch(
          setUserEmail(loggedInUserData.email)
        );
        dispatch(
          setUserPhone(loggedInUserData.phone)
        );
        dispatch(
          setUserRole(loggedInUserData.role)
        );
        dispatch(
          setUserProfileImage(loggedInUserData.image)
        );
        dispatch(
          setUserTenantId(loggedInUserData.tenant_id)
        );
        switch (loggedInUserData.role) {
          case 'admin':
            navigation.navigate('Home Admin')
            break;
          case ('waiter'):
            navigation.navigate('Home Waiter')
          default: 'waiter';
            break;
        };
      };
      setButtonIsLoading(false)
    } catch (error) {
      setButtonIsLoading(false)
      console.error(error);
      Alert.alert(`Erro: ${error}`);
    }
  };
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Backgroud>
        <ContentScroll>
          <Brand source={BrandImg} />

          <Title>Login</Title>
          <ControlledInput
            label='Login'
            type='primary'
            placeholder='email@exemplo.com'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            name='email'
            control={control}
            error={errors.email}
          />

          <ControlledInput
            label='Senha'
            type='primary'
            placeholder='Sua senha'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            name='password'
            control={control}
            error={errors.password}
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>
              Esqueci minha senha
            </ForgotPasswordLabel>
          </ForgotPasswordButton>
          
          <Button
            title='Entrar'
            type='primary'
            isLoading={buttonIsLoading}
            onPress={handleSubmit(handleSignInWithXano)}
          />
        </ContentScroll>
      </Backgroud>
    </Container>
  );
}