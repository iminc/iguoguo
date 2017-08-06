import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback,
} from 'react-native'

const users = ['Jim', 'Dev', 'Guo', 'Dai']

export default class HomeScreen extends React.Component {
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
                        <Text style={{ color: 'white' }}>Go Chat !</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate('CNode')}>
                    <View style={{
                        marginTop: 10,
                        width: 120,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 16,
                        borderRadius: 2,
                        flexDirection: 'row',
                        backgroundColor: '#009688',
                        elevation: 4,
                    }}>
                        <Text style={{ color: 'white' }}>Go CNode !</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})
