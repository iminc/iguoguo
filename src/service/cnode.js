import request from './request'

const URI = 'https://cnodejs.org/api/v1'

export default {
    getTopics(body = { tab: 'all', limit: 20 }) {
        return request.get(`${URI}/topics`, ...body).then(res => res.data)
    },
    getTopic(id) {
        return request.get(`${URI}/topic/${id}`).then(res => res.data)
    }
}
