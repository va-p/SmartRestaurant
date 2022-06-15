import React from 'react';
import {
  Container,
  ErrorMessage,
  Label
} from './styles';

import { Control, Controller, FieldError } from 'react-hook-form';
import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown'

type Props = SelectDropdownProps & {
  label?: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
}

export function ControlledInputProductCategory({
  label,
  name,
  control,
  error,
  ...rest
}: Props) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <>
            {error && <ErrorMessage> {error.message} </ErrorMessage>}

            <Label>{label}</Label>

            <SelectDropdown
              {...rest}
              onSelectChange={(selectedItem) => {
                onChange(selectedItem);
              }}
              defaultButtonText="Selecione a categoria do produto"
              buttonStyle={{
                width: '100%',
                borderRadius: 12
              }}
              dropdownStyle={{ borderRadius: 12 }}
            />
          </>
        )}
      />
    </Container>
  );
}