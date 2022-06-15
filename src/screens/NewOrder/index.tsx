import React, { useEffect, useState } from 'react';
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

import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { ControlledInput } from '@components/Form/ControlledInput';
import { RadioButton } from '@components/RadioButton';
import { Load } from '@components/Button/styles';
import { Header } from '@components/Header';
import { Button } from '@components/Button';

import { selectProductId } from '@slices/productSlice';
import { selectUserTenantId } from '@slices/userSlice';

import { PIZZA_TYPES } from '@utils/pizzaTypes';

import api from '@api/api';

/* Validation Form - Start */
const schema = Yup.object().shape({
  size: Yup.string().required("Selecione o tamanho do produto"),
  deskNumber: Yup.number().required("Digite o número da mesa").typeError("Digite apenas números"),
  quantity: Yup.number().required("Digite a quantidade").typeError("Digite apenas números")
});
/* Validation Form - End */

export function NewOrder() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [productSize, setProductSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const productId = useSelector(selectProductId);
  const tenantId = useSelector(selectUserTenantId);
  const navigation = useNavigation();

  async function handleAddOrder() {
    setButtonIsLoading(true);
    try {
      const newOrder = {

      }
    } catch (error) {

    }
  }

  async function fetchProduct() {
    setLoading(true);
    try {
      const { data } = await api.get('product', {
        params: {
          product_id: productId
        }
      });
      if (!data) {
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <Load />
  };

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
              <ControlledInput
                label='Número da mesa'
                type='secondary'
                keyboardType='numeric'
                name='deskNumber'
                control={control}
                error={errors.deskNumber && errors.deskNumber.message}
              />
            </InputGroup>
            <InputGroup>
              <ControlledInput
                label='Quantidade'
                type='secondary'
                keyboardType='numeric'
                name='quantity'
                control={control}
                error={errors.quantity && errors.quantity.message}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ 00,00</Price>

          <Button
            title='Confirmar Pedido'
            onPress={handleSubmit(handleAddOrder)}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}