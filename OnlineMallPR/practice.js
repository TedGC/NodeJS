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

//currying a function 
function curry(fn) {
    return function curried(...args) {
        return args.length >= fn.length
            ? fn.apply(this, args)
            : (...next) => curried.apply(this, args.concat(next));
    };
}


//chainable interface with proxy 
const chain = x => new Proxy({ value: x }, {
    get: (obj, prop) => (typeof Math[prop] === 'function'
        ? chain(Math[prop](obj.value))
        : prop === 'get' ? () => obj.value : undefined)
});
console.log(chain(3).sqrt.get()); // Math.sqrt(3)


//throttle function 

function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}


//event emitter class

class EventEmitter {
    constructor() { this.events = {}; }
    on(event, listener) {
        (this.events[event] ||= []).push(listener);
    }
    emit(event, ...args) {
        (this.events[event] || []).forEach(fn => fn(...args));
    }
}

// asynchronous retry logic 
async function retry(fn, attempts = 3) {
    for (let i = 0; i < attempts; i++) {
        try { return await fn(); }
        catch (e) { if (i === attempts - 1) throw e; }
    }
}

//custom iterable object 
const countdown = {
    from: 5,
    [Symbol.iterator]() {
        let current = this.from;
        return {
            next: () => ({
                done: current < 0,
                value: current--
            })
        };
    }
};


//pipeline operator (simulated )
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const double = n => n * 2;
const square = n => n * n;
console.log(pipe(double, square)(3)); // (3*2)^2 = 36

/// lazy async data stream (with async generator)
async function* lazyFetch(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        yield data;
    }
}

// Example usage:
(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    for await (const item of lazyFetch(urls)) {
        console.log(item);
    }
})();


//proxy for access logging 

const user = {
    name: "Ted",
    role: "admin"
};

const loggedUser = new Proxy(user, {
    get(target, prop) {
        console.log(`Accessed ${prop}`);
        return target[prop];
    }
});

console.log(loggedUser.name); // logs "Accessed name", then outputs "Ted"

//memorization with closure 

function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = args.toString();
        if (cache[key]) return cache[key];
        cache[key] = fn(...args);
        return cache[key];
    };
}

const factorial = memoize(n => (n <= 1 ? 1 : n * factorial(n - 1)));
console.log(factorial(5)); // 120

//function debouncing 

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

const log = debounce(() => console.log("Debounced!"), 1000);
log();
log();
log(); // Only the last one runs



//async/await with IIFE 

(async () => {
    const fetchData = async () => {
        return new Promise(resolve => setTimeout(() => resolve("Done!"), 1000));
    };

    const result = await fetchData();
    console.log(result); // Done!
})();



//deep clone with recursion 

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    const clone = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        clone[key] = deepClone(obj[key]);
    }
    return clone;
}

const a = { x: 1, y: { z: 2 } };
const b = deepClone(a);
b.y.z = 100;
console.log(a.y.z); // 2


//chaining methods via class

class Counter {
    constructor() {
        this.count = 0;
    }
    inc() {
        this.count++;
        return this;
    }
    dec() {
        this.count--;
        return this;
    }
    show() {
        console.log(this.count);
        return this;
    }
}

new Counter().inc().inc().dec().show(); // 1

//tagged template literals 
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => acc + str + (values[i] ? `<b>${values[i]}</b>` : ''), '');
}

const name = "Ted";
console.log(highlight`Hello, ${name}!`); // Hello, <b>Ted</b>!

//function composition 

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const double = x => x * 2;
const square = x => x * x;

const result = compose(double, square)(3); // square(3) = 9, double(9) = 18
console.log(result);


//object.freeze deep clone 

function deepFreeze(obj) {
    Object.freeze(obj);
    for (let key in obj) {
        if (typeof obj[key] === 'object' && !Object.isFrozen(obj[key])) {
            deepFreeze(obj[key]);
        }
    }
    return obj;
}

const config = deepFreeze({
    server: {
        host: 'localhost',
        port: 8080
    }
});


//custom event emitter 

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(fn => fn(...args));
        }
    }
}

const emitter = new EventEmitter();
emitter.on('msg', text => console.log(`Received: ${text}`));
emitter.emit('msg', 'Hello World');


//throttle function 

function throttle(fn, limit) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const log = () => console.log('Throttled!');
const throttledLog = throttle(log, 2000);
window.addEventListener('scroll', throttledLog);

function debounce(fn, delay, immediate = false) {
    let timer;
    return function (...args) {
        const callNow = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            if (!immediate) fn.apply(this, args);
        }, delay);
        if (callNow) fn.apply(this, args);
    };
}

// Usage
const log = debounce(() => console.log("Debounced!"), 1000, true);
log(); log(); log(); // Only first call trigger

// custom debounce with immediate trigger
function debounce(fn, delay, immediate = false) {
    let timer;
    return function (...args) {
        const callNow = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            if (!immediate) fn.apply(this, args);
        }, delay);
        if (callNow) fn.apply(this, args);
    };
}

// Usage
const log = debounce(() => console.log("Debounced!"), 1000, true);
log(); log(); log(); // Only first call trigger


// custom deep clone 
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (hash.has(obj)) return hash.get(obj);

    const clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone);

    for (let key in obj) {
        clone[key] = deepClone(obj[key], hash);
    }

    return clone;
}


//function composition 
const compose = (...fns) => (x) =>
    fns.reduceRight((v, f) => f(v), x);

const double = x => x * 2;
const square = x => x * x;

const doubleThenSquare = compose(square, double);
console.log(doubleThenSquare(5)); // 100

//reactive proxy object
function reactive(obj, onChange) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value;
            onChange(prop, value);
            return true;
        }
    });
}

const state = reactive({ count: 0 }, (key, value) =>
    console.log(`${key} changed to ${value}`)
);

state.count = 5;

//lazy singleton pattern
const Singleton = (function () {
    let instance;

    function createInstance() {
        return { timestamp: Date.now() };
    }

    return {
        getInstance() {
            if (!instance) instance = createInstance();
            return instance;
        }
    };
})();

const a = Singleton.getInstance();
const b = Singleton.getInstance();
console.log(a === b); // true

//tagged template literal parser 
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        return acc + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
    }, '');
}

const name = "Ted";
console.log(highlight`Hello, ${name}!`); // Hello, <mark>Ted</mark>!


// async pool (concurrency control)
async function asyncPool(poolLimit, tasks, taskFn) {
    const ret = [];
    const executing = [];

    for (const task of tasks) {
        const p = Promise.resolve().then(() => taskFn(task));
        ret.push(p);

        if (poolLimit <= tasks.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= poolLimit) await Promise.race(executing);
        }
    }
    return Promise.all(ret);
}


//chainable API
class Chain {
    constructor(val) {
        this.val = val;
    }

    add(x) {
        this.val += x;
        return this;
    }

    multiply(x) {
        this.val *= x;
        return this;
    }

    print() {
        console.log(this.val);
        return this;
    }
}

new Chain(2).add(3).multiply(5).print(); // 25


// custom iterator for fibonacci sequence 
const fibonacci = {
    [Symbol.iterator]() {
        let [a, b] = [0, 1];
        return {
            next() {
                [a, b] = [b, a + b];
                return { value: a, done: false };
            }
        };
    }
};

const fib = fibonacci[Symbol.iterator]();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3


// object flattening 
function flattenObject(obj, parent = '', res = {}) {
    for (let key in obj) {
        const prop = parent ? `${parent}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null)
            flattenObject(obj[key], prop, res);
        else
            res[prop] = obj[key];
    }
    return res;
}

console.log(flattenObject({ a: { b: 2 }, c: 3 }));
// { 'a.b': 2, c: 3 }

// Recursive Object Search

function deepSearch(obj, targetKey) {
    if (obj.hasOwnProperty(targetKey)) return obj[targetKey];
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            const result = deepSearch(obj[key], targetKey);
            if (result) return result;
        }
    }
    return undefined;
}


//Lazy Evaluation with Generator
const data = { a: { b: { c: 42 } } };
console.log(deepSearch(data, 'c')); // 42


function* infiniteRandom() {
    while (true) {
        yield Math.random();
    }
}

const randGen = infiniteRandom();
console.log(randGen.next().value);
console.log(randGen.next().value);



//Function Memoization with Cache Expiry

function memoize(fn, timeout = 5000) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache.has(key)) {
            const [val, time] = cache.get(key);
            if (now - time < timeout) return val;
        }

        const result = fn(...args);
        cache.set(key, [result, now]);
        return result;
    };
}

const add = memoize((a, b) => a + b);
console.log(add(2, 3)); // 5



// Custom Event Emitter

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, fn) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(fn);
    }

    emit(event, ...args) {
        (this.events[event] || []).forEach(fn => fn(...args));
    }
}

const emitter = new EventEmitter();
emitter.on('sayHi', name => console.log(`Hi ${name}`));
emitter.emit('sayHi', 'Ted');


//Chained Function Calls with State
function sum(a) {
    let total = a;
    const f = b => {
        total += b;
        return f;
    };
    f.valueOf = () => total;
    return f;
}

console.log(+sum(1)(2)(3)); // 6


//Proxy-Based Property Access Logger

const user = {
    name: 'Alice',
    age: 25
};

const proxy = new Proxy(user, {
    get(target, prop) {
        console.log(`Accessed ${prop}`);
        return Reflect.get(target, prop);
    }
});

console.log(proxy.name); // Logs: Accessed name


//Currying with Dynamic Args

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) return fn(...args);
        return (...next) => curried(...args, ...next);
    };
}

function multiply(a, b, c) {
    return a * b * c;
}

const curried = curry(multiply);
console.log(curried(2)(3)(4)); // 24

//Debounce (No Call Until Stable)


function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

window.addEventListener('resize', debounce(() => {
    console.log('Resized');
}, 300));




//Asynchronous Sequential Mapping
async function asyncMap(arr, fn) {
    const results = [];
    for (const item of arr) {
        results.push(await fn(item));
    }
    return results;
}

asyncMap([1, 2, 3], async x => x * 2)
    .then(console.log); // [2, 4, 6]



//Retry Logic with Backoff

async function retry(fn, attempts = 3, delay = 1000) {
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === attempts - 1) throw err;
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

// Example usage
retry(() => fetch('https://api.example.com'), 5, 500)
    .then(res => console.log('Success'))
    .catch(err => console.error('Failed after 5 retries'));



import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(3000, () => console.log('Server running on port 3000'));


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // pass control to the next middleware
});


import fs from 'fs/promises';

async function readFileAsync(path) {
    try {
        const data = await fs.readFile(path, 'utf-8');
        console.log(data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}
readFileAsync('./data.txt');



import express from 'express';
import multer from 'multer';
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
    res.send('File uploaded');
});


import express from 'express';
const app = express();

app.use(express.static('public')); // serve files from /public

app.listen(3000);


import fs from 'fs';

const writeStream = fs.createWriteStream('output.txt');

for (let i = 0; i < 10; i++) {
    writeStream.write(`Line ${i}\n`);
}
writeStream.end();


// .env
// PORT=4000

import dotenv from 'dotenv';
dotenv.config();

console.log('Running on port:', process.env.PORT);


import jwt from 'jsonwebtoken';

const user = { id: 1, name: 'Ted' };
const token = jwt.sign(user, 'mysecretkey', { expiresIn: '1h' });

console.log('JWT:', token);



import express from 'express';
const app = express();
const router = express.Router();

router.get('/products', (req, res) => res.json(['item1', 'item2']));
app.use('/api', router);


import cron from 'node-cron';

cron.schedule('*/5 * * * * *', () => {
    console.log('Running every 5 seconds');
});



//  Basic REST API with Express
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
    res.send('API is running');
});

app.post('/api/data', (req, res) => {
    res.json({ received: req.body });
});


//JWT Authentication (Token Generation)
app.listen(3000, () => console.log('Server on port 3000'));


// Reading and Writing Files
const jwt = require('jsonwebtoken');
const user = { id: 1, username: 'admin' };
const token = jwt.sign(user, 'secretKey', { expiresIn: '1h' });
console.log(token);


//EventEmitter Example
const fs = require('fs');
fs.writeFileSync('example.txt', 'Hello Node.js');
const data = fs.readFileSync('example.txt', 'utf-8');
console.log(data);



const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
    console.log(`Hello, ${name}`);
});

emitter.emit('greet', 'Node.js');


// Create a Middleware Function
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

const express = require('express');
const app = express();

app.use(logger);

app.get('/', (req, res) => res.send('Hello'));

app.listen(3000);



//Create a Simple CLI Tool
const args = process.argv.slice(2);
console.log(`Hello, ${args[0] || 'World'}!`);



//MongoDB Connection with Mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



//Promise-based Async File Reading


const fs = require('fs/promises');

async function readFile() {
    try {
        const data = await fs.readFile('example.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

readFile();


//Custom Error Handler in Express

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    throw new Error('Something went wrong!');
});

app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});

app.listen(3000);


// HTTP Request Using Axios


const axios = require('axios');

axios.get('https://api.github.com/users/octocat')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });



const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject('fail');

Promise.all([p1, p2, p3])
    .then(results => console.log(results))
    .catch(err => console.error('Error:', err));


// Memoization Function
function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const slowAdd = (a, b) => a + b;
const fastAdd = memoize(slowAdd);
console.log(fastAdd(2, 3)); // 5



//proxy for dynamic validation 

const user = {
    name: 'Alice',
    age: 25
};

const validator = {
    set(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new Error('Age must be a number');
        }
        target[prop] = value;
        return true;
    }
};

const proxyUser = new Proxy(user, validator);
proxyUser.age = 30;  // OK
// proxyUser.age = 'thirty'; // Error!



//generator for infinite sequence 

function* idGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2


//deboucne implementation 

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

window.addEventListener('resize', debounce(() => {
    console.log('Resized!');
}, 500));


//throttle implementation 

function throttle(fn, limit) {
    let waiting = false;
    return (...args) => {
        if (!waiting) {
            fn(...args);
            waiting = true;
            setTimeout(() => waiting = false, limit);
        }
    };
}

window.addEventListener('scroll', throttle(() => {
    console.log('Scroll event!');
}, 1000));


//custom eventEmitter class

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, fn) {
        (this.events[event] = this.events[event] || []).push(fn);
    }

    emit(event, ...args) {
        (this.events[event] || []).forEach(fn => fn(...args));
    }
}

const emitter = new EventEmitter();
emitter.on('greet', name => console.log(`Hello, ${name}!`));
emitter.emit('greet', 'Ted');


//async/await with timeout fallback

async function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        return response.json();
    } catch (err) {
        console.error('Request timed out or failed', err);
    }
}

//LRU cache implementation 

class LRUCache {
    constructor(limit = 3) {
        this.cache = new Map();
        this.limit = limit;
    }

    get(key) {
        if (!this.cache.has(key)) return null;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    set(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        else if (this.cache.size === this.limit) this.cache.delete(this.cache.keys().next().value);
        this.cache.set(key, value);
    }
}

const lru = new LRUCache();
lru.set('a', 1); lru.set('b', 2); lru.set('c', 3);
lru.get('a');
lru.set('d', 4);
console.log([...lru.cache.keys()]); // [ 'c', 'a', 'd' ]




function deepMerge(target, source) {
    for (const key in source) {
        if (
            source.hasOwnProperty(key) &&
            typeof source[key] === 'object' &&
            source[key] !== null &&
            !Array.isArray(source[key])
        ) {
            if (!target[key] || typeof target[key] !== 'object') {
                target[key] = {};
            }
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

// Example usage:
const obj1 = {
    user: {
        name: 'Ted',
        preferences: { theme: 'dark' }
    }
};

const obj2 = {
    user: {
        preferences: { notifications: true },
        age: 28
    }
};

const merged = deepMerge(obj1, obj2);

console.log(merged);
/*
{
  user: {
    name: 'Ted',
    preferences: { theme: 'dark', notifications: true },
    age: 28
  }
}
*/




async function promisePool(tasks, limit) {
    const results = [];
    const executing = [];

    for (const task of tasks) {
        const p = Promise.resolve().then(() => task());
        results.push(p);

        if (limit <= tasks.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= limit) await Promise.race(executing);
        }
    }

    return Promise.all(results);
}

// Usage
const tasks = Array.from({ length: 10 }, (_, i) =>
    () => new Promise(res => setTimeout(() => res(i), 1000))
);
promisePool(tasks, 3).then(console.log);



(async () => {
    try {
        const module = await import('./feature.js');
        module.run();
    } catch (err) {
        console.log('Module failed, fallback!');
    }
})();


const compose = (...fns) => (val) =>
    fns.reduceRight((acc, fn) => fn(acc), val);

const add2 = (x) => x + 2;
const mul3 = (x) => x * 3;

const composed = compose(mul3, add2);
console.log(composed(4)); // (4 + 2) * 3 = 18



const user = {
    name: 'Ted',
    age: 25
};

const proxy = new Proxy(user, {
    get(target, prop) {
        console.log(`Accessing ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new Error('Age must be a number');
        }
        target[prop] = value;
        return true;
    }
});

proxy.age = 30; // ok
// proxy.age = 'old'; // error



async function retry(fn, retries = 3, delay = 500) {
    try {
        return await fn();
    } catch (err) {
        if (retries === 0) throw err;
        await new Promise((res) => setTimeout(res, delay));
        return retry(fn, retries - 1, delay * 2);
    }
}

// Usage
retry(() => fetch('https://api.example.com')).catch(console.error);


const curry = (fn) =>
    function curried(...args) {
        return args.length >= fn.length
            ? fn.apply(this, args)
            : (...next) => curried.apply(this, args.concat(next));
    };

const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6



class Calculator {
    constructor(value = 0) {
        this.value = value;
    }

    add(n) {
        this.value += n;
        return this;
    }

    multiply(n) {
        this.value *= n;
        return this;
    }

    result() {
        return this.value;
    }
}

const calc = new Calculator();
console.log(calc.add(5).multiply(2).result()); // 10



const countdown = {
    from: 3,
    [Symbol.iterator]() {
        let i = this.from;
        return {
            next() {
                return i >= 0 ? { value: i--, done: false } : { done: true };
            }
        };
    }
};

for (const num of countdown) {
    console.log(num); // 3, 2, 1, 0
}




function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) =>
        `${acc}${str}<b>${values[i] || ''}</b>`, '');
}

const name = 'Ted';
const message = highlight`Hello, ${name}!`;
console.log(message); // Hello, <b>Ted</b>!



function deepFreeze(obj) {
    Object.freeze(obj);
    for (const key of Object.getOwnPropertyNames(obj)) {
        if (typeof obj[key] === 'object' && !Object.isFrozen(obj[key])) {
            deepFreeze(obj[key]);
        }
    }
    return obj;
}

const config = deepFreeze({
    db: { host: 'localhost', port: 3306 },
    app: { name: 'MyApp' }
}); s



function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Usage
window.addEventListener('resize', debounce(() => console.log('Resized!'), 300))


function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Usage
const fib = memoize(n => n <= 1 ? n : fib(n - 1) + fib(n - 2));
console.log(fib(40));


function* infiniteEvenNumbers() {
    let n = 0;
    while (true) {
        yield n;
        n += 2;
    }
}

const gen = infiniteEvenNumbers();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 2


const range = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        let current = this.from;
        return {
            next: () => ({
                done: current > this.to,
                value: current++
            })
        };
    }
};

for (const num of range) {
    console.log(num); // 1 to 5


    async function retry(fn, times = 3, delay = 1000) {
        while (times > 0) {
            try {
                return await fn();
            } catch (err) {
                times--;
                if (times === 0) throw err;
                await new Promise(res => setTimeout(res, delay));
            }
        }
    }


    const user = {
        name: 'Alice',
        age: 25
    };

    const validator = {
        set(obj, prop, value) {
            if (prop === 'age' && typeof value !== 'number') {
                throw new TypeError('Age must be a number');
            }
            obj[prop] = value;
            return true;
        }
    };

    const proxyUser = new Proxy(user, validator);
    proxyUser.age = 30;
    // proxyUser.age = 'old'; // ❌ Throws error

    function curry(fn) {
        return function curried(...args) {
            return args.length >= fn.length
                ? fn.apply(this, args)
                : (...rest) => curried.apply(this, args.concat(rest));
        };
    }

    const multiply = (a, b, c) => a * b * c;
    const curriedMultiply = curry(multiply);
    console.log(curriedMultiply(2)(3)(4)); // 24



    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    window.addEventListener('resize', debounce(() => {
        console.log('Resized!');
    }, 300));


    class EventEmitter {
        constructor() {
            this.events = {};
        }

        on(event, listener) {
            (this.events[event] ||= []).push(listener);
        }

        emit(event, ...args) {
            (this.events[event] || []).forEach(fn => fn(...args));
        }
    }

    const emitter = new EventEmitter();
    emitter.on('log', msg => console.log(msg));
    emitter.emit('log', 'Event emitted!');


    function bold(strings, ...values) {
        return strings.reduce((str, curr, i) => {
            return str + curr + (values[i] ? `<b>${values[i]}</b>` : '');
        }, '');
    }

    const name = 'Ted';
    console.log(bold`Hello, ${name}!`);


    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map(deepClone);
        const cloned = {};
        for (const key in obj) {
            cloned[key] = deepClone(obj[key]);
        }
        return cloned;
    }


    function sum(a) {
        return function (b) {
            return b ? sum(a + b) : a;
        };
    }
    console.log(sum(1)(2)(3)(4)()); // 10



    function throttle(fn, delay) {
        let shouldWait = false;
        return function (...args) {
            if (!shouldWait) {
                fn.apply(this, args);
                shouldWait = true;
                setTimeout(() => shouldWait = false, delay);
            }
        };
    }



    const user = { name: "Ted", age: 30 };

    const proxy = new Proxy(user, {
        get(target, prop) {
            console.log(`Accessing ${prop}`);
            return target[prop];
        }
    });

    console.log(proxy.name); // Logs: Accessing name → Ted



    function* lazyRange(start, end) {
        for (let i = start; i <= end; i++) yield i;
    }

    const range = lazyRange(1, 3);
    console.log([...range]); // [1, 2, 3]


    const pipe = (...fns) => input => fns.reduce((v, f) => f(v), input);
    const add = x => x + 1;
    const double = x => x * 2;

    const result = pipe(add, double)(3); // (3+1)*2 = 8


    class AsyncQueue {
        constructor() {
            this.queue = [];
            this.running = false;
        }

        enqueue(task) {
            this.queue.push(task);
            this.run();
        }

        async run() {
            if (this.running) return;
            this.running = true;
            while (this.queue.length) {
                const task = this.queue.shift();
                await task();
            }
            this.running = false;
        }
    }


    function observe(obj, callback) {
        return new Proxy(obj, {
            set(target, key, value) {
                callback(key, value);
                target[key] = value;
                return true;
            }
        });
    }

    const state = observe({ count: 0 }, (key, value) => {
        console.log(`Changed ${key} to ${value}`);
    });
    state.count = 1; // Logs: Changed count to 1



    function logExecution(fn) {
        return function (...args) {
            console.log(`Calling ${fn.name} with`, args);
            return fn(...args);
        };
    }

    const multiply = logExecution((a, b) => a * b);
    console.log(multiply(2, 3)); // Logs input and result



    (async () => {
        if (Math.random() > 0.5) {
            const { default: _ } = await import('lodash');
            console.log(_.shuffle([1, 2, 3, 4]));
        } else {
            console.log('Skipped lodash');
        }
    })();


    function memoize(fn) {
        const cache = new Map();
        return function (...args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) return cache.get(key);
            const result = fn(...args);
            cache.set(key, result);
            return result;
        };
    }

    const slowAdd = (a, b) => {
        console.log('Calculating...');
        return a + b;
    };

    const fastAdd = memoize(slowAdd);
    console.log(fastAdd(3, 4)); // Calculates
    console.log(fastAdd(3, 4)); // Cached

    function curry(fn) {
        return function curried(...args) {
            if (args.length >= fn.length) {
                return fn.apply(this, args);
            }
            return (...next) => curried(...args, ...next);
        };
    }

    const multiply = (a, b, c) => a * b * c;
    const curriedMultiply = curry(multiply);
    console.log(curriedMultiply(2)(3)(4)); // 2


    class Emitter {
        constructor() {
            this.events = {};
        }
        on(event, cb) {
            (this.events[event] ||= []).push(cb);
        }
        emit(event, data) {
            (this.events[event] || []).forEach(cb => cb(data));
        }
    }

    const emitter = new Emitter();
    emitter.on('log', msg => console.log('Received:', msg));
    emitter.emit('log', 'Hello!');


    function debounce(fn, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    const log = debounce(console.log, 500);
    log('Typing...');
    log('Still typing...');



    const user = {
        name: 'John',
        age: 25
    };

    const validator = {
        set(obj, prop, value) {
            if (prop === 'age' && typeof value !== 'number') {
                throw new Error('Age must be a number');
            }
            obj[prop] = value;
            return true;
        }
    };

    const proxy = new Proxy(user, validator);
    proxy.age = 30; // OK
    // proxy.age = 'old'; // Throws error


    function add(a) {
        const fn = b => add(a + b);
        fn.valueOf = () => a;
        return fn;
    }

    console.log(add(1)(2)(3) == 6); // true

    const countdown = {
        from: 3,
        [Symbol.iterator]() {
            let current = this.from;
            return {
                next() {
                    return current >= 0
                        ? { value: current--, done: false }
                        : { done: true };
                }
            };
        }
    };

    for (const num of countdown) {
        console.log(num);
    }


    async function retry(fn, attempts = 3) {
        while (attempts--) {
            try {
                return await fn();
            } catch (e) {
                if (attempts === 0) throw e;
            }
        }
    }

    retry(() => fetch('/api/data'), 3)
        .then(res => console.log('Success'))
        .catch(err => console.error('Failed after 3 tries'));



    const key = 'dynamic';
    const obj = {
        [key]: 42,
        ['say' + 'Hi']() {
            return 'Hello!';
        }
    };

    console.log(obj.dynamic); // 42
    console.log(obj.sayHi()); // Hello!


    function flatten(arr) {
        return arr.reduce(
            (acc, val) =>
                Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val),
            []
        );
    }

    console.log(flatten([1, [2, [3, 4]], 5])); // [1, 2, 3, 4, 5]



    const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

    const double = x => x * 2;
    const square = x => x ** 2;

    const doubleThenSquare = compose(square, double);
    console.log(doubleThenSquare(3)); // (3 * 2)^2 = 36


    document.getElementById('load').addEventListener('click', async () => {
        const { add } = await import('./math.js');
        console.log(add(2, 3));
    });

    function highlight(strings, ...values) {
        return strings.reduce((result, str, i) =>
            `${result}${str}<strong>${values[i] || ''}</strong>`, '');
    }

    const name = 'Ted';
    console.log(highlight`Hello, ${name}!`);


    // main.js
    const worker = new Worker('worker.js');
    worker.onmessage = e => console.log('Result:', e.data);
    worker.postMessage(1000000);

    // worker.js
    onmessage = function (e) {
        let sum = 0;
        for (let i = 0; i < e.data; i++) sum += i;
        postMessage(sum);
    };


    class Person {
        #ssn;
        constructor(name, ssn) {
            this.name = name;
            this.#ssn = ssn;
        }
        static create(data) {
            return new Person(data.name, data.ssn);
        }
        getSSN() {
            return this.#ssn;
        }
    }

    const p = Person.create({ name: 'John', ssn: '123-45-6789' });
    console.log(p.getSSN());



    const tree = {
        value: 1,
        children: [
            { value: 2, children: [] },
            {
                value: 3,
                children: [{ value: 4, children: [] }]
            }
        ]
    };

    function traverse(node) {
        console.log(node.value);
        node.children.forEach(traverse);
    }

    traverse(tree);


    class LRUCache {
        constructor(limit = 3) {
            this.cache = new Map();
            this.limit = limit;
        }

        get(key) {
            if (!this.cache.has(key)) return -1;
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }

        put(key, value) {
            if (this.cache.has(key)) this.cache.delete(key);
            else if (this.cache.size >= this.limit) this.cache.delete(this.cache.keys().next().value);
            this.cache.set(key, value);
        }
    }

    const lru = new LRUCache();
    lru.put('a', 1);
    lru.put('b', 2);
    lru.put('c', 3);
    lru.put('d', 4); // 'a' evicted
    console.log(lru.get('a')); // -1


    const original = {
        name: 'Ted',
        address: { city: 'Tokyo' }
    };

    const clone = structuredClone(original);
    clone.address.city = 'Osaka';

    console.log(original.address.city); // Tokyo

    const controller = new AbortController();

    fetch('https://jsonplaceholder.typicode.com/posts', {
        signal: controller.signal
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => {
            if (err.name === 'AbortError') console.log('Request aborted');
        });

    setTimeout(() => controller.abort(), 100); // Cancel fetch after 100ms


    function reactive(obj, cb) {
        return new Proxy(obj, {
            set(target, prop, value) {
                target[prop] = value;
                cb(prop, value);
                return true;
            }
        });
    }

    const state = reactive({ count: 0 }, (key, val) =>
        console.log(`Property ${key} changed to ${val}`)
    );

    state.count++; // Logs: Property count changed to 1


    import { useEffect, useRef } from 'react';

    function useClickOutside(callback) {
        const ref = useRef();

        useEffect(() => {
            const handler = e => {
                if (ref.current && !ref.current.contains(e.target)) {
                    callback();
                }
            };
            document.addEventListener('mousedown', handler);
            return () => document.removeEventListener('mousedown', handler);
        }, [callback]);

        return ref;
    }

    // Usage
    function Dropdown() {
        const close = () => console.log('Clicked outside!');
        const ref = useClickOutside(close);

        return <div ref={ref}>Dropdown Content</div>;


        import { createContext, useReducer, useContext } from 'react';

        const CounterContext = createContext();

        function reducer(state, action) {
            switch (action.type) {
                case 'increment': return { count: state.count + 1 };
                default: return state;
            }
        }

        export const CounterProvider = ({ children }) => {
            const [state, dispatch] = useReducer(reducer, { count: 0 });
            return (
                <CounterContext.Provider value={{ state, dispatch }}>
                    {children}
                </CounterContext.Provider>
            );
        };

        export const useCounter = () => useContext(CounterContext);

// Usage
// <CounterProvider><App /></CounterProvider>
// Inside App: const { state, dispatch } = useCounter();