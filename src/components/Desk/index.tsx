import React from 'react';
import {
  Container,
  NumberDesk,
  TypeProps
} from './styles';

import { RectButtonProps } from 'react-native-gesture-handler';

export interface DeskProps {
  number: number;
  type: TypeProps;
};

type Props = RectButtonProps & {
  data: DeskProps;
}

export function Desk({ data, ...rest }: Props) {
  return (
    <Container
      {...data.type}
      {...rest}
    >
      <NumberDesk>
        {data.number}
      </NumberDesk>
    </Container>
  );
}