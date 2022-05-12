import { Header } from '@components/Header';
import React from 'react';
import {
  Container
} from './styles';


export function Orders() {
  return (
    <Container>
      <Header 
        title='Pedidos realizados'
        type='secondary'
      />
    </Container>
  );
}