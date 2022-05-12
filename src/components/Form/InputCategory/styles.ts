import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  margin-bottom: 16px;
`;

export const ErrorMessage = styled.Text`
  font-size: ${RFValue(14)}px;
  padding-left: 5px;
  color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Label = styled.Text`
  padding-bottom: 5px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;