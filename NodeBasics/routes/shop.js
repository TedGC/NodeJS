import express from 'express'


export const router = express.Router()


router.get('/shop', (req, res, next) => {
    res.send('<h1>Product page</h1>');
})
