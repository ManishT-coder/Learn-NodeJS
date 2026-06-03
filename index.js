const http = require('http');
const fs = require('fs');
const url = require('url');

const Myserver = http.createServer((req, res) => {
           if(req.url === "/favicon.ico")
            return res.end();
    // to print the headers of the request
    //console.log(req.headers);

    //to print entire request object
    // console.log(req);
    // res.end('Hello, World!');

    // Route handling
    const log = `${Date.now()}:${req.url} New request received\n`;
    fs.appendFile('request.log', log, (err ,data) => {
        const myUrl = url.parse(req.url, true);
        console.log(myUrl);
        switch(myUrl.pathname){
            case '/':
                res.end('Home Page');
                break;
            case '/about':
                const username = myUrl.query.name;
                res.end(`Hello, ${username}!`);
                break;
            default:
                res.end('Page Not Found');
        }
        
        

});
});

Myserver.listen(8000, () => {
    console.log('Server is listening on port 8000');
}); 


// HTTP METHODS
// GET - to retrieve data from the server
// POST - to send data to the server
// PUT - to update existing data on the server
// DELETE - to delete data from the server
// PATCH - to partially update existing data on the server
// req.method - to get the HTTP method of the request it can be GET, POST, PUT, DELETE, PATCH etc.