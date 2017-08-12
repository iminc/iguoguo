import {
    StatusBar,
} from 'react-native'

export default {
    headerStyle: {
        backgroundColor: '#444',
        height: 56 + StatusBar.currentHeight,
        paddingTop: StatusBar.currentHeight,
    }
}
