// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void
}

class LoginScreen extends React.Component {

  props: LoginScreenProps

  state: {
    username: string,
    password: string,
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  isAttempting: boolean
  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: LoginScreenProps) {
    super(props)
    this.state = {
      username: 'reactnative@infinite.red',
      password: 'password',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      NavigationActions.pop()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin()
  }

  render () {
    let fetching
    if (this.props.fetching) {
      fetching = <View style={[Styles.loginRow]}><Text>Fetching...</Text></View>
    }

    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={Styles.form}>
          <View style={[Styles.loginRow]}>
            {fetching}
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('signIn')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={NavigationActions.pop}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('cancel')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: () => dispatch(LoginActions.loginRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
