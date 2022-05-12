import React from 'react';

import { useFonts, DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { AuthProvider } from '@contexts/auth';
import { Routes } from './src/routes';

import themes from '@themes/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSerifDisplay_400Regular,
    DMSans_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={themes}>
        <StatusBar style='light' translucent backgroundColor='transparent' />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}