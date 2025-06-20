const Product = require('../models/product');
const Cart = require('../models/cart');

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/product-list', {
//       prods: products,
//       pageTitle: 'All Products',
//       path: '/products'
//     });
//   });
// };

//this is using sequelize connect sync () and requries built-in functions such
// as findAll, save, and others. 
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Products',
        path: '/products'
      })
    })
    .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id = prodId } })
  //   // although this is to find one record that matches the query specified here
  //   // thi actually returns the array of the entity that matches the specified query

  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     })
  //   })
  Product.findByPk(prodId)
    // in Sequelize [product] is not used, so we can just use 'product' 
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    })
    .catch(err => console.log(err))
};


// exports.getIndex = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/index', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/'
//     });
//   });
// };

//render() is a function to connect to the view (in this case, ejs file)
// path is the actual url that would be exhibited on the searchbar
// when routing this function in the actual website
exports.getIndex = (req, res, next) => {
  Product.findAll()
    //.then([rows, fieldData] => {})
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(err => console.log(err))

  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render('shop/index', {
  //       prods: rows,
  //       pageTitle: 'Shop',
  //       path: '/'
  //     })
  //   })
  //   .catch(err => console.log(err))
}


exports.getCart = (req, res, next) => {
  // Cart.getCart(cart => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()
    })
    .then(products => {

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    })
    .catch(err => console.log(err))


  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      //this is to store cart so thtat it can be used in other instances as well
      fetchedCart = cart
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      let product
      if (products.length > 0) {
        product = products[0]
      }
      let newQuantity = 1
      if (product) {
        //cartItem is a in-between table that needs to be fetched along with
        // the product table 
        const oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1

        //becasue we need to update the cartItem and the column within that table 
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity }
        })
      }
      return Product.findByPk(prodId)
        .then(product => {
          //addProduct comes from the relationships we built in app.js thorugh 
          // .hasMany and .belongsToMany ... etc.
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
          })
        })
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
};

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, product => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect('/cart');
//   });
// };

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      const product = products[0]
      // another built-in function to delete the data within the table for that
      // specific column
      return product.cartItem.destroy()
    })
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
