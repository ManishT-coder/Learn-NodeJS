const http = require('http');
const fs = require('fs');

const Myserver = http.createServer((req, res) => {
   
    // to print the headers of the request
    //console.log(req.headers);

    //to print entire request object
    // console.log(req);
    // res.end('Hello, World!');

    const log = `${Date.now()}:${req.url} New request received\n`;
    fs.appendFile('request.log', log, (err ,data) => {
        switch(req.url){
            case '/':
                res.end('Home Page');
                break;
            case '/about':
                res.end('Hii I am Manish');
                break;
            default:
                res.end('Page Not Found');
        }
        
        

});
});

Myserver.listen(8000, () => {
    console.log('Server is listening on port 8000');
}); 
