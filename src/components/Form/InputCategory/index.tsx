import React, { useState } from 'react';
import {
  Container,
  ErrorMessage,
  Label
} from './styles';

import { Picker, PickerProps } from '@react-native-picker/picker';
import { Control, Controller } from 'react-hook-form';

type Props = PickerProps & {
  label?: string;
  name: string;
  control: Control;
  error: string;
}

export function InputCategory({ label, name, control, error, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            {error && <ErrorMessage> {error} </ErrorMessage>}

            <Label>
              {label}
            </Label>

            <Picker
              onValueChange={onChange}
              selectedValue={value}
              {...rest}
            >
              <Picker.Item label="Selecione a categoria" value="Selecione a categoria" />
              <Picker.Item label="Cerveja" value="Cerveja" />
              <Picker.Item label="Drink" value="Drink" />
              <Picker.Item label="Hambúrguer" value="Hambúrguer" />
              <Picker.Item label="Pizza" value="Pizza" />
              <Picker.Item label="Sobremesa" value="Sobremesa" />
            </Picker>
          </>
        )}
        name={name}
      />
    </Container>
  );
}