import express from 'express'


const router = express.Router()


router.use('/shop', (req, res, next) => {
    res.send('<h1>Product page</h1>');
})

export default router