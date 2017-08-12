import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native'

export default class Loading extends React.Component {
    render() {
        const { backgroundColor = 'white', color = '#333', showText = true } = this.props
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <ActivityIndicator size ="large" color={color} />
                { showText ? <Text>努力加载中...</Text> : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
})
