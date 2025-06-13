import epxress from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const router = epxress.Router()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

rotuer.get('/404', (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../', 'view', '404.html'))
})

