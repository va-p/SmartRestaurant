import React, { ReactNode } from 'react';
import { Modal, ModalProps } from 'react-native';
import {
  Overlay,
  Header,
  Icon,
  Title,
  Container
} from './styles';

import { BorderlessButton, GestureHandlerRootView } from 'react-native-gesture-handler';

export type Props = ModalProps & {
  children: ReactNode;
  closeModal: () => void;
  title: string;
}

export function ModalView({ children, closeModal, title, ...rest }: Props) {

  return (
    <Modal
      transparent
      animationType='slide'
      statusBarTranslucent
      {...rest}
    >
      <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
        <Overlay>
          <Header>
            <BorderlessButton onPress={closeModal}>
              <Icon name='close' />
            </BorderlessButton>
            <Title>
              {title}
            </Title>
          </Header>

          <Container>
            {children}
          </Container>
        </Overlay>
      </GestureHandlerRootView>
    </Modal>
  );
}