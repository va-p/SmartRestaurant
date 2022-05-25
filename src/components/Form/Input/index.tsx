import React from 'react';
import { TextInputProps } from 'react-native';
import {
  Container,
  Label,
  TypeProps
} from './styles';

type Props = TextInputProps & {
  type?: TypeProps;
  label?: string;
}

export function Input({ type = 'primary', label, ...rest }: Props) {
  return (
    <>
      <Label>
        {label}
      </Label>
      <Container
        type={type}
        {...rest}
      >
      </Container>
    </>
  );
}