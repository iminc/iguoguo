import React from 'react'
import {
    StyleSheet,
    Text,
    Animated,
    Dimensions,
    ActivityIndicator,
} from 'react-native'

import defaultStyles from '../styles'

export default class Loading extends React.Component {
    state = {
        mount: true,
        opacity: new Animated.Value(1),
    }

    componentWillUpdate(nextProps) {
        if (this.props !== nextProps && !nextProps.loading) {
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 300,
                }
            ).start(() => {
                this.setState({
                    mount: false,
                })
            })
        }
    }

    render() {
        const { mount, opacity } = this.state
        const { backgroundColor = 'white', color = '#333', showText = true } = this.props

        if (mount) {
            return (
                <Animated.View style={[styles.container, { backgroundColor, opacity }]}>
                    <ActivityIndicator size="large" color={color} />
                    { showText ? <Text>loading...</Text> : null }
                </Animated.View>
            )
        }

        return null
    }
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        width,
        height: height - defaultStyles.headerStyle.height,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        opacity: 0.5,
    },
})
