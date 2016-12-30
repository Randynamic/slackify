// @flow

import React from 'react'
import { ScrollView, Image, View } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyle'

export default class PresentationScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.slackify} style={styles.logo} />
          </View>

          <RoundedButton onPress={NavigationActions.login}>
            Login
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.deviceInfo}>
            Device Info Screen
          </RoundedButton>

        </ScrollView>
      </View>
    )
  }
}
