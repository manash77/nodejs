const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === "/home") {
        res.write('<html>')
        res.write('<body><h1>Welcome home</h1></body>')
        res.write('</html>')
    }
    if (url === "/about") {
        res.write('<html>')
        res.write('<body><h1>Welcome to About us page</h1></body>')
        res.write('</html>')
    }
    if (url === "/node") {
        res.write('<html>')
        res.write('<body><h1>Welcome to My Node js project page</h1></body>')
        res.write('</html>')
    }
    res.end();
})

server.listen(4000)