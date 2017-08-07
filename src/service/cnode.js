import request from './request'

const URI = 'https://cnodejs.org/api/v1/'

export default {
    getTopicListByType(tab = 'all', params) {
        return request.get(URI + 'topics', {
            tab,
            ...params
        })
    }
}
