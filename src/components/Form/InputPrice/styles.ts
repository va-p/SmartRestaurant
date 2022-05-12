import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

export const ErrorMessage = styled.Text`
  font-size: ${RFValue(14)}px;
  padding-left: 5px;
  color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 56px;
  align-items: center;
  margin-bottom: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.SHAPE};
  border-radius: 12px;
`;

export const Label = styled.Text`
  padding-bottom: 5px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const Size = styled.View`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const LabelSize = styled.Text`
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const Input = styled(TextInput)`
  flex: 1;
  margin-left: 7px;
`;