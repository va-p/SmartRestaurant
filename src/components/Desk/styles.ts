import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export type TypeProps = 'busy' | 'free';

type ContainerProps = {
  type: TypeProps;
}

export const Container = styled(RectButton) <ContainerProps>`
  width: 80px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin: 8px;
  background-color: ${({ type, theme }) => type === 'busy' ? theme.COLORS.PRIMARY_800 : theme.COLORS.SUCCESS_900};
  border-radius: 8px;
`;

export const NumberDesk = styled.Text`
  color: ${({ theme }) => theme.COLORS.SHAPE};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;