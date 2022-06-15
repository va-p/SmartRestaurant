import React from 'react';
import {
  Container,
  NumberDesk,
  TypeProps
} from './styles';

import { RectButtonProps } from 'react-native-gesture-handler';

export type DeskProps = {
  number: number;
  status: TypeProps;
}

type Props = RectButtonProps & {
  data: DeskProps;
}

export function DeskListItem({ data, ...rest }: Props) {
  return (
    <Container {...data.status} {...rest}>
      <NumberDesk>
        {data.number}
      </NumberDesk>
    </Container>
  );
}