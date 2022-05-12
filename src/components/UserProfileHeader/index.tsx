import React from 'react';
import {
  Container,
  GreetingContainer,
  Greeting,
  UserName
} from './styles';

import { Avatar } from '../Avatar';

import { useAuth } from '../../contexts/auth';

export function UserProfileHeader() {
  const userData = useAuth();

  return (
    <Container>
      <Avatar urlImage='https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png' />

      <GreetingContainer>
        <Greeting>
          Olá,
        </Greeting>

        <UserName>
          {userData.user.name}
        </UserName>
      </GreetingContainer>
    </Container>
  )
}