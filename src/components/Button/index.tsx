import React from 'react';
import {
  Container,
  Title,
  Load,
  TypeProps
} from './styles';

import { RectButtonProps } from 'react-native-gesture-handler';

type Props = RectButtonProps & {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
};

export function Button({ title, type = 'primary', isLoading = false, ...rest }: Props) {
  return (
    <Container
      type={type}
      {...rest}
    >
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  );
}