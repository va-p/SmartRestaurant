import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

type ContainerProps = {
  index: number;
}

export type StatusTypesProps = 'Pendente' | 'Preparando' | 'Pronto' | 'Entregue' | 'Cancelado';

type StatusProps = {
  status: StatusTypesProps;
}

export const Container = styled.View <ContainerProps>`
  width: 50%;
  align-items: center;
  padding: 24px;
  ${({ theme, index }) => css`
    border-right-width: ${index % 2 > 0 ? 0 : 1}px;
    border-right-color: ${theme.COLORS.SHAPE};
  `};
`;

export const Content = styled(RectButton)`
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-top: 21px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-top: 21px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_400};
  `};
`;

export const StatusContainer = styled.View<StatusProps>`
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  margin-top: 16px;
  border-radius: 12px;
  ${({ theme, status }) => status === 'Pendente' && css`
    background-color: ${theme.COLORS.PRIMARY_800};
    border: 1px solid ${theme.COLORS.SECONDARY_900};
  ` };
  ${({ theme, status }) => status === 'Preparando' && css`
    background-color: ${theme.COLORS.ALERT_50};
    border: 1px solid ${theme.COLORS.ALERT_900};
  ` };
  ${({ theme, status }) => status === 'Pronto' && css`
    background-color: ${theme.COLORS.SUCCESS_400};
    border: 1px solid ${theme.COLORS.SUCCESS_900};
  ` };
  ${({ theme, status }) => status === 'Entregue' && css`
    background-color: ${theme.COLORS.SUCCESS_900};
  ` };
  ${({ theme, status }) => status === 'Cancelado' && css`
    background-color: ${theme.COLORS.SECONDARY_400};
  ` };
`;

export const StatusLabel = styled.Text<StatusProps>`
  font-size: 12px;
  line-height: 20px;
  ${({ theme, status }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${status === 'Preparando' ? theme.COLORS.ALERT_900 : theme.COLORS.TITLE};
  ` };
`;