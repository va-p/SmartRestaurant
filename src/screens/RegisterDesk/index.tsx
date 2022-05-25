import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform } from 'react-native';
import {
  Container,
  Title,
  Divider,
  Form
} from './styles';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { InputForm } from '@components/Form/InputForm';
import { Desk, DeskProps } from '@components/Desk';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Load } from '@components/Load';

import api from '@api/api';

type FormData = {
  number: number;
}

export interface DataListProps extends DeskProps {
  id: string;
}

/* Validation Form - Start */
const schema = Yup.object().shape({
  number: Yup.number().required('Digite o número da mesa').typeError('Digite apenas números')
});
/* Validation Form - End */

export function RegisterDesk({ navigation }: any) {
  const [desks, setDesks] = useState<DataListProps[]>([]);
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  async function fetchDesks() {
    setLoading(true);
    try {
      const { data } = await api.get('desk');
      if (!data) {
      } else {
        setDesks(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Mesas', 'Não foi possível buscar as mesas. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  async function handleAddDesk(form: FormData) {
    setButtonIsLoading(true);
    try {
      const newDesk = {
        number: form.number,
        is_busy: false
      }
      const { status } = await api.post('desk', newDesk);
      if (status === 200) {
        Alert.alert('Cadastro de Mesa', 'Mesa cadastrada com sucesso!', [{ text: 'Cadastrar nova mesa' }, { text: 'Voltar para a home', onPress: () => navigation.navigate('Cardápio') }]);
      };
      setButtonIsLoading(false);
    } catch (error: any) {
      Alert.alert('Cadastro de Mesa', 'Mesa já cadastrada. Por favor, digite outro número para a mesa.', [{ text: 'Tentar novamente' }, { text: 'Voltar para a home', onPress: () => navigation.navigate('Cardápio') }]);
      //throw new Error(error);
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

      <Title>Mesas cadastradas:</Title>
      <FlatList
        data={desks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Desk
            data={item}
          />
        )}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20
        }}
      />

      <Divider />

      <Title>Cadastrar nova mesa:</Title>
      <Form>
        <InputForm
          label='Número da mesa'
          keyboardType='number-pad'
          name='number'
          control={control}
          error={errors.number && errors.number.message}
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