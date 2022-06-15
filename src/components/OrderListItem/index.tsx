import React from 'react';
import {
  Container,
  Content,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
  StatusTypesProps
} from './styles';

import { RectButtonProps } from 'react-native-gesture-handler';

type Props = RectButtonProps & {
  index: number;
}

export function OrderListItem({ index, ...rest }: Props) {
  return (
    <Container index={index} >
      <Content {...rest}>
        <Image source={{ uri: 'https://avatars.githubusercontent.com/u/86264374?s=400&u=1f5068f1cd425601df99567d3419c77a6fab80f9&v=4' }} />

        <Name>Margherita</Name>

        <Description>
          Mesa • 2 Qnt: 1
        </Description>

        <StatusContainer status='Preparando'>
          <StatusLabel status='Preparando'>Preparando</StatusLabel>
        </StatusContainer>
      </Content>

    </Container>
  );
}