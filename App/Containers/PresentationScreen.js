// @flow

import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, Image, View, Text } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {
  render () {
    let loginView
    if (this.props.data && this.props.data.ok) {
      loginView = <View style={styles.centered}>
        <Text>{this.props.data.team}</Text>
        <Text>{this.props.data.user.real_name}</Text>
        <Image source={{uri: this.props.data.user.profile.image_1024}} style={styles.logo} />
        <Text>{this.props.data.url}</Text>
        <Image source={Images.pirate} style={styles.logo} />
      </View>
    } else {
      loginView = <View>
        <RoundedButton onPress={NavigationActions.login}>
          Login
        </RoundedButton>

        <RoundedButton onPress={NavigationActions.deviceInfo}>
          Device Info Screen
        </RoundedButton>
      </View>
    }

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.slackify} style={styles.logo} />
          </View>
          {loginView}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.login.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
