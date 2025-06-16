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
  const prodId = req.params.productId
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
  res.redirect('/cart ')
}


// the reason why we need Product.findById is to find a product that mtached the Id 
// we are looking for and retrieve all the data inclduing the price information
// so that we can delte the informaiton about the price and post it to the backened 
// and update the related data
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
  })
  res.redirect('/cart')
}

// the function below servers a different purpose in that it posts the updated data 
// to the cart, not just delivering the function of deleting the product information 
// that matches the Id we are providing to the funciton 

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
}


exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.product.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty })
        }
      }

    })
  })
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: cartProducts
  })
}
