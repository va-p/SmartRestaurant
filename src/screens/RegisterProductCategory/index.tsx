import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, RefreshControl } from 'react-native';
import {
  Container,
  ContentList,
  Title,
  ContentScroll,
  Form
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { ProductCategoryListItem, ProductCategoryProps } from '@components/ProductCategoryListItem';
import { ControlledInput } from '@components/Form/ControlledInput';
import { Divider } from '@components/Divider';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Load } from '@components/Load';

import { selectUserRole, selectUserTenantId } from '@slices/userSlice';

import api from '@api/api';

type FormData = {
  name: string;
}

type DataListProps = ProductCategoryProps & {
  id: string;
}

/* Validation Form - Start */
const schema = Yup.object().shape({
  name: Yup.string().required("Digite o nome da categoria de produto")
});
/* Validation Form - End */

export function RegisterProductCategory() {
  const [loading, setLoading] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [productCategories, setProductCategories] = useState<DataListProps[]>([]);
  const tenantId = useSelector(selectUserTenantId);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const userRole = useSelector(selectUserRole);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);

  async function fetchProductCategories() {
    setLoading(true);
    try {
      const { data } = await api.get('product_category', {
        params: {
          tenant_id: tenantId
        }
      });
      if (!data) {
      } else {
        setRefreshing(false);
        setProductCategories(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Categorias de Produto", "Não foi possível buscar as categorias de produto. Verifique sua conexão com a internet e tente novamente.");
    }
  };

  async function handleAddProductCategory(data: FormData) {
    setButtonIsLoading(true);
    try {
      const newProductCategory = {
        name: data.name,
        tenant_id: tenantId
      }
      const { status } = await api.post('product_category', newProductCategory);
      if (status === 200) {
        Alert.alert("Cadastro de Categoria de Produto", "Categoria de produto cadastrada com sucesso!", [{ text: "Cadastrar nova categoria" }, { text: "Voltar para a home", onPress: () => navigation.navigate('Cardápio') }]);
      };
      fetchProductCategories();
      setButtonIsLoading(false);
    } catch (error) {
      Alert.alert("Cadastro de Categoria de Produto", "Categoria de produto já cadastrada. Por favor, digite outro nome para a categoria de produto.", [{ text: "Tentar novamente" }, { text: "Voltar para a home", onPress: () => navigation.navigate('Cardápio') }]);
      setButtonIsLoading(false);
    };
  };

  async function handleProductCategorySwipeLeft(id: string) {
    if (userRole === 'admin') {
      Alert.alert("Exclusão de categoria de produto", "Tem certeza que deseja excluir a categoria?", [{ text: "Não, cancelar a exclusão." }, { text: "Sim, excluir a categoria.", onPress: () => handleDeleteProductCategory(id) }])

    } else {
      Alert.alert("Exclusão de categoria de produto", "Somente administradores podem excluir categorias de produto.")
    }
  };

  const handleDeleteProductCategory = async (id: string) => {
    try {
      await api.delete('delete_product_category', {
        params: {
          product_category_id: id
        }
      });
      fetchProductCategories();
      Alert.alert("Exclusão de categoria de produto", "Categoria de produto excluída com sucesso!")
    } catch (error) {
      Alert.alert("Exclusão de categoria de produto", `${error}`)
    }
  };

  useEffect(() => {
    fetchProductCategories();
  }, [])

  if (loading) {
    return <Load />
  }
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header type='primary' title='Cadastrar categoria' />

      <ContentList>
        <Title>Categorias cadastradas</Title>
        <FlatList
          data={productCategories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProductCategoryListItem
              data={item}
              onSwipeableLeftOpen={() => handleProductCategorySwipeLeft(item.id)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchProductCategories} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20
          }}
        />
      </ContentList>

      <Divider />
      
      <ContentScroll>
        <Title>Cadastrar nova categoria</Title>
        <Form>
          <ControlledInput
            type='secondary'
            label='Nome da categoria'
            autoCapitalize='words'
            autoCorrect={true}
            name='name'
            control={control}
            error={errors.name}
          />

          <Button
            title='Cadastrar categoria'
            isLoading={buttonIsLoading}
            onPress={handleSubmit(handleAddProductCategory)}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}