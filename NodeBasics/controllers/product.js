const getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        // formCSS: true,
        // productCSS, true,
        // activeAppProduct: true
    })
}

const products = []

const postProduct = (req, res, next) => {
    products.push({ title: req.body.title, path: '/admin/add-product' })
    res.redirect('/');
}

const getProduct = (req, res, next) => {
    res.render('product', {
        products,
        pageTitle: 'shop',
        path: '/',
        // hasProducts: products.length > 0,
        // activeShop: true
    })
}


const productController = {
    getAddProduct,
    postProduct,
    getProduct
}

export default productController