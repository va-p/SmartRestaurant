import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import theme from '@themes/index';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Indicator = styled(
  ActivityIndicator
).attrs({
  color: theme.COLORS.PRIMARY_100
})``;