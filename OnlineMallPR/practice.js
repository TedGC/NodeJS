// file upload with multer

import express from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
    res.send(`Uploaded ${req.file.originalname}`);
});

app.listen(3000);

//evet emitter custome example 
import EventEmitter from 'events';

class Notifier extends EventEmitter { }
const notifier = new Notifier();

notifier.on('email', (user) => {
    console.log(`Sending email to ${user}`);
});

notifier.emit('email', 'ted@example.com');

// streaming large file 
import fs from 'fs';
import http from 'http';

http.createServer((req, res) => {
    const stream = fs.createReadStream('./large.txt');
    stream.pipe(res);
}).listen(3000);

// JWT authentication middleware 

import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    try {
        const decoded = jwt.verify(token, 'yourSecret');
        req.user = decoded;
        next();
    } catch (err) {
        res.sendStatus(401);
    }
};


//async/await with postgreSQL
import { Pool } from 'pg';
const pool = new Pool();

const getUsers = async () => {
    const res = await pool.query('SELECT * FROM users');
    console.log(res.rows);
};
getUsers();

//node.js cluster setup
import cluster from 'cluster';
import os from 'os';
import http from 'http';

if (cluster.isPrimary) {
    const cpuCount = os.cpus().length;
    for (let i = 0; i < cpuCount; i++) cluster.fork();
} else {
    http.createServer((req, res) => {
        res.end(`Served from PID: ${process.pid}`);
    }).listen(3000);
}

//rate limiter middleware 

let requests = 0;
const rateLimiter = (req, res, next) => {
    requests++;
    if (requests > 100) {
        return res.status(429).send('Too Many Requests');
    }
    next();
};