import React, { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import {
  Container,
  MenuSubHeader,
  MenuItemsNumber
} from './styles';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { ProductCard, ProductProps } from '@components/ProductCard';
import { Header } from '@components/Header';
import { Search } from '@components/Search';
import { Load } from '@components/Load';

import { setProductId } from '@slices/productSlice';
import { selectUserName } from '@slices/userSlice';

import api from '@api/api';

export function ManageMenu() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  //console.log(userName);

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

  const handleDeleteProduct = async () => {
    try {
      const response = await api.delete('product', {
        params: {
          product_id: selectedProduct?.id
        }
      });
      console.log(response);
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

      <MenuSubHeader>
        <MenuItemsNumber>Total de produtos: {products.length}</MenuItemsNumber>
      </MenuSubHeader>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            data={(item)}
            onPress={() => {
              setSelectedProduct(item);

              dispatch(
                setProductId(item.id)
              );

              navigation.navigate('Cadastrar Produto')
            }}
            onSwipeLeft={() => {
              setSelectedProduct(item);

              Alert.alert('Exclusão de produto', 'Tem certeza que deseja excluir o produto?', [{ text: 'Não, cancelar a exclusão.' }, { text: 'Sim, excluir o produto.', onPress: () => handleDeleteProduct() }])
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