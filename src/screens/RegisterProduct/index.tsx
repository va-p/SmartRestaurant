import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView
} from 'react-native';
import {
  Container,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { ProductNavigationProps } from 'src/@types/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { InputCategory } from '@components/Form/InputCategory';
import { InputPrice } from '@components/Form/InputPrice';
import { ProductImage } from '@components/ProductImage';
import { InputForm } from '@components/Form/InputForm';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Load } from '@components/Load';

import { selectProductId } from '@slices/productSlice';

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
  name: Yup.string().required('Digite o nome do produto'),
  description: Yup.string().required('Digite a descrição do produto'),
  category: Yup.string().required('Selecione a categoria do produto'),
  priceSizeP: Yup.number().required('Digite o valor do produto').typeError('Digite apenas números'),
  priceSizeM: Yup.number().required('Digite o valor do produto').typeError('Digite apenas números'),
  priceSizeG: Yup.number().required('Digite o valor do produto').typeError('Digite apenas números'),
  priceSizeGG: Yup.number().required('Digite o valor do produto').typeError('Digite apenas números'),
});
/* Validation Form - End */

export function RegisterProduct() {
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productImageBase64, setProductImageBase64] = useState<string>();
  const [categories, setCategories] = useState([]);
  const [productCategory, setProductCategory] = useState('');
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const productId = useSelector(selectProductId);
  const navigation = useNavigation();

  console.log(productId);

  async function fetchProductCategories() {
    setLoading(true);
    try {
      const { data } = await api.get('product_category');
      if (!data) {
      } else {
        setCategories(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
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
      Alert.alert('Permissão de acesso à biblioteca de mídia negada.')
    }
  };

  async function handleAddProduct(form: FormData) {
    setButtonIsLoading(true);
    try {
      const newProductImage = {
        //Interpolando o prefixo de uma imagem jpeg codificada em base64 com o código base64 da imagem selecionada
        content: `data:image/jpeg;base64,${productImageBase64}`
      }
      const productImageDataResponse = await api.post('upload/product_image', newProductImage);
      if (productImageDataResponse.status === 200) {
      } else {
        Alert.alert('Erro ao fazer upload da imagem do produto. Tente novamente em alguns instantes.')
      }

      const newProduct = {
        name: form.name,
        description: form.description,
        category: form.category,
        product_image_id: productImageDataResponse.data.id
      }
      const productDataResponse = await api.post('product', newProduct);
      if (productDataResponse.status === 200) {
        Alert.alert('Cadastro de Produto', 'Produto cadastrado com sucesso!', [{ text: 'Cadastrar novo produto' }, { text: 'Voltar para a home', onPress: () => navigation.navigate('Cardápio') }]);
      };
      setButtonIsLoading(false);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Cadastro de Produto', 'Não foi possível cadastrar o produto. Por favor, verifique os campos e tente novamente.');
      //throw new Error(error);
      setButtonIsLoading(false);
    };
  };

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
        console.log(data);
        setProduct(data);
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
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Header type='primary' title='Cadastrar produto' />

        <Upload>
          <ProductImage uri={productImageUrl} />

          <PickImageButton
            title='Carregar'
            type='secondary'
            onPress={handlePickerImage}
          />
        </Upload>

        <Form>
          <InputGroup>
            <InputCategory
              label='Categoria'
              name='category'
              control={control}
              error={errors.category && errors.category.message}
            />
          </InputGroup>

          <InputGroup>
            <InputForm
              label='Nome'
              autoCapitalize='words'
              autoCorrect={false}
              name='name'
              control={control}
              error={errors.name && errors.name.message}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <InputForm
              autoCapitalize='sentences'
              autoCorrect={true}
              multiline
              maxLength={60}
              name='description'
              control={control}
              error={errors.description && errors.description.message}
              style={{ height: 80 }}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e valores</Label>
            <InputPrice
              size='P'
              name='priceSizeP'
              control={control}
              error={errors.priceSizeP && errors.priceSizeP.message}
            />
            <InputPrice
              size='M'
              name='priceSizeM'
              control={control}
              error={errors.priceSizeM && errors.priceSizeM.message}
            />
            <InputPrice
              size='G'
              name='priceSizeG'
              control={control}
              error={errors.priceSizeG && errors.priceSizeG.message}
            />
            <InputPrice
              size='GG'
              name='priceSizeGG'
              control={control}
              error={errors.priceSizeGG && errors.priceSizeGG.message}
            />
          </InputGroup>

          <Button
            title='Cadastrar produto'
            isLoading={buttonIsLoading}
            onPress={handleSubmit(handleAddProduct)}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}