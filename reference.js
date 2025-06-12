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


// parse JSON body in express
app.use(express.json());

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send('Received!');
});


// CORS setup 
const cors = require('cors');
app.use(cors());


//simpe logger with fs + date 
const log = (msg) => {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('log.txt', `[${timestamp}] ${msg}\n`);
};

log('Server started');

//// another code commit 
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
}


import { EventEmitter } from 'events';

const appEvents = new EventEmitter();

appEvents.on('userRegistered', (user) => {
    console.log(`Welcome email sent to ${user.email}`);
});

// Usage:
appEvents.emit('userRegistered', { email: 'ted@example.com' });


import fs from 'fs';
import http from 'http';

http.createServer((req, res) => {
    const stream = fs.createReadStream('./largefile.txt');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    stream.pipe(res);
}).listen(3000);


import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'https://jsonplaceholder.typicode.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
}));

app.listen(3000);