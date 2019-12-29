const http = require('http');
const host = '127.0.0.1';
const port = 3000;
const port2 = 4400;

const server = http.createServer((req, res) => { // Received a request then response this
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello World');
    console.log('I got a request');
});

server.listen(port, host, () => {
    console.log(`http://${host}:${port}`);
})
