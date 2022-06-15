import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  COLLECTION_TOKENS,
  COLLECTION_USERS
} from '@configs/database';

import api from '@api/api';

export const loadStoredUserData = async () => {
  const jsonUserData = await AsyncStorage.getItem(COLLECTION_USERS);
  if (jsonUserData) {
    const loggedInUserData = JSON.parse(jsonUserData);
  };
};

export const signInWithXano = async (SignInUser: any) => {
  const loginForm = {
    email: SignInUser.email,
    password: SignInUser.password
  }
  try {
    const { data, status } = await api.post('auth/login', loginForm);
    if (status === 200) {
      try {
        await AsyncStorage.setItem(COLLECTION_TOKENS, JSON.stringify(data.authToken));
      } catch (error) {
        console.error(error);
        Alert.alert(`Erro: ${error}`);
      }
    }
    const userData = await api.get('auth/me');
    await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData.data));    
  } catch (error: any) {
    console.error(error);
    Alert.alert(`Erro: ${error}`);
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem(COLLECTION_TOKENS);
  await AsyncStorage.removeItem(COLLECTION_USERS);
};