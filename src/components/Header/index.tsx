import React from 'react';
import {
  Container,
  BackButton,
  IconBackButton,
  Title,
  Icon,
  TypeProps
} from './styles';


type Props = {
  title?: string;
  type: TypeProps;
}

export function Header({ title, type }: Props) {
  return (
    <Container type={type}>
      {
        type === 'primary' ?
          <BackButton>
            <IconBackButton name='chevron-back-outline' />
          </BackButton> :
          <></>
      }

      <Title>{title}</Title>

      <Icon />
    </Container>
  );
}