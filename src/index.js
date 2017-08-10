import React from 'react'
import {
    StyleSheet,
    View,
    Easing,
    Animated,
    StatusBar,
} from 'react-native'

import SplashScreen from 'react-native-splash-screen'
import { StackNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'

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
}, {
    transitionConfig: () => {
        return {
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
            transitionSpec: {
                duration: 200,
                easing: Easing.linear,
                timing: Animated.timing,
            },
        }
    },
    navigationOptions: {
        gesturesEnabled: true,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#444',
        },
    },
    cardStyle: {
        elevation: 10,
        backgroundColor: 'white',
    },
})

StatusBar.setTranslucent(true)
StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.3)', true)

export default class App extends React.Component {
    componentDidMount() {
        setTimeout(_ => {
            SplashScreen.hide()
        }, 500)
    }

    render() {
        return (
            <View style={styles.navigationContainer}>
                <View style={{ height: StatusBar.currentHeight, backgroundColor: '#444' }}></View>
                <Navigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationContainer: {
        flex: 1,
    },
    container: {
        padding: 10
    }
})
