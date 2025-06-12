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