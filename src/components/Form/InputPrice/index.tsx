import React from 'react';
import { TextInputProps } from 'react-native';
import {
  ErrorMessage,
  Container,
  Size,
  LabelSize,
  Input
} from './styles';

import { Control, Controller, FieldError } from 'react-hook-form';

type Props = TextInputProps & {
  label?: string;
  size?: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
}

export function InputPrice({
  size,
  name,
  control,
  error,
  ...rest
}: Props) {
  return (
    <>
      {error && <ErrorMessage> {error.message} </ErrorMessage>}
      <Container>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <>
              <Size>
                <LabelSize>{size}</LabelSize>
              </Size>

              <LabelSize>R$</LabelSize>

              <Input
                keyboardType='numeric'
                onChangeText={onChange}
                value={value}
                {...rest}
              />
            </>
          )}
        />
      </Container>
    </>

  );
}