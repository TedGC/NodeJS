import express from 'express'


const router = express.Router()

// Show product input form
router.use('/add-product', (req, res, next) => {
    res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title" />
      <button type="submit">Add Product</button>
    </form>
  `);
});

// Handle form submission
router.post('/product', (req, res, next) => {
    console.log(req.body); // logs { title: 'whatever user typed' }
    res.redirect('/');
});

export default router
