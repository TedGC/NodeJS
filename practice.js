import http from 'node:http'
import fs from 'fs'


const server = http.createServer((req, res) => {

    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<body> ....')
    }

    if (url === '/message' && method === 'POST') {
        const body = []

        req.on('data', () => {
            const parsedBody = req.
                body.push(parsedBody)
        })

    }
})