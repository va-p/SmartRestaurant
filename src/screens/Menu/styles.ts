import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
`;

export const MenuSubHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  margin: 10px 0px 0;
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