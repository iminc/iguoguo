import Utils from './index'

const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'

const initScript = `
    <div id="position">0</div>
    <script type="text/javascript">
        function sendMessage(command, payload) {
            var message = {
                command: command || '',
                payload: payload || {}
            };
            window.postMessage(JSON.stringify(message));
        }
        function lazyloadImage() {
            $('img.lazy').each(function() {
                var self = $(this),
                    url = self.attr('data-src'),
                    coords = this.getBoundingClientRect();
                if ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight)) {
                    var img = new Image();
                    img.src = url;
                    if (img.complete) {
                        self.attr('src', url).removeClass('lazy');
                        return;
                    }
                    img.onload = function() {
                        img.onload = null;
                        self.attr('src', url).removeClass('lazy');
                    }
                }
            });
        }
        $(function() {
            FastClick.attach(document.body);
            $(window).scroll(function() {
                lazyloadImage();
                /*var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                $('#position').html(scrolltop);*/
            }).load(function() {
                $('img').each(function() {
                    var self = $(this),
                        uri = self.attr('data-src');
                    if (self.attr('onclick') !== 'return false') {
                        if (self.parent()[0].tagName !== 'A') {
                            self.attr('onclick', 'sendMessage("open-image", { uri: "' + uri + '" })');
                        }
                    }
                });
                $('a').each(function() {
                    var self = $(this),
                        href = self.attr('href');
                    self.attr('onclick', 'sendMessage("open-link", { uri: "' + href + '" })').removeAttr('href');
                });
                lazyloadImage();
            })
        })
    </script>
`

function encode(str) {
    if (str.length === 0) {
        return ''
    }

    return str.replace(/&/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/ /g, '&nbsp;')
        .replace(/\\'/g, '&#39;')
        .replace(/\\"/g, '&quot;')
        .replace(/\n/g, '<br>')
}

function processContent(content) {
    return content
        .replace(/img src/g, 'img data-src')
        .replace(/img data-src="\/\//g, 'img data-src="http://')
        .replace(/<img/g, '<img class="lazy" src="' + defaultImage + '"')
        .replace(/\n/g, '&#10;')
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        .replace(/a href="\//g, 'a href="https://cnodejs.org/')
}

export function getImagesUrl(topic) {
    let content = processContent(topic.content)

    const imgReg = new RegExp(/<img.*?(?:>|\/>)/gi)
    const srcReg = new RegExp(/data-src=[\\'\\"]?([^\\'\\"]*)[\\'\\"]?/i)

    let urls = []
    let imgs = content.match(imgReg)

    imgs && imgs.forEach((el, i) => {
        urls.push({
            url: el.match(srcReg)[1],
        })
    })

    return urls
}

export function toContent(topic, titleColor = '#333') {
    let { title, content, author } = topic

    content = processContent(content)

    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
                <link rel="stylesheet" href="https://o4j806krb.qnssl.com/public/stylesheets/index.min.99a20877.min.css" media="all">
                <script src="http://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
                <script src="https://o4j806krb.qnssl.com/public/index.min.09f55f81.min.js"></script>
                <style>
                    body {
                        background-color: white;
                    }
                    pre {
                        overflow-x: auto;
                    }
                    pre code {
                        white-space: pre !important;
                    }
                    .topic_content {
                        padding-bottom: 10px;
                    }
                    .titleContainer {
                        padding: 5px 20px 15px 20px;
                        color: white;
                    }
                    .title {
                        font-size: 20px;
                        line-height: 1.25;
                    }
                    #position {
                        background: #333;
                        width: 50px;
                        height: 30px;
                        line-height: 31px;
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        text-align: center;
                        color: white;
                        border-radius: 3px;
                        opacity: 0.8;
                        display: none;
                    }
                    img {
                        opacity: 1;
                        transition: opacity .5s;
                        outline: none;
                        -webkit-tap-highlight-color: transparent;
                        -webkit-touch-callout: none;
                        -webkit-user-select: none;
                    }
                    a, a:link, a:active, a:visited, a:focus {
                        text-decoration: none;
                        -webkit-tap-highlight-color: transparent;
                        -webkit-touch-callout: none;
                        -webkit-user-select: none;
                    }
                    .topic-info {
                        display: flex;
                    }
                    img.avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        margin-top: 10px;
                    }
                    div.loginname, div.create_at {
                        font-size: 16px;
                        padding-top: 27px;
                        padding-left: 15px;
                    }
                    div.create_at {
                        font-size: 14px;
                        color: #F8F8F8;
                    }
                    .lazy {
                        width: 100%;
                        height: 180px;
                        opacity: 0.3;
                    }
                </style>
            </head>
            <body>
                <div class="titleContainer" style="background-color: ${titleColor};">
                    <div class="title">${encode(title)}</div>
                    <div class="topic-info">
                        <img src="${Utils.parseUrl(author.avatar_url)}" class="avatar" onclick="return false"/>
                        <div class="loginname">${author.loginname}</div>
                        <div class="create_at">${Utils.parseTime(topic.create_at)}</div>
                    </div>
                </div>
                <div id="main">
                    <div id="content">
                        <div class="panel">
                            <div class="topic_content">${content}</div>
                        </div>
                    </div>
                </div>
                ${initScript}
            </body>
        <html>
    `
}

export function toComment(topic) {
    const { replies = [] } = topic

    let items = []

    replies.forEach(function(reply, i) {
        let index = i + 1
        items.push(`
            <div id="reply${index}"class="cell reply_area reply_item">
                <a class="anchor" id="${reply.id}"></a>
                <div class="author_content">
                    <a href="/user/${reply.author.loginname}" class="user_avatar">
                        <img src="${reply.author.avatar_url}" title="${reply.author.loginname}" onclick="return false"/>
                    </a>
                    <div class="user_info">
                        <a class="dark reply_author" href="/user/${reply.author.loginname}">${reply.author.loginname}</a>
                        <span class="create_at">${Utils.parseTime(reply.create_at)}</span>
                        <span class="reply_time">${index} 楼</span>
                    </div>
                </div>
                <div class="reply_content from-${reply.author.loginname}">${reply.content}</div>
                <div class="clearfix"><div class="reply2_area"></div></div>
            </div>
        `)
    })

    let content = processContent(items.reverse().join(''))

    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
                <link rel="stylesheet" href="https://o4j806krb.qnssl.com/public/stylesheets/index.min.99a20877.min.css" media="all">
                <script src="http://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
                <script src="https://o4j806krb.qnssl.com/public/index.min.09f55f81.min.js"></script>
                <style>
                    body {
                        background-color: white;
                        overflow-x: hidden;
                    }
                    pre {
                        overflow-x: auto;
                    }
                    pre code {
                        white-space: pre !important;
                    }
                    .titleContainer {
                        padding: 5px 20px 15px 20px;
                        color: white;
                    }
                    .title {
                        font-size: 20px;
                        line-height: 1.25;
                    }
                    #position {
                        background: #333;
                        width: 50px;
                        height: 30px;
                        line-height: 31px;
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        text-align: center;
                        color: white;
                        border-radius: 3px;
                        opacity: 0.8;
                        display: none;
                    }
                    img {
                        outline: none;
                        -webkit-tap-highlight-color: transparent;
                        -webkit-touch-callout: none;
                        -webkit-user-select: none;
                    }
                    a, a:link, a:active, a:visited, a:focus {
                        text-decoration: none;
                        -webkit-tap-highlight-color: transparent;
                        -webkit-touch-callout: none;
                        -webkit-user-select: none;
                    }
                    .topic-info {
                        display: flex;
                    }
                    .user_avatar img {
                        width: 40px;
                        height: 40px;
                        border-radius: 3;
                    }
                    div.loginname, div.create_at {
                        font-size: 16px;
                        padding-top: 27px;
                        padding-left: 15px;
                    }
                    div.create_at {
                        font-size: 14px;
                        color: #F8F8F8;
                    }
                    .lazy {
                        width: 1000px;
                        height: 180px;
                        opacity: 0.5;
                    }
                    .user_info {
                        display: block;
                        padding-left: 40px;
                        font-size: 14px;
                        color: #999;
                    }
                    .reply_author {
                        color: #666 !important;
                    }
                    .create_at {
                        position: absolute;
                        top: 34px;
                        left: 61px;
                        font-size: 12px;
                    }
                    .reply_time {
                        float: right;
                        font-size: 13px;
                    }
                </style>
            </head>
            <body>
                <div id="main">
                    <div id="content">
                        <div class="panel">${content}</div>
                    </div>
                </div>
                ${initScript}
            </body>
        <html>
    `
}
