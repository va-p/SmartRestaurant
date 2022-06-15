import React, { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Container } from './styles';

import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { DeskListItem, DeskProps } from '@components/DeskListItem';
import { ModalView } from '@components/ModalView';
import { Header } from '@components/Header';
import { Load } from '@components/Load';

import { Menu } from '@screens/Menu';

import { selectUserTenantId } from '@slices/userSlice';

import api from '@api/api';

type DataListProps = DeskProps & {
  id: string;
}

export function Home() {
  const [desks, setDesks] = useState<DataListProps[]>([]);
  const [deskSelected, setDeskSelected] = useState<DeskProps>({} as DeskProps);
  const [openDeskModal, setOpenDeskModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const tenantId = useSelector(selectUserTenantId);

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
        setDesks(data);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Mesas', 'Não foi possível buscar as mesas. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  function handleDeskSelect(deskSelected: DeskProps) {
    setDeskSelected(deskSelected);
    setOpenDeskModal(true);
  };

  function handleCloseDeskModal() {
    setOpenDeskModal(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchDesks();
    }, [])
  );

  if (loading) {
    return <Load />
  };

  return (
    <Container>
      <Header type='secondary' title='Mesas' />

      <FlatList
        data={desks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DeskListItem
            data={item}
            onPress={() => handleDeskSelect(item)}
          />
        )}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 250
        }}
      />

      <ModalView
        visible={openDeskModal}
        closeModal={handleCloseDeskModal}
        title='Pedido Mesa'
        selectedIdentification={deskSelected.number}
      >
        <Menu />
      </ModalView>
    </Container>
  );
}