import http from 'node:http'
import fs from 'fs'

// parse code, register variables & functions --- crates event loops
// this keeps on urnning as long as thee are event listeners registered 
const server = http.createServer((req, res) => {
    // console.log(req.url, req.headers, req.method)
    // process.exit() 
    // this quits server if there is no event to loop around
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
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title> My first page</title></head>')
    res.write('/<html>')
    res.end()

})

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