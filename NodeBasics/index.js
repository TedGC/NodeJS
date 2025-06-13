import express from 'express';
import bodyParser from 'body-parser';
import adminData from './routes/add-product.js'
import { router as shopRouter } from './routes/product.js'
import { router as errorRouter } from './routes/404.js'
import { fileURLToPath, } from 'url';
import path from 'path'


const app = express();


//app.engine('handlebars', expressHbd())
//app.set('view engine', 'handlebars')
app.set('view engine', 'pug')
app.set('views', 'view')


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.router)
// Homepage
app.use(shopRouter)

app.use(errorRouter)

// app.use('/', (req, res, next) => {
//     res.status(400).send('<h1>page not found </h1>')
// })

// Start server
app.listen(3000);


// parse code, register variables & functions --- crates event loops
// this keeps on urnning as long as thee are event listeners registered 

// console.log(req.url, req.headers, req.method)
// process.exit() 
// this quits server if there is no event to loop around


/**
 * The even loop operation at one queue 
 * 1. timers - execute setTiemOut and setInteval callbacks, functions such as these 
 * very much responstive will get on the working load immediately
 * 2. pending callbacks - executing I/O related (input & output -- disk & network
 * operations (~blocking operations ) ) callbacks that were defered 
 * 3. Poll - retreive new I/O events, execute their callbacks. If these callbacks are 
 * not yet to complete, NodeJs will send them over to the pending callbacks  
 * 4. check = execute setImmediate() callbacks, but after those callbacks mentioned above
 * 5. close callbacks - execute all 'close' event callbacks 
 * 
 */


/**
 * 3rd part ypackages 
 * 1. node projects typically don't just use core moduels and custom code bu also 
 * third-party packages
 * 2. you can differentiate between production dependencies (--save), develiopment 
 * dependencies (--save-dev) and global dependencies (-g)
 * 
 * 
 * ExpressJS is NodeJS framework - a package that adds a bunch of utility functions and tools
 * and a clear set of rules on how the app should be built (middleware)
 * it's highly extensible and other packages can be plugged into it 
 * 
 * Next() and res()
 * ExpressJS relies heavily on middleware functions - you can eaisly add them by 
 * calling use() 
 * Middleware functions handle a request and should call next() to forward the request
 * to the next function in line or send a response 
 * 
 * 
 * Routing
 * you can filter requests by path and method
 * if you filter by method, paths are matched exaclty, othersie, the first segment of a URL
 * is matched
 * you can use the express.Router to split your routes across files elegnatly 
 * 
 * 
 */


