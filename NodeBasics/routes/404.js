import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'


export const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


router.get('/404', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'view', '404.html'))
})

