import Product from "../models/product.js";


const getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        // formCSS: true,
        // productCSS, true,
        // activeAppProduct: true
    })
}

const postProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/');
}

const getProduct = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('product', {
            products,
            pageTitle: 'shop',
            path: '/',
            // hasProducts: products.length > 0,
            // activeShop: true
        })
    })
}


const productController = {
    getAddProduct,
    postProduct,
    getProduct
}

export default productController