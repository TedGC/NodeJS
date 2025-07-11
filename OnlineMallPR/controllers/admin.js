const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(null, title, imageUrl, description, price);
  // product.save()
  //   .then(() => {
  //     res.redirect('/')
  //   })
  //   .catch(err => console.log(err))
  // res.redirect('/');


  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,

  })
    .then(result => {
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then(products => {
      const product = products[0]
      if (!product) {
        res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle
      product.price = updatedPrice
      product.imageUrl = updatedImageUrl
      product.description = updatedDesc
      return product.save()
    })
    .then(result => {
      console.log('did it work?')
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
    })


  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();

};


// this is whawt is connected to redirect the path to /admin/products 
// after registering items and products using 'add products'
exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });

    })
    .catch(err => {
      console.log(err)
      res.redirect('/admin/products')
    })


  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
};

// the reason why 'return' is used in this function is to stop 
// going further below after the purpose of the function is fully 
//delivered. 
// because this fucntion has two promises 'findByPK & .then', it is 
// better to use return to make sure the function is delivered 
// successfully before moving on to the following one 
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId)
    .then(product => {
      return product.destroy()
    })
    .then(result => {
      console.log('product destroyed')
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
      res.redirect('/admin/products')
    })
  // Product.deleteById(prodId);
};
