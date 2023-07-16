const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        fs.readFile('message.txt', { encoding: 'utf-8' }, (err, data) => {
            if (err) console.log(err)
            res.write('<html>')
            res.write(`<h3>${data}<h3>`)
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"/> <button type="submit">Send</button></form></body>')
            res.write('</html>')
            return res.end();
        })

    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end();
            })
        });
    }

})

server.listen(4000)