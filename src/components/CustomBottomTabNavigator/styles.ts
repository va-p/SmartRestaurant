import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

type NotificationProps = {
  noNotifications: boolean;
}

export const Container = styled.View`
  align-items: center;
`;

export const Icon = styled(Ionicons)`
  font-size: 20px;
`;

export const Notification = styled.View<NotificationProps>`
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;

export const Quantity = styled.Text<NotificationProps>`
    font-size: ${RFValue(12)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `};
`;