import theme from '@themes/index';
import React from 'react';
import {
  Container,
  AvatarImage
} from './styles';

type Props = {
  urlImage: string;
}

export function Avatar({ urlImage }: Props) {
  return (
    <Container
      colors={[theme.COLORS.PRIMARY_900, theme.COLORS.SECONDARY_900]}
    >
      <AvatarImage
        source={{ uri: urlImage }}
      />
    </Container>
  );
}

