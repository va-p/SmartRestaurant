import React from 'react';
import { Animated } from 'react-native';
import {
  Container,
  Content,
  CategoryName,
  DeleteButton,
  DeleteButtonIcon,
  DeleteButtonText,
} from './styles';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { selectUserRole } from '@slices/userSlice';

export type ProductCategoryProps = {
  name: string;
}

type Props = RectButtonProps & {
  data: ProductCategoryProps;
  onSwipeableLeftOpen: () => void;
}

export function ProductCategoryListItem({
  data,
  onSwipeableLeftOpen,
  ...rest
}: Props) {
  const userRole = useSelector(selectUserRole);

  function handleProductCategorySwipeLeft(
    progressAnimatedValue: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation
  ) {
    const delay = progressAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, -50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    if (userRole === 'admin') {
      return (
        <DeleteButton style={{ opacity }}>
          <DeleteButtonText>Excluir</DeleteButtonText>
          <DeleteButtonIcon name='trash-outline' />
        </DeleteButton>
      )
    }
  };
  return (
    <Container>
      <Swipeable
        renderRightActions={handleProductCategorySwipeLeft}
        onSwipeableOpen={onSwipeableLeftOpen}
      >
        <Content {...rest}>
          <CategoryName>
            {data.name}
          </CategoryName>
        </Content>
      </Swipeable>
    </Container>
  );
}