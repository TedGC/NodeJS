import express from 'express'


export const router = express.Router()

// Show product input form
router.get('/add-product', (req, res, next) => {
    res.send(`
    <form action="/add-product" method="POST">
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


