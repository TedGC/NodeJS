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
    //wow

    // NodeJS runs non-blocking JS code and uses an event-driven code ('event loop') for running your logic
    // A Node program exits as soon as there is no more work to do 
    // Note: the createServer() event never finishes by default 
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title> My first page</title></head>')
    res.write('/<html>')
    res.end()
}
