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
  id: string;
  photoUrl: string;
  name: string;
  description: string;
}

type Props = RectButtonProps & {
  data: ProductProps;
}

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photoUrl }} />

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