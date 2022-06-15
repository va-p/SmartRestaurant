import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '@components/Button';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ContentScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})
``;

export const Upload = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 32px 0px;
`;

export const PickImageButton = styled(Button)`
  max-width: 90px;
  margin-left: 32px;  
`;

export const Form = styled.View`
  width: 100%;
  padding: 12px 24px;
`;

export const InputGroupHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: -45px;
  justify-content: space-between;
`;

export const Label = styled.Text`
  font-size: ${RFValue(14)}px;
  padding-top: 25px;
  padding-bottom: 8px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const MaxCharacters = styled.Text`
  font-size: ${RFValue(10)}px;
  padding-top: 25px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;