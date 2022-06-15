import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, RefreshControl } from 'react-native';
import {
  Container,
  Title,
  Form
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { DeskListItem, DeskProps } from '@components/DeskListItem';
import { ControlledInput } from '@components/Form/ControlledInput';
import { Divider } from '@components/Divider';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Load } from '@components/Load';

import { selectUserTenantId } from '@slices/userSlice';

import api from '@api/api';

type FormData = {
  number: number;
}

type DataListProps = DeskProps & {
  id: string;
}

/* Validation Form - Start */
const schema = Yup.object().shape({
  number: Yup.number().required("Digite o número da mesa").typeError("Digite apenas números")
});
/* Validation Form - End */

export function RegisterDesk() {
  const [loading, setLoading] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [desks, setDesks] = useState<DataListProps[]>([]);
  const tenantId = useSelector(selectUserTenantId);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);

  async function fetchDesks() {
    setLoading(true);
    try {
      const { data } = await api.get('desk', {
        params: {
          tenant_id: tenantId
        }
      });
      if (!data) {
      } else {
        setRefreshing(false);
        setDesks(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Mesas', 'Não foi possível buscar as mesas. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  async function handleAddDesk(data: FormData) {
    setButtonIsLoading(true);
    try {
      const newDesk = {
        number: data.number,
        is_busy: false,
        tenant_id: tenantId
      }
      const { status } = await api.post('desk', newDesk);
      if (status === 200) {
        Alert.alert('Cadastro de Mesa', 'Mesa cadastrada com sucesso!', [{ text: 'Cadastrar nova mesa' }, { text: 'Voltar para a home', onPress: () => navigation.navigate('Cardápio') }]);
      };
      fetchDesks();
      setButtonIsLoading(false);
    } catch (error) {
      Alert.alert('Cadastro de Mesa', 'Mesa já cadastrada. Por favor, digite outro número para a mesa.', [{ text: 'Tentar novamente' }, { text: 'Voltar para a home', onPress: () => navigation.navigate('Cardápio') }]);
      setButtonIsLoading(false);
    };
  };

  useEffect(() => {
    fetchDesks();
  }, [])

  if (loading) {
    return <Load />
  }
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header type='primary' title='Cadastrar mesa' />

      <Title>Mesas cadastradas</Title>
      <FlatList
        data={desks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DeskListItem
            data={item}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchDesks} />
        }
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20
        }}
      />

      <Divider />

      <Title>Cadastrar nova mesa</Title>
      <Form>
        <ControlledInput
          type='secondary'
          label='Número da mesa'
          keyboardType='number-pad'
          name='number'
          control={control}
          error={errors.number}
        />

        <Button
          title='Cadastrar mesa'
          isLoading={buttonIsLoading}
          onPress={handleSubmit(handleAddDesk)}
        />
      </Form>
    </Container>
  );
}