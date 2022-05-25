import React from 'react';
import {
  Container,
  Icon,
  TextContainer,
  Title,
  Notification,
  Quantity
} from './styles';

type Props = {
  iconName: string;
  title: string;
  color: string;
  notifications?: string | undefined;
}

export function CustomBottomTabNavigator({ iconName, title, color, notifications }: Props) {
  const noNotifications = notifications === '0';

  return (
    <Container>
      <Icon name={iconName} />

      <TextContainer>
        <Title color={color}>{title}</Title>

        {
          notifications && (
            <Notification noNotifications={noNotifications}>
              <Quantity noNotifications={noNotifications}>{notifications}</Quantity>
            </Notification>
          )
        }
      </TextContainer>

    </Container>
  );
}