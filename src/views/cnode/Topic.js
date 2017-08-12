import React from 'react'
import {
    WebView,
    StyleSheet,
    ScrollView,
    Dimensions,
    InteractionManager,
} from 'react-native'

import Loading from '../Loading'
import Utils from '../../util'
import service from '../../service/cnode'
import defaultStyles from '../../styles'

const { width, height } = Dimensions.get('window')

export default class Topic extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            ...defaultStyles.headerStyle,
            backgroundColor: navigation.state.params.color,
            elevation: 0,
        },
    })

    state = {
        data: null,
        webView: null,
        loading: true,
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { id, color } = this.props.navigation.state.params
            service.getTopic(id).then(data => this.setState({ data, color }))
        })
    }

    onMessage = (e) => {
        alert(e.nativeEvent.data)
    }

    onLoad = () => {
        this.setState({
            loading: false,
        })
    }

    loadWebView = () => {
        const { data, color } = this.state

        if (data) {
            return (
                <WebView
                    ref={view => (this.webView = view)}
                    style={styles.container}
                    onLoad={this.onLoad}
                    onMessage={this.onMessage}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    source={{ html: Utils.toContent(data, color) }}/>
            )
        }
    }

    loading = () => {
        if (this.state.loading) {
            return <Loading />
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {this.loading()}
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
        flex: 1,
        zIndex: 1,
    },
})
