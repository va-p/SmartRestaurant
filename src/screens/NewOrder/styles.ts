import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ContentScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicatior: false,
})`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ProductImage = styled.Image`
  width: 240px;
  height: 240px;
  align-self: center;
  position: relative;
  top: -90px;
  border-radius: 120px;
`;

export const Form = styled.View`
  padding: 24px;
  margin-top: -120px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(32)}px;
  margin-bottom: 32px;
  text-align: center;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const Label = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-bottom: 16px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const Sizes = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const FormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InputGroup = styled.View`
  width: 48%;
`;

export const Price = styled.Text`
  font-size: ${RFValue(14)}px;
  margin: 24px 0;
  align-self: flex-end;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;