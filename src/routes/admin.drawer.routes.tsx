import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'

import { CustomDrawer } from '@components/CustomDrawer';

import { RegisterProduct } from '@screens/RegisterProduct';
import { RegisterDesk } from '@screens/RegisterDesk';
import { ManageMenu } from '@screens/ManageMenu';
import { NewOrder } from '@screens/NewOrder';
import { Orders } from '@screens/Orders';

import theme from '@themes/index';

const Drawer = createDrawerNavigator();

export function AdminDrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
        headerTintColor: theme.COLORS.TITLE,
        drawerActiveTintColor: theme.COLORS.SECONDARY_900
      }}
    >
      <Drawer.Screen
        name='Pedidos'
        component={Orders}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='book-outline'
              size={20}
              color={color}
            />
          )
        }}
      />
      <Drawer.Screen
        name='Cardápio'
        component={ManageMenu}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='book-outline'
              size={20}
              color={color}
            />
          )
        }}
      />

      <Drawer.Screen
        name='Cadastrar Produto'
        component={RegisterProduct}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='fast-food-outline'
              size={20}
              color={color}
            />
          )
        }}
      />

      <Drawer.Screen
        name='Cadastrar Mesa'
        component={RegisterDesk}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='home-outline'
              size={20}
              color={color}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}