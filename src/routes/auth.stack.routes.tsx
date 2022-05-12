import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RegisterProduct } from '@screens/RegisterProduct';
import { SignIn } from '@screens/SignIn';
import { Home } from '@screens/Home';

const Stack = createNativeStackNavigator();

export function AuthStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />

      <Stack.Screen
        name="Product"
        component={RegisterProduct}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
      />
    </Stack.Navigator>
  );
}