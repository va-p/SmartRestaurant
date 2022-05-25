import React from 'react';
import { TextInputProps } from 'react-native';
import {
  Container,
  ErrorMessage
} from './styles';

import { Control, Controller } from 'react-hook-form';

import { TypeProps } from '../Input/styles';
import { Input } from '../Input';

interface Props extends TextInputProps {
  type?: TypeProps;
  label?: string;
  name: string;
  control: Control;
  error: string;
}

export function InputForm({ type, label, name, control, error, ...rest }: Props) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            {error && <ErrorMessage> {error} </ErrorMessage>}

            <Input
              type={type}
              label={label}
              onChangeText={onChange}
              value={value}
              {...rest}
            />
          </>
        )}
      />
    </Container>
  );
}