const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            const existingProductIndex = cart.products.findIndex(product => product.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.quantity = updatedProduct + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            }
            else {
                updatedProduct = {
                    id: id,
                    quntity: 1
                }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice   // this is to convert the string 
            // to a nubmer by addting '+' in front ot the variable 
            fs.wrtieFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }


    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return
            }
            const updatedCart = { ...JSON.parse(fileContent) }
            const product = updatedCart.products.findIndex(product => product.id === id)
            if (!product) {
                return
            }
            const productQty = product.quantity
            updatedCart.products = updatedCart.products.filter(product => product.id !== id)
            cart.totalPrice = cart.totalPrice - productPrice * productQty
        })

    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent)
            if (err) {
                cb(null)
            } else {
                cb(cart)
            }
        })
    }
}


/**
 * Dynamic routing 
 * 1. You can pass dynamic path segments by adding a ":" to the Express router path 
 * 2. The name you add after ":" is the name by which you can extract the data on req. params
 * 3. Optional (query) parameters can also be passed (?param=value&b=2) and extracted
 * (req.query.myParam)
 * 
 * More on Models 
 * 1. a cart model was added - it holds static methods only 
 * 2. you can interact between modesl (e.g. delete cart item if a product is deleted)
 * 3. working with fiels for data storage is suboptimal for bigger amounts of data 
 * 
 * 
 * SDQ 
 * 1. data uses schemas 
 * 2. relations 
 * 3. data is distrbitued across multiple tables 
 * 4. horizontal scaling is difficult / impossible; vertical scaling is possible 
 * 5. limitations for lots of read & write queries per second 
 * 
 * NoSQL 
 * 1. schema-less
 * 2. No (or very few) relations 
 * 3. Data is typicall erged / nested in a few collections 
 * 4. Both horizontal and vertical scaling is possible 
 * 5. great performance for mass read & write requests
 * 
 * depdning on the situation for the application, we can utilize both SQL methodologies 
 * for exmaple, if the applciation requries a lot of relational data that has to be 
 * managed with certain logics and requires a certain level of organization, then 
 * it might be recommended to use SQL over NoSQL 
 * 
 * if the data is too much and doens't require certain logics for relations, then NoSQL is
 * recommended over SQL 
 * 
 * 
 */

