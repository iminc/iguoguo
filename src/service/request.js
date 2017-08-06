import qs from 'qs'

function thenJSON(res) {
    return res.json()
}

function thenCatch(err) {
    alert(`Network error...${err}`)
}

export default {
    get(url = '/', body = {}) {
        return fetch(url + `?${qs.stringify(body)}`).then(thenJSON).catch(thenCatch)
    },
    post(url = '/', params = {}) {
        const options = {
            method: 'POST'
        }

        return fetch(url, Object.assign(options, params)).then(thenJSON).catch(thenCatch)
    }
}
