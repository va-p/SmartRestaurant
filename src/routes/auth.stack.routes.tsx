import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AdminDrawerRoutes } from './admin.drawer.routes';
import { WaiterTabRoutes } from './waiter.tab.routes';
import { SignIn } from '@screens/SignIn';

const Stack = createNativeStackNavigator();

export function AuthStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='SignIn'
        component={SignIn}
      />

      <Stack.Screen
        name='Home Admin'
        component={AdminDrawerRoutes}
      />

      <Stack.Screen
        name='Home Waiter'
        component={WaiterTabRoutes}
      />
    </Stack.Navigator>
  );
}