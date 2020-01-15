const http = require('http')
const fs = require('fs')
const template = require('art-template')
const url = require('url')


comments = [{
    name: 'Bob',
    message: 'I love you',
    dateTime: '2019-09-12 12:23:34'
}, {
    name: 'Tom',
    message: 'Me too',
    dateTime: '2019-08-14 09:23:19'
}, {
    name: 'Jack',
    message: 'How are you',
    dateTime: '2019-06-17 09:04:45'
},{
    name: 'Linda',
    message: 'I am fine',
    dateTime: '2019-03-24 19:32:35'
}]

let formate = function (number) {
    return number < 10? '0' + number: '' + number
}


let formatDate = function () {
    var date = new Date()
    year = formate(date.getFullYear())
    month = formate(date.getMonth() + 1)
    day = formate(date.getDate())
    hour = formate(date.getHours())
    minute = formate(date.getMinutes())
    second = formate(date.getSeconds())
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}


http.createServer((req, res) => {
    const parseObj = url.parse(req.url, true)
    const pathName = parseObj.pathname

    if (pathName === '/') {
        fs.readFile('./views/index.html', (error, data) => {
            if(error) {
                res.end("404 Not Found.")
            }  
            let htmlStr = template.render(data.toString(), {
                comments:comments,
            })
            res.end(htmlStr)
        })
    } else if (pathName.indexOf('/public/') === 0) {
        fs.readFile('.' + pathName, (err, data) => {
            if (err) {
                res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (pathName === '/post') {
        fs.readFile('./views/post.html', (err, data) => {
            if (err) {
                res.end('404 Not Founded')
            }
            res.end(data)
        })
    } else if (pathName === '/comment') {
        let comment = parseObj.query
        comment.dateTime = formatDate()
        comments.unshift(comment)
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
    }
   
}).listen('3000', () => {
    console.log('Listening')
})