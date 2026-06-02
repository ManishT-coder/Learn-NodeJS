const fs = require('fs');

// synchronous
// writeFileSync is used to write data to a file synchronously. 
// It takes two arguments: the name of the file and the data to be written.
//  If the file does not exist, it will be created.
//  If the file already exists, it will be overwritten.
// synchronous
fs.writeFileSync('text.txt','Hello World');

// Asynchronous
// writeFile is used to write data to a file asynchronously.
// It takes three arguments: the name of the file, the data to be written, and a callback function that is called when the write operation is complete.
// If the file does not exist, it will be created.
// If the file already exists, it will be overwritten.
fs.writeFile('text.txt','Hello World Asynchronous', (err) => {});

// By using readFileSync
// readFileSync is used to read data from a file synchronously.
const names = fs.readFileSync('names.txt','utf-8');
console.log(names);


// by using readFile
fs.readFile('names.txt','utf-8',(err,data) => {
    if(err) {
        console.log(err);}
    else {
        console.log(data);
    }
});

fs.unlinkSync('names.txt'); 
// to delete a file synchronously
// fs.unlink('names.txt',(err) => { // to delete a file asynchronously
//     if(err) {    


// there is more functions in fs module like appendFile, readdir, mkdir, rmdir, stat, rename etc. you can check the documentation for more details.