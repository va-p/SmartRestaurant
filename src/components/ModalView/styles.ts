import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

export const Overlay = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.OVERLAY};
`;

export const Header = styled.View`
  width: 100%;
  height: 40px;
  margin-top: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 24px;
  padding-left: 24px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;