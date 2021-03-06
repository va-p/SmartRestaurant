import { Animated } from 'react-native';
import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled.View`
  width: 100%;
`;

export const Content = styled(RectButton)`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  margin-right: 20px;
  border-radius: 52px;
`;

export const Details = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  flex: 1;
  font-size: ${RFValue(20)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const Identification = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Description = styled.Text`
  margin-right: 20px;
  font-size: ${RFValue(12)}px;
  line-height: 20px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_400};
  `};
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  margin: 12px 0;
  margin-left: 124px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const DeleteButton = styled(Animated.View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 70%;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const DeleteButtonIcon = styled(Ionicons)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const DeleteButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.TITLE};
`;