import React from 'react'
import {
    WebView,
    ScrollView,
    Dimensions,
    InteractionManager,
} from 'react-native'

import Loading from '../Loading'
import Utils from '../../util'
import service from '../../service/cnode'

const { width, height } = Dimensions.get('window')

export default class Topic extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerStyle: {
            backgroundColor: navigation.state.params.color || '#444',
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

    onMessage = (data) => {
        alert(data)
    }

    onLoad = () => {
        this.setState({
            loading: false,
        })
    }

    render() {
        const { data, color } = this.state

        if (!data) {
            return <Loading />
        }

        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <WebView
                    ref={view => (this.webView = view)}
                    onLoad={this.onLoad}
                    onMessage={this.onMessage}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    renderLoading={() => <Loading />}
                    source={{ html: Utils.toContent(data, color) }}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        minHeight: height - 80,
    },
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'white',
    },
})
