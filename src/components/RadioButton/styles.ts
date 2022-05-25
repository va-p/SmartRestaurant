import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export type RadioButtonProps = {
  selected: boolean;
}

export const Container = styled(RectButton) <RadioButtonProps>`
  width: 104px;
  height: 82px;
  padding: 14px 16px;
  margin-right: 10px;
  ${({ theme, selected }) => css`
    border: 1px solid ${selected ? theme.COLORS.SUCCESS_900 : theme.COLORS.SHAPE};
    background-color: ${selected ? theme.COLORS.SUCCESS_50 : theme.COLORS.TITLE};
  `};
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
  `};
`;

export const Radio = styled.View`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY_900};
  border-radius: 10px;
`;

export const Selected = styled.View`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_900};
  border-radius: 4px;
`;