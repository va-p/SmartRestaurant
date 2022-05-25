import React from 'react';
import {
  Container,
  GreetingContainer,
  Greeting,
  UserName
} from './styles';

import { useSelector } from 'react-redux';

import { Avatar } from '../Avatar';

import { selectUserName } from '@slices/userSlice';

export function UserProfileHeader() {
  const userName = useSelector(selectUserName);

  return (
    <Container>
      <Avatar urlImage='https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png' />

      <GreetingContainer>
        <Greeting>
          Olá,
        </Greeting>

        <UserName>
          {userName}
        </UserName>
      </GreetingContainer>
    </Container>
  )
}