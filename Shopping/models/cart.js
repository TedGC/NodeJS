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
}

