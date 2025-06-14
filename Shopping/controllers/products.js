const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

//think of this as 'props' and 'children' to pass down to '.html' or '.pug' files 
// in the view foelr 

// since fetchAll() function is a static functi
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

// this is to find a product that matches the ID generated from random.math method 
exports.getProduct = (req, res, next) => {
  const prodID = req.params.productId
  Product.findById(prodId, product => {
    res.render('shop/product-detail', { product: product })
  })
  res.redirect('/')
}


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/')
}