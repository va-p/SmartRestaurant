import React from 'react';
import { TextInputProps } from 'react-native';
import {
  ErrorMessage,
  Container,
  Label,
  Size,
  LabelSize,
  Input
} from './styles';

import { Control, Controller } from 'react-hook-form';

type Props = TextInputProps & {
  label?: string;
  size?: string;
  name: string;
  control: Control;
  error: string;
}

export function InputPrice({ label, size, name, control, error, ...rest }: Props) {
  return (
    <>
      {error && <ErrorMessage> {error} </ErrorMessage>}
      <Container>
        <Controller
          control={control}
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
          name={name}
        />
      </Container>
    </>

  );
}