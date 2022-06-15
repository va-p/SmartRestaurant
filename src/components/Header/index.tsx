import React from 'react';
import {
  Container,
  BackButton,
  IconBackButton,
  Title,
  TypeProps
} from './styles';

import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

type Props = BorderlessButtonProps & {
  type: TypeProps;
  title?: string;
}

export function Header({ type, title, ...rest }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  };

  return (
    <Container type={type}>
      {
        type === 'primary' ?
          <BackButton onPress={handleGoBack} {...rest}>
            <IconBackButton name='chevron-back-outline' />
          </BackButton> :
          <></>
      }

      <Title>{title}</Title>
    </Container>
  );
}