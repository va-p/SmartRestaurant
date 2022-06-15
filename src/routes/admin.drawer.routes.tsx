import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'

import { CustomDrawerNavigator } from '@components/CustomDrawerNavigator';

import { RegisterProductCategory } from '@screens/RegisterProductCategory';
import { RegisterProductSize } from '@screens/RegisterProductSize';
import { RegisterEmployee } from '@screens/RegisterEmployee';
import { RegisterProduct } from '@screens/RegisterProduct';
import { RegisterDesk } from '@screens/RegisterDesk';
import { Menu } from '@screens/Menu';

import theme from '@themes/index';

const Drawer = createDrawerNavigator();

export function AdminDrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerNavigator {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
        headerTintColor: theme.COLORS.TITLE,
        drawerActiveTintColor: theme.COLORS.SECONDARY_900
      }}
    >
      <Drawer.Screen
        name='Cardápio'
        component={Menu}
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
        name='Cadastrar Categoria de Produto'
        component={RegisterProductCategory}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='pricetags-outline'
              size={20}
              color={color}
            />
          )
        }}
      />

      <Drawer.Screen
        name='Cadastrar Tamanho de Produto'
        component={RegisterProductSize}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='speedometer-outline'
              size={20}
              color={color}
            />
          )
        }}
      />

      <Drawer.Screen
        name='Cadastrar Funcionário'
        component={RegisterEmployee}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name='person-add-outline'
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
              name='grid-outline'
              size={20}
              color={color}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}