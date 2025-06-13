import epxress from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

export const router = epxress.Router()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get('/404', (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../', 'view', '404.html'))
})

