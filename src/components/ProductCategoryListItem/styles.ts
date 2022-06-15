import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled(RectButton)`
  height: 50px;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_900};
  border-radius: 8px;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export const DeleteButton = styled(Animated.View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding-left: 70%;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
  border-radius: 8px;
`;

export const DeleteButtonIcon = styled(Ionicons)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const DeleteButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.TITLE};
`;