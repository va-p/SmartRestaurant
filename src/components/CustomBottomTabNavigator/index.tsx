import React from 'react';
import {
  Container,
  Icon,
  Notification,
  Quantity
} from './styles';

type Props = {
  iconName: string;
  color: string;
  notifications?: number | undefined;
}

export function CustomBottomTabNavigator({ iconName, color, notifications }: Props) {
  const noNotifications = notifications === 0;
  // Se notifications === 0, então noNotifications é true, se não, noNotifications é false

  return (
    <Container>
      {
        noNotifications ?
          <Icon color={color} name={iconName} /> :
          <Notification noNotifications={noNotifications}>
            <Quantity noNotifications={noNotifications}>{notifications}</Quantity>
          </Notification>
      }
    </Container>
  );
}