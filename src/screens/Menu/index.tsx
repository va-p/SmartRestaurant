import React, { useState, useCallback } from 'react';
import { Alert, FlatList, RefreshControl } from 'react-native';
import {
  Container,
  MenuSubHeader,
  MenuItemsNumber
} from './styles';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { ProductListItem, ProductProps } from '@components/ProductListItem';
import { Header } from '@components/Header';
import { Search } from '@components/Search';
import { Load } from '@components/Load';

import { selectUserTenantId, selectUserRole } from '@slices/userSlice';
import { setProductId } from '@slices/productSlice';

import api from '@api/api';

type DataListProps = ProductProps & {
  id: string;
}

export function Menu() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<DataListProps[]>([]);
  const [search, setSearch] = useState('');
  const tenantId = useSelector(selectUserTenantId);
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);

  async function fetchProducts(value: string) {
    setLoading(true);
    try {
      const { data } = await api.get('product', {
        params: {
          tenant_id: tenantId
        }
      });
      if (!data) {
      } else {
        setRefreshing(false);
        setProducts(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Produtos", "Não foi possível buscar os produtos. Verifique sua conexão com a internet e tente novamente.");
    }
  };

  function handleSearch() {
    fetchProducts(search);
  };

  function handleSearchClear() {
    setSearch('');
    fetchProducts('');
  };

  async function handleSelectProduct(id: string) {
    dispatch(
      setProductId(id)
    );
    const route = userRole === 'admin' ? 'Cadastrar Produto' : 'Novo Pedido'
    navigation.navigate(route, { id });
  };

  async function handleProductSwipeLeft(id: string) {
    if (userRole === 'admin') {
      Alert.alert("Exclusão de produto", "Tem certeza que deseja excluir o produto?", [{ text: "Não, cancelar a exclusão." }, { text: "Sim, excluir o produto.", onPress: () => handleDeleteProduct(id) }])

    } else {
      Alert.alert("Exclusão de Produto", "Somente administradores podem excluir produtos.")
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await api.delete('delete_product', {
        params: {
          product_id: id
        }
      });
      fetchProducts('');
      Alert.alert('Exclusão de produto', 'Produto excluído com sucesso!')
    } catch (error) {
      Alert.alert('Exclusão de produto', `${error}`)
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts('');
    }, [])
  );

  if (loading) {
    return <Load />
  };

  return (
    <Container>
      <Header type='secondary' title='Cardápio' />

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuSubHeader>
        <MenuItemsNumber>Total de produtos: {products.length}</MenuItemsNumber>
      </MenuSubHeader>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductListItem
            data={(item)}
            onPress={() => handleSelectProduct(item.id)}
            onSwipeableLeftOpen={() => handleProductSwipeLeft(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchProducts} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 250,
          marginHorizontal: 24
        }}
      />
    </Container>
  );
}