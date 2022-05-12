import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  margin-top: -30px;
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  ${({theme}) => css`
    background-color: ${theme.COLORS.TITLE};
    border: 1px solid ${theme.COLORS.SHAPE};
  `};
`;

export const Input = styled(TextInput)`
  flex: 1;
  width: 52px;
  padding-left: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
`;

export const ButtonClear = styled.TouchableOpacity`
  margin-right: 7px;
`;

export const Button = styled(RectButton)`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  margin-left: 7px;
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
  border-radius: 18px;
`;