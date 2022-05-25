import React, { useState } from 'react';
import { FlatList, Platform } from 'react-native';
import {
  Container,
  ProductImage,
  Sizes,
  Form,
  Title,
  Label,
  FormRow,
  InputGroup,
  Price,
  ContentScroll
} from './styles';

import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Form/Input';
import { Header } from '@components/Header';
import { Button } from '@components/Button';

import { PIZZA_TYPES } from '@utils/pizzaTypes';

export function NewOrder() {
  const [productSize, setProductSize] = useState('');
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header type='primary' />

        <ProductImage source={{ uri: 'https://avatars.githubusercontent.com/u/86264374?s=400&u=1f5068f1cd425601df99567d3419c77a6fab80f9&v=4' }} />

        <Form>
          <Title>Nome do Produto</Title>
          <Label>Selecione um tamanho</Label>
          <Sizes>
            <FlatList
              data={PIZZA_TYPES}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <RadioButton
                  key={item.id}
                  title={item.name}
                  onPress={() => setProductSize(item.id)}
                  selected={productSize === item.id}
                />
              )}
            />
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType='numeric' />
            </InputGroup>
            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType='numeric' />
            </InputGroup>
          </FormRow>
          <Price>Valor de R$ 00,00</Price>

          <Button
            title='Confirmar Pedido'
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}