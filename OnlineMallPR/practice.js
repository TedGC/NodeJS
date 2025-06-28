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

// creating RESTful API with express + MongoDB s
import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test');

const Product = mongoose.model('Product', {
    name: String,
    price: Number,
});

const app = express();
app.use(express.json());

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
});

app.listen(3000);

//real time chat app with websocket 

import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
    ws.on('message', message => {
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

// debounce function 
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// deep clone with structuredclone fallback
function deepClone(obj) {
    return typeof structuredClone === 'function'
        ? structuredClone(obj)
        : JSON.parse(JSON.stringify(obj));
}

// memorization for expensvie function calls 

function memoize(fn) {
    const cache = new Map();
    return function (key) {
        if (cache.has(key)) return cache.get(key);
        const result = fn(key);
        cache.set(key, result);
        return result;
    };
}