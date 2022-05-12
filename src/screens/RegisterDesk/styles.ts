import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Title = styled.Text`
  text-align: center;
  margin-top: 12px;
  font-size: ${RFValue(24)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.PRIMARY_900};
  `};
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  margin: 12px 0;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Form = styled.View`
  height: 30%;
  padding: 12px 24px;
`;