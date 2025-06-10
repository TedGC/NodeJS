const fs = require('fs')

// fs.writeFileSync('notes.txt', 'My name is Andrew.')

fs.appendFileSync('notes.txt', ' I live in Philadelphia.')

// read a file asynchronously 

const fs = require('fs');

fs.readFile('./data.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

//write to file
fs.writeFile('./output.txt', 'Hello Node.js!', err => {
    if (err) throw err;
    console.log('File written!');
});

//create a basic http server 
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node.js server!');
}).listen(3000);


// express API endpoint 
const express = require('express');
const app = express();

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello API!' });
});

app.listen(3000);



//JWT token generation 
const jwt = require('jsonwebtoken');
const secret = 'supersecret';

const token = jwt.sign({ id: 1 }, secret, { expiresIn: '1h' });
console.log(token);



//environment variawbles with dotenv
require('dotenv').config();

console.log(process.env.MY_SECRET); // From .env file



// middleware in express 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});