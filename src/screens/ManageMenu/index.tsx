import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import {
  Container
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { ProductCard, ProductProps } from '@components/ProductCard';
import { Header } from '@components/Header';
import { Search } from '@components/Search';
import { Load } from '@components/Load';

import api from '@api/api';
import { setProductId } from '@slices/productSlice';

export function ManageMenu() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  async function fetchProducts(value: string) {
    setLoading(true);
    try {
      const formattedValue = value.toLocaleLowerCase().trim();
      const { data } = await api.get('product');
      if (!data) {

      } else {
        setProducts(data);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Produtos', 'Não foi possível buscar os produtos. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  function handleSearch() {
    fetchProducts(search);
  };

  function handleSearchClear() {
    setSearch('');
    fetchProducts('');
  };

  useEffect(() => {
    fetchProducts('');
  }, []);

  if (loading) {
    return <Load />
  };

  return (
    <Container>
      <Header
        type='secondary'
        title='Cardápio'
      />

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            data={(item)}
            onPress={() => {
              dispatch(
                setProductId(item.id)
              );

              navigation.navigate('Cadastrar Produto')
            }}
          />
        )}
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