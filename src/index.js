import React from 'react'
import {
    Easing,
    Animated,
    StatusBar,
} from 'react-native'

import SplashScreen from 'react-native-splash-screen'
import { StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'

import defaultStyles from './styles'

import ImageView from './views/ImageView'
import Home from './views/Home'
import Chat from './views/chat'
import CNode from './views/cnode'
import Topic from './views/cnode/Topic'

const Navigator = StackNavigator({
    Home: {
        screen: Home,
    },
    Chat: {
        screen: Chat,
    },
    CNode: {
        screen: CNode,
    },
    Topic: {
        screen: Topic,
    },
    ImageView: {
        screen: ImageView,
    },
}, {
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        transitionSpec: {
            duration: 200,
            easing: Easing.linear,
            timing: Animated.timing,
        },
    }),
    navigationOptions: {
        gesturesEnabled: true,
        headerTintColor: 'white',
        headerStyle: defaultStyles.headerStyle,
    },
    cardStyle: {
        elevation: 10,
        backgroundColor: 'white',
    },
})

global.images = {}
StatusBar.setTranslucent(true)
StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.4)', true)

export default class App extends React.Component {
    componentDidMount() {
        setTimeout(() => SplashScreen.hide(), 500)
    }

    render() {
        return <Navigator />
    }
}
