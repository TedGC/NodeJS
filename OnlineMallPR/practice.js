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