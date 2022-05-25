import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Container,
  Title,
  Radio,
  Selected,
  RadioButtonProps
} from './styles';

type Props = RectButtonProps & RadioButtonProps & {
  title: string;
};

export function RadioButton({ title, selected = false, ...rest }: Props) {
  return (
    <Container selected={selected} {...rest}>
      <Radio>{selected && <Selected />}</Radio>

      <Title>{title}</Title>
    </Container>
  );
}