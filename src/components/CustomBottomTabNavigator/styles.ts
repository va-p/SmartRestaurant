import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

type TitleProps = {
  color: string;
};

type NotificationProps = {
  noNotifications: boolean;
}

export const Container = styled.View`
  height: 72px;
  
  align-items: center;
`;

export const Icon = styled(Ionicons)`
  font-size: 20px;
`;

export const TextContainer = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 18px;
  ${({ theme, color }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${color};
  `};
`;

export const Notification = styled.View<NotificationProps>`
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  margin-left: 8px;
  border-radius: 12px;
  ${({ noNotifications, theme }) => !noNotifications && css`
    background-color: ${theme.COLORS.SUCCESS_900};
  `};
  ${({ noNotifications, theme }) => noNotifications && css`
    background-color: transparent;
    border: 1px solid ${theme.COLORS.SHAPE};
  `};
`;

export const Quantity = styled.Text<NotificationProps>`
    font-size: ${RFValue(12)}px;
  ${({ noNotifications, theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${noNotifications ? theme.COLORS.SECONDARY_500 : theme.COLORS.TITLE};
    border: 1px solid ${theme.COLORS.SHAPE};
  `};
`;