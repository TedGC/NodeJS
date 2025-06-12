import http from 'node:http'
import requestHandler from '../route.js'

// parse code, register variables & functions --- crates event loops
// this keeps on urnning as long as thee are event listeners registered 
const server = http.createServer(requestHandler)
// console.log(req.url, req.headers, req.method)
// process.exit() 
// this quits server if there is no event to loop around



server.listen(3000)


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
 * 
 * 
 */