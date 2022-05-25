import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ContentFlatList = styled.FlatList.attrs({
  showsVerticalScrollIndicatior: false,
  numColumns: 2,
  contentContainerStyle: {
    paddindHorizontal: 24,
    paddingBottom: 125,
  }
})`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;