import React from 'react';
import { TextInputProps } from 'react-native';
import {
  Container,
  InputArea,
  Input,
  ButtonClear,
  Button
} from './styles';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'styled-components/native';

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
}

export function Search({ onSearch, onClear, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container>
      <InputArea>
        <Input placeholder='Pesquisar...' {...rest} />

        <ButtonClear onPress={onClear}>
          <Ionicons name='close-outline' size={16} />
        </ButtonClear>
      </InputArea>

      <Button onPress={onSearch}>
        <Ionicons name='search-outline' size={16} color={COLORS.TITLE} />
      </Button>
    </Container>
  );
}