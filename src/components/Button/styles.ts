import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type: TypeProps;
}

export const Container = styled(RectButton) <ContainerProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  background-color: ${({ theme, type }) => type === 'primary' ? theme.COLORS.SUCCESS_900 : theme.COLORS.PRIMARY_800};
  border-radius: 12px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE,
}))``;