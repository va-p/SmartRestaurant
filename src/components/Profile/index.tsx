import React from 'react';
import { View, Text } from 'react-native';

import { Avatar } from '../Avatar';

import { styles } from './styles';

export function Profile() {
  return (
    <View style={styles.container}>

      <Avatar urlImage='https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png' />

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>

          <Text style={styles.username}>
          </Text>
        </View>

        <Text style={styles.message}>

        </Text>
      </View>
    </View>
  )
}