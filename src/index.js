import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native'

import SplashScreen from 'react-native-splash-screen'
import { StackNavigator } from 'react-navigation'
import { useStrict } from 'mobx'
import { observer } from 'mobx-react/native'

useStrict(true)

const users = ['Jim', 'Dev', 'Guo', 'Dai']

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  }

  _onPress() {
    const { navigate } = this.props.navigation
    navigate('Chat', { user: users[Math.floor(Math.random() * users.length)] })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={this._onPress.bind(this)}>
          <View style={{
            width: 90,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            borderRadius: 2,
            flexDirection: 'row',
            backgroundColor: '#009688',
            elevation: 4,
          }}>
            <Text style={{ color: 'white' }}>Go Chat!</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  })

  render() {
    const { params } = this.props.navigation.state

    return (
      <View style={styles.container}>
        <Text>Chat with {params.user}</Text>
      </View>
    )
  }
}

const SimpleApp = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Chat: {
    screen: ChatScreen,
  },
}, {
  navigationOptions: {
    headerTintColor: 'white',
    style: {
      paddingTop: 20
    }
  }
})

export default class App extends React.Component {
  static a = 1

  componentDidMount() {
    setTimeout(_ => {
      SplashScreen.hide()
    }, 1000)
  }

  render() {
    return <SimpleApp style={{ backgroundColor: '#424242' }} />
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
})
