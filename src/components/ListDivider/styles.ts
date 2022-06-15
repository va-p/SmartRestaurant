import styled from 'styled-components/native';

export const Container = styled.View`
  width: 90%;
  height: 1px;
  align-self: flex-end;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_400};
`;