import React from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
} from 'react-native'

import ImageZoom from 'react-native-image-pan-zoom'
import Loading from './Loading'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class ImageView extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    })

    src = this.props.navigation.state.params.src

    state = global.images[this.src] || {
        src: this.src,
        width: 0,
        height: 0,
        status: 'loading',
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.loadImage()
        })
    }

    loadImage() {
        const image = { ...this.state }
        let imageLoaded = false
        let updateImage = () => {
            this.setState(image)
            global.images[image.src] = image
        }

        if (this.state.status === 'success') {
            return
        }

        Image.prefetch(this.state.src)
            .then(() => {
                imageLoaded = true
                image.status = 'success'
                updateImage()
            }, () => {
                image.status = 'fail'
                updateImage()
            })

        if (image.width && image.height) {
            if (imageLoaded) {
                image.status = 'success'
                updateImage()
            }
        } else {
            Image.getSize(this.state.src, (width, height) => {
                image.width = width
                image.height = height
                updateImage()
            }, () => {
                image.status = 'fail'
                updateImage()
            })
        }
    }

    reloadImage() {
        this.setState({
            status: 'loading',
        }, () => {
            setTimeout(() => {
                this.loadImage()
            }, 500)
        })
    }

    renderImage() {
        let { status, width, height, src } = this.state

        if (status === 'success' && width && height) {
            if (width > WIDTH) {
                let WidthPixel = WIDTH / width
                width *= WidthPixel
                height *= WidthPixel
            }
            if (height > HEIGHT) {
                let HeightPixel = HEIGHT / height
                width *= HeightPixel
                height *= HeightPixel
            }
            return (
                <ImageZoom
                    cropWidth={WIDTH}
                    cropHeight={HEIGHT}
                    imageWidth={width}
                    imageHeight={height}
                    onCancel={() => {
                        this.props.navigation.goBack()
                    }}>
                    <Image style={{ width, height }} source={{ uri: src }}/>
                </ImageZoom>
            )
        } else if (status === 'fail') {
            return (
                <TouchableOpacity
                    style={styles.failContainer}
                    activeOpacity={1}
                    onPress={this.reloadImage.bind(this)}>
                    <Text style={styles.failText}>点击重新加载</Text>
                </TouchableOpacity>
            )
        }

        return <Loading backgroundColor="black" color="white" showText={false}/>
    }

    renderMenu() {
        let { status, width, height } = this.state

        if (status === 'success' && width && height) {
            return (
                <TouchableOpacity
                    style={styles.menuContainer}
                    activeOpacity={1}
                    onPress={this.reloadImage.bind(this)}>
                </TouchableOpacity>
            )
        }
    }

    showMenu() {
        // TODO 打开一个菜单，操作图片本地保存...
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderImage()}
                {this.renderMenu()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: WIDTH,
        height: HEIGHT,
    },
    failContainer: {
        height: 30,
        justifyContent: 'center',
    },
    failText: {
        color: 'white',
        fontSize: 12,
    },
    menuContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 30,
        height: 30,
    },
    menuIcon: {
        width: 30,
        height: 30,
    },
})
