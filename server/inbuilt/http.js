let http = require('http');

let server = http.createServer((req,res) =>{
    res.write('hii from http server')
    res.end()
})

server.listen(5233)