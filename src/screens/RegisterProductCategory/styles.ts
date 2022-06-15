import styled, { css } from 'styled-components/native';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ContentList = styled.View`
  padding: 12px 24px;
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

export const ContentScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48
  },
})``;

export const Form = styled.View`
  min-height: 30%;
  padding: 12px 24px;
`;