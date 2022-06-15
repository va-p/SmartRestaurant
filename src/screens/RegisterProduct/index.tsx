import React, { useCallback, useState } from 'react';
import { Alert, Platform } from 'react-native';
import {
  Container,
  ContentScroll,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroupHeader,
  MaxCharacters
} from './styles';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { ControlledInputProductCategory } from '@components/Form/ControlledInputProductCategory';
import { ControlledInput } from '@components/Form/ControlledInput';
import { InputPrice } from '@components/Form/InputPrice';
import { ProductImage } from '@components/ProductImage';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Load } from '@components/Load';

import { selectProductId } from '@slices/productSlice';
import { selectUserTenantId } from '@slices/userSlice';

import api from '@api/api';

type FormData = {
  name: string;
  description: string;
  category: string;
  image: string;
  priceSizeP: number;
  priceSizeM: number;
  priceSizeG: number;
  priceSizeGG: number;
}

/* Validation Form - Start */
const schema = Yup.object().shape({
  name: Yup.string().required("Digite o nome do produto"),
  description: Yup.string().required("Digite a descrição do produto"),
  category: Yup.string().required("Selecione a categoria do produto"),
  priceSizeP: Yup.number().required("Digite o valor do produto").typeError("Digite apenas números"),
  priceSizeM: Yup.number().required("Digite o valor do produto").typeError("Digite apenas números"),
  priceSizeG: Yup.number().required("Digite o valor do produto").typeError("Digite apenas números"),
  priceSizeGG: Yup.number().required("Digite o valor do produto").typeError("Digite apenas números"),
});
/* Validation Form - End */

export function RegisterProduct() {
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productImageBase64, setProductImageBase64] = useState<string>();
  const [productCategories, setProductCategories] = useState([]);
  const [productCategorySelected, setProductCategorySelected] = useState('');
  const tenantId = useSelector(selectUserTenantId);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const productId = useSelector(selectProductId);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
        const categories = data.map(category => category.name);
        setProductCategories(categories);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Categorias de Produtos", "Não foi possível buscar as categorias de produtos. Verifique sua conexão com a internet e tente novamente.");
    }
  };

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        base64: true
      });
      if (!response.cancelled) {
        setProductImageUrl(response.uri);
        setProductImageBase64(response.base64);
      }
    } else {
      Alert.alert("Permissão de acesso à biblioteca de mídia negada.")
    }
  };

  async function handleAddProduct(data: FormData) {
    setButtonIsLoading(true);
    try {
      const newProductImage = {
        //Interpolando o prefixo de uma imagem jpeg codificada em base64 com o código base64 da imagem selecionada
        content: `data:image/jpeg;base64,${productImageBase64}`,
        tenant_id: tenantId
      }
      const productImageDataResponse = await api.post('upload/product_image', newProductImage);
      if (productImageDataResponse.status !== 200) {
        Alert.alert("Upload da imagem do produto", "Não foi possível fazer upload da imagem do produto. Tente novamente em alguns instantes.")
      }
      const productCategoryDataResponse = await api.get('single_product_category', {
        params: {
          tenant_id: tenantId,
          name: productCategorySelected
        }
      });
      if (productCategoryDataResponse.status !== 200) {
        Alert.alert("Categorias de Produtos", "Não foi possível buscar as categorias de produtos. Verifique sua conexão com a internet e tente novamente.")
      }
      const newProduct = {
        name: data.name,
        description: data.description,
        product_category_id: productCategoryDataResponse.data.id,
        product_image_id: productImageDataResponse.data.id,
        tenant_id: tenantId
      }
      const productDataResponse = await api.post('product', newProduct);
      if (productDataResponse.status === 200) {
        Alert.alert("Cadastro de Produto", "Produto cadastrado com sucesso!", [{ text: "Cadastrar novo produto" }, { text: "Voltar para a home", onPress: () => navigation.navigate('Cardápio') }]);
      };
      setButtonIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Cadastro de Produto", "Não foi possível cadastrar o produto. Por favor, verifique os campos e tente novamente.");
      setButtonIsLoading(false);
    };
  };

  async function fetchProduct() {
    setLoading(true);
    try {
      const { data } = await api.get('product', {
        params: {
          tenant_id: tenantId,
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

  useFocusEffect(
    useCallback(() => {
      fetchProductCategories();
      if (productId) {
        fetchProduct();
      }
    }, [productId])
  );

  if (loading) {
    return <Load />
  };
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header type='primary' title='Cadastrar produto' />

      <ContentScroll>
        <Upload>
          <ProductImage uri={productImageUrl} />

          <PickImageButton
            title='Carregar'
            type='secondary'
            onPress={handlePickerImage}
          />
        </Upload>

        <Form>
          <ControlledInputProductCategory
            label='Categoria'
            data={productCategories}
            onSelect={(selectedItem) => {
              setProductCategorySelected(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem
            }}
            rowTextForSelection={(item) => {
              return item
            }}
            name='category'
            control={control}
            error={errors.category}
          />

          <ControlledInput
            type='secondary'
            label='Nome'
            autoCapitalize='words'
            autoCorrect={false}
            name='name'
            control={control}
            error={errors.name}
          />

          <InputGroupHeader>
            <Label>Descrição</Label>
            <MaxCharacters>0 de 60 caracteres</MaxCharacters>
          </InputGroupHeader>
          <ControlledInput
            type='secondary'
            autoCapitalize='sentences'
            autoCorrect={true}
            multiline
            maxLength={60}
            name='description'
            control={control}
            error={errors.description}
            style={{ height: 80 }}
          />

          <Label>Tamanhos e valores</Label>
          <InputPrice
            size='P'
            keyboardType='numeric'
            name='priceSizeP'
            control={control}
            error={errors.priceSizeP}
          />
          <InputPrice
            size='M'
            keyboardType='numeric'
            name='priceSizeM'
            control={control}
            error={errors.priceSizeM}
          />
          <InputPrice
            size='G'
            keyboardType='numeric'
            name='priceSizeG'
            control={control}
            error={errors.priceSizeG}
          />
          <InputPrice
            size='GG'
            keyboardType='numeric'
            name='priceSizeGG'
            control={control}
            error={errors.priceSizeGG}
          />

          <Button
            title='Cadastrar produto'
            isLoading={buttonIsLoading}
            onPress={handleSubmit(handleAddProduct)}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}