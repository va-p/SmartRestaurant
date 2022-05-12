import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import {
  Container
} from './styles';

import { useNavigation } from '@react-navigation/native';

import { ProductCard, ProductProps } from '@components/ProductCard';
import { Header } from '@components/Header';
import { Search } from '@components/Search';
import { Load } from '@components/Load';

import api from '@api/api';

export function Menu() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

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

  function handleProductSelect(id: string) {
    navigation.navigate('order', { id });
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
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            data={(item)}
            onPress={() => handleProductSelect(item.id)}
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