import React from 'react'
import {
    Linking,
    WebView,
    StyleSheet,
    ScrollView,
    ToastAndroid,
    InteractionManager,
} from 'react-native'

import Loading from '../Loading'
import Utils from '../../util'
import service from '../../service/cnode'
import defaultStyles from '../../styles'

export default class Topic extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            ...defaultStyles.headerStyle,
            backgroundColor: navigation.state.params.color,
            elevation: 0,
        },
    })

    webView = null

    state = {
        data: null,
        loading: true,
        imgSrc: null,
        imgModalVisible: false,
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { id, color } = this.props.navigation.state.params
            service.getTopic(id).then(data => this.setState({ data, color }))
        })
    }

    onMessage = (e) => {
        const { command, payload } = JSON.parse(e.nativeEvent.data)
        switch (command) {
        case 'open-image':
            this.props.navigation.navigate('ImageView', {
                src: payload.uri,
            })
            break
        case 'open-link':
            Linking.openURL(payload.uri).catch(err => console.error('An error occurred', err))
            break
        default:
            ToastAndroid.show(command)
            break
        }
    }

    onLoad = () => {
        this.setState({
            loading: false,
        })
    }

    loadWebView = () => {
        const { data, color } = this.state

        if (!data) {
            return null
        }

        return (
            <WebView
                ref={view => { this.webView = view }}
                style={styles.container}
                onLoad={this.onLoad}
                onMessage={this.onMessage}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                source={{ html: Utils.toContent(data, color) }}/>
        )
    }

    render() {
        const { loading } = this.state

        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Loading loading={loading}/>
                {this.loadWebView()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    container: {
        zIndex: 1,
    },
})
