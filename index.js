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
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
        })
        fs.writeFileSync('message.txt', 'DUMYY')
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()

    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title> My first page</title></head>')
    res.write('/<html>')
    res.end()

})

server.listen(3000)