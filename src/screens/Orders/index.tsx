import React, { useState } from 'react';
import {
  Container,
  ContentFlatList
} from './styles';

import { ProductHorizontalSeparator } from '@components/ProductHorizontalSeparator';
import { OrderCard } from '@components/OrderCard';
import { Header } from '@components/Header';

export function Orders() {
  const [orders, setOrders] = useState([]);

  return (
    <Container>
      <Header title='Pedidos realizados' type='secondary' />

      <ContentFlatList
        data={['1', '2', '3']}
        keyExtractor={(item) => String(item)}
        renderItem={({ item, index }) => (
          <OrderCard index={index} />
        )}
        ItemSeparatorComponent={() => <ProductHorizontalSeparator />}
      />

    </Container>
  );
}