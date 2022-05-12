import React from 'react';
import { Container } from './styles';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { UserProfileHeader } from '../UserProfileHeader';

export function CustomDrawer(props) {
  return (
    <Container>

      <UserProfileHeader />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </Container>
  );
}