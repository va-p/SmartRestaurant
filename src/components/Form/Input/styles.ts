import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export type TypeProps = 'primary' | 'secondary';

type Props = {
  type: TypeProps;
}

export const Label = styled.Text <Props>`
  font-size: ${RFValue(14)}px;
  padding-top: 8px;
  padding-bottom: 8px;
  ${({ theme, type }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${type === 'primary' ? theme.COLORS.TITLE : theme.COLORS.SECONDARY_900};
  `};
`;

export const Container = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor: type === 'primary' ? theme.COLORS.TITLE : theme.COLORS.SECONDARY_900
})) <Props>`
  width: 100%;
  height: 56px;
  font-size: ${RFValue(14)}px;
  padding: 7px 0;
  padding-left: 20px;
  background-color: transparent;
  border-radius: 12px;
  ${({ theme, type }) => css`
    font-family: ${theme.FONTS.TEXT};
    border: 1px solid ${theme.COLORS.SHAPE};
    color: ${type === 'primary' ? theme.COLORS.TITLE : theme.COLORS.SECONDARY_900};
  `};
`;