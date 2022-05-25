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

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'styled-components/native';

export type ProductProps = {
  id: number;
  name: string;
  description: string;
  category: string;
  product_image: {
    image: {
      url: string | undefined;
    };
  };
};

type Props = RectButtonProps & {
  data: ProductProps;
  onSwipeLeft: () => void;
};

export function ProductCard({ data, onSwipeLeft, ...rest }: Props) {
  const { COLORS } = useTheme();

  function handleSwipeLeft(progressAnimatedValue: Animated.AnimatedInterpolation, dragAnimatedValue: Animated.AnimatedInterpolation) {
    const delay = progressAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, -50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <DeleteButton style={{ opacity }}>
        <DeleteButtonText>Excluir</DeleteButtonText>
        <DeleteButtonIcon name='trash-outline' />
      </DeleteButton>
    )
  };

  return (
    <Container>
      <Swipeable
        renderRightActions={handleSwipeLeft}
        onSwipeableRightOpen={onSwipeLeft}
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