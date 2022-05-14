import React from 'react';
import {
  Container,
  Content,
  Image,
  Details,
  Name,
  Identification,
  Description,
  Divider
} from './styles';

import { RectButtonProps } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'styled-components/native';

export type ProductProps = {
  id: number;
  name: string;
  description: string;
  category: string;
  product_image: {
    image: {
      url: string | undefined;
    };
  };
};

type Props = RectButtonProps & {
  data: ProductProps;
};

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();
  
  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.product_image?.image?.url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Ionicons name='chevron-forward-outline' size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Divider />
    </Container>
  );
}