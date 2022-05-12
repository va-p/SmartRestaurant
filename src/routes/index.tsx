import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@contexts/auth';

import { AdminDrawerRoutes } from './admin.drawer.routes';
import { WaiterTabRoutes } from './waiter.stack.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <AdminDrawerRoutes />
    </NavigationContainer>
  );
}