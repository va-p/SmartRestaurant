import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLLECTION_TOKENS } from '@configs/database';

const axios = require('axios').default;

const api = axios.create({
  baseURL: 'https://x6if-pd9g-tkt7.n7.xano.io/api:4znihxXN'
});

api.interceptors.request.use(async config => {
  try {
    const jsonUserAuthToken = await AsyncStorage.getItem(COLLECTION_TOKENS);
    if (jsonUserAuthToken) {
      const loggedInUserToken = JSON.parse(jsonUserAuthToken);
      config.headers.Authorization = `Bearer ${loggedInUserToken}`;
    }
  } catch (error) {
    console.error(error);
  }

  return config;
});

export default api;