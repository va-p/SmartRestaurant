import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Image = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const Placeholder = styled.View`
  width: 160px;
  height: 160px;
  align-items: center;
  justify-content: center;
  border: 1px dashed ${({ theme }) => theme.COLORS.SECONDARY_900};
  border-radius: 80px;
`;

export const PlaceholderTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css `
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;