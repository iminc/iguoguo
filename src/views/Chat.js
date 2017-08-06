import React from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

export default class ChatScreen extends React.Component {
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

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})
