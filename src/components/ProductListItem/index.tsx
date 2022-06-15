import React from 'react';
import { Animated } from 'react-native';
import {
  Container,
  Content,
  Image,
  Details,
  Name,
  Identification,
  Description,
  Divider,
  DeleteButton,
  DeleteButtonIcon,
  DeleteButtonText
} from './styles';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'styled-components/native';

import { selectUserRole } from '@slices/userSlice';

export type ProductProps = {
  name: string;
  description: string;
  category: string;
  product_image: {
    image: {
      url: string | undefined;
    };
  };
}

type Props = RectButtonProps & {
  data: ProductProps;
  onSwipeableLeftOpen: () => void;
}

export function ProductListItem({ data, onSwipeableLeftOpen, ...rest }: Props) {
  const { COLORS } = useTheme();
  const userRole = useSelector(selectUserRole);

  function handleProductSwipeLeft(
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
        renderRightActions={handleProductSwipeLeft}
        onSwipeableOpen={onSwipeableLeftOpen}
      >
        <Content {...rest}>
          <Image source={{ uri: data.product_image?.image?.url }} />

          <Details>
            <Identification>
              <Name>{data.name}</Name>
              <Ionicons name='chevron-forward-outline' size={18} color={COLORS.SHAPE} />
            </Identification>

            <Description>{data.description}</Description>
          </Details>
        </Content>
      </Swipeable>
      <Divider />
    </Container>
  );
}