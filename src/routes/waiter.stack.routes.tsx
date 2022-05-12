import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

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

        tabBarActiveTintColor: themes.COLORS.SECONDARY_900
      }}
    >
      <Tab.Screen
        name='Mesas'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='home-outline'
              size={20}
              color={color}
            />
          )
        }}
      />

      <Tab.Screen
        name='Cardápio'
        component={Menu}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='book-outline'
              size={20}
              color={color}
            />
          )
        }}
      />

      <Tab.Screen
        name='Pedidos'
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='list-outline'
              size={20}
              color={color}
            />
          )
        }}
      />

    </Tab.Navigator>
  );
}