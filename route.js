import fs from 'fs'

export default function requestHandler(req, res) {
    const url = req.url
    const method = req.method

    if (url === '/') {
        // res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title> My first page</title></head>')
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">button</button</form></body>')
        res.write('/<html>')
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            const message = parsedBody.split('=')[1]
            // instead of using WriteFileSync, use writeFile as FileSync has to be done
            // to proceed to next steps which is very time consuming 
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })

        })

    }

    // NodeJS runs non-blocking JS code and uses an event-driven code ('event loop') for running your logic
    // A Node program exits as soon as there is no more work to do 
    // Note: the createServer() event never finishes by default 
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title> My first page</title></head>')
    res.write('/<html>')
    res.end()
}

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