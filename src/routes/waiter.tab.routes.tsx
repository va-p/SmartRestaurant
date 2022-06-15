import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CustomBottomTabNavigator } from '@components/CustomBottomTabNavigator';

import { Orders } from '@screens/Orders';
import { Home } from '@screens/Home';
import { Menu } from '@screens/Menu';

import themes from '@themes/index';

const Tab = createBottomTabNavigator();

export function WaiterTabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themes.COLORS.SECONDARY_900,
        tabBarInactiveTintColor: themes.COLORS.SECONDARY_400
      }}
    >
      <Tab.Screen
        name='Mesas'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomBottomTabNavigator
              iconName='home-outline'
              color={color}
              notifications={0}
            />
          )
        }}
      />

      <Tab.Screen
        name='Cardápio'
        component={Menu}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomBottomTabNavigator
              iconName='book-outline'
              color={color}
              notifications={0}
            />
          )
        }}
      />

      <Tab.Screen
        name='Pedidos'
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomBottomTabNavigator
              iconName='list-outline'
              color={color}
              notifications={0}
            />
          )
        }}
      />

    </Tab.Navigator>
  );
}