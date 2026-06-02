const http = require('http');

const Myserver = http.createServer((req, res) => {
    console.log('Request received');
    res.end('Hello, World!');
});

Myserver.listen(3000, () => {
    console.log('Server is listening on port 3000');
}); 

console.log("Testing Git commit");