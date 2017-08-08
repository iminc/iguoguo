const minute = 60 * 1000
const hour = 60 * minute
const day = 24 * hour
const month = 30 * day
const year = month * 12
const colors = [
    '#333333',
    '#e67e22',
    '#e74c3c',
    '#1abc9c',
    '#9b59b6',
    '#3498db',
]

/**
 * 相对时间转换
 * @param {any} time 时间
 * @returns 转换结果
 */
function parseTime(time) {
    if (time === undefined) {
        return time
    }

    let diff = new Date().getTime() - new Date(time).getTime()

    if (diff > year) {
        return parseInt(diff / year, 10) + ' 年前'
    }
    if (diff > month) {
        return parseInt(diff / month, 10) + ' 个月前'
    }
    if (diff > day) {
        return parseInt(diff / day, 10) + ' 天前'
    }
    if (diff > hour) {
        return parseInt(diff / hour, 10) + ' 个小时前'
    }
    if (diff > minute) {
        return parseInt(diff / minute, 10) + ' 分钟前'
    }

    return '刚刚'
}

/**
 * 处理不是http或https开头的url
 * @param {any} url 需要处理的url
 * @returns 处理结果
 */
function parseUrl(url) {
    if (url === undefined || ~url.indexOf('http')) {
        return url
    }
    return 'https:' + url
}

/**
 * 判断字符串是否为标准url
 * @param {any} url 字符串
 * @returns true || false
 */
function isUrl(url) {
    // const regStr = '^((https|http|ftp|rtsp|mms)?://)' + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
    //     + '(([0-9]{1,3}\.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
    //     + '|' // 允许IP和DOMAIN（域名）
    //     + '([0-9a-z_!~*\'()-]+\.)*' // 域名- www.
    //     + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' // 二级域名
    //     + '[a-z]{2,6})' // first level domain- .com or .museum
    //     + '(:[0-9]{1,4})?' // 端口- :80
    //     + '((/?)|' // a slash isn't required if there is no file name
    //     + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
    // const reg = new RegExp(regStr)
    if (/^https?:\/\//.test(url)) {
        return true
    }
    return false
}

/**
 * 随机返回一个颜色值
 * @returns
 */
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function getTip({ good, top, tab }) {
    let tipText = ''
    let tipColor = ''

    if (good) {
        tipText = '精华'
        tipColor = '#e67e22'
    } else if (top) {
        tipText = '置顶'
        tipColor = '#e74c3c'
    } else {
        if (tab === 'share') {
            tipText = '分享'
            tipColor = '#1abc9c'
        } else if (tab === 'job') {
            tipText = '招聘'
            tipColor = '#9b59b6'
        } else if (tab === 'ask') {
            tipText = '问答'
            tipColor = '#3498db'
        } else {
            tipText = '问答'
            tipColor = '#3498db'
        }
    }

    return {
        tipText,
        tipColor,
    }
}

export default {
    parseTime,
    parseUrl,
    isUrl,
    randomColor,
    getTip,
}
