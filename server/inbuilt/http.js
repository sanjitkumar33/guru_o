let http = require('http');

let server = http.createServer((req,res) =>{
    res.write('hii from http server code')
    res.end()
})

server.listen(7028)