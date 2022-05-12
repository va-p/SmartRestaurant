import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 22px;
  margin: 25px 24px 0;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const MenuItemsNumber = styled.Text`
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;