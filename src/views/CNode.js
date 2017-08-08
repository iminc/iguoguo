import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Animated,
    InteractionManager,
    TouchableHighlight,
} from 'react-native'

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import _ from 'lodash'
import Utils from '../util'
import service from '../service/cnode'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class TopicList extends React.PureComponent {
    state = {
        data: [],
        refreshing: true,
        selected: new Map(),
    }

    _keyExtractor = (item, index) => item.id

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            service.getTopics({
                tab: this.props.tab.toLowerCase(),
            }).then(res => {
                this.setState({
                    data: this.state.data.concat(res.data),
                    refreshing: false,
                })
            })
        })
    }

    _renderItem({ item }) {
        const { tipText, tipColor } = Utils.getTip(item)
        const avatar = Utils.parseUrl(item.author.avatar_url)

        return (
            <TouchableHighlight
                underlayColor='#F5FCFF'
                onPress={() => this._onPress(item.id, item)}>
                <View style={styles.item}>
                    <View style={styles.titleContainer}>
                        <View style={[styles.tipContainer, { backgroundColor: tipColor }]}>
                            <Text style={styles.tipText}>
                                {tipText}
                            </Text>
                        </View>
                        <Text style={styles.titleText}>
                            {item.title}
                        </Text>
                    </View>
                    <View style={[styles.info, { flexDirection: 'row' }]}>
                        <Image style={styles.avatar} source={{ uri: avatar }} />
                        <View style={styles.user}>
                            <Text>{item.author.loginname}</Text>
                            <Text style={styles.time}>{Utils.parseTime(item.create_at)}</Text>
                        </View>
                        <View style={styles.reply}>
                            <Text style={styles.right}>
                                <Text style={{ color: 'green' }}>{item.reply_count}</Text>
                                /{item.visit_count}
                            </Text>
                            <Text style={[styles.time, styles.right]}>
                                {Utils.parseTime(item.last_reply_at)}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    _onPress = (item) => {
        alert('onPress...')
    }

    _onRefresh = () => {
        this.setState({ refreshing: true })

        InteractionManager.runAfterInteractions(() => {
            service.getTopics({
                tab: this.props.tab.toLowerCase(),
            }).then(res => {
                this.setState({
                    data: res.data,
                    refreshing: false,
                })
            })
        })
    }

    render() {
        return (
            <AnimatedFlatList
                data={this.state.data}
                debug={false}
                numColumns={1}
                legacyImplementation={false}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
        )
    }
}

export default class Tab extends React.Component {
    renderTopics() {
        return _.map({
            all: '全部',
            good: '精华',
            ask: '问答',
            share: '分享',
            job: '招聘',
        }, (value, key) => <TopicList tab={key} tabLabel={value} />)
    }

    render() {
        return (
            <ScrollableTabView
                scrollWithoutAnimation={true}
                tabBarBackgroundColor="#444"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="#FFF"
                tabBarUnderlineStyle={styles.underline}
                renderTabBar={() => <DefaultTabBar style={{ elevation: 4 }} />}>
                {this.renderTopics()}
            </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        height: 50,
        backgroundColor: '#333',
    },
    item: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#F8F8F8',
    },
    titleContainer: {
        minHeight: 45,
    },
    titleText: {
        paddingTop: 1,
        paddingLeft: 50,
    },
    tipContainer: {
        width: 40,
        height: 25,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    tipText: {
        color: 'white',
        fontSize: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 3,
    },
    time: {
        fontSize: 12,
    },
    user: {
        marginLeft: 10,
        paddingTop: 5,
    },
    reply: {
        position: 'absolute',
        right: 0,
        top: 5,
    },
    right: {
        alignSelf: 'flex-end',
    },
    underline: {
        backgroundColor: '#F8F8F8',
    },
})
