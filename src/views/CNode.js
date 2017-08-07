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

import { TabNavigator } from 'react-navigation'
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
            const { key } = this.props.navigation.state
            service.getTopicListByType(key.toLowerCase())
                .then(res => {
                    this.setState({
                        data: this.state.data.concat(res.data),
                        refreshing: false,
                    })
                })
        })
    }

    _renderItem({ item }) {
        let tipText = ''
        let tipColor = ''
        const avatar = Utils.parseUrl(item.author.avatar_url)

        if (item.good) {
            tipText = '精华'
            tipColor = '#e67e22'
        } else if (item.top) {
            tipText = '置顶'
            tipColor = '#e74c3c'
        } else {
            if (item.tab === 'share') {
                tipText = '分享'
                tipColor = '#1abc9c'
            } else if (item.tab === 'job') {
                tipText = '招聘'
                tipColor = '#9b59b6'
            } else if (item.tab === 'ask') {
                tipText = '问答'
                tipColor = '#3498db'
            } else {
                tipText = '问答'
                tipColor = '#3498db'
            }
        }

        return (
            <TouchableHighlight
                underlayColor='#F5FCFF'
                onPress={() => this.onPress(item.id, item)}>
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

    _onRefresh = () => alert('onRefresh: nothing to refresh :P')

    render() {
        return (
            <AnimatedFlatList
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
        )
    }
}

export default TabNavigator({
    All: {
        screen: TopicList,
        navigationOptions: () => ({
            tabBarLabel: '全部'
        })
    },
    Good: {
        screen: TopicList,
        navigationOptions: () => ({
            tabBarLabel: '精华'
        })
    },
    Ask: {
        screen: TopicList,
        navigationOptions: () => ({
            tabBarLabel: '问答'
        })
    },
    Share: {
        screen: TopicList,
        navigationOptions: () => ({
            tabBarLabel: '分享'
        })
    },
    Job: {
        screen: TopicList,
        navigationOptions: () => ({
            tabBarLabel: '招聘',
        })
    },
}, {
    lazy: true,
    tabBarComponent: () => null,
})

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
        borderColor: '#F1F1F1',
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
})
