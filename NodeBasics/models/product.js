import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const p = path.join(__dirname, '../', 'data', 'products.json')


// creating this fucntion as a helper function to organiza the sturucture of 
// other functions here 
const getProductsFromFile = (cb) => {

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([])
        } else {
            cb(JSON.parse(fileContent))
        }
    })


}
// another version of this 
// const p = path.join(path.dirname(process.mainModule.filename))
// the only thing is that this expression is now obsolete and I have to find an updated
// version of writing this code 

export default class Product {
    constructor(title) {
        this.title = title

    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err)
            })
        })
        // products.push(this)

        // let products = []
        // if (!err) {
        //     products = JSON.parse(fileContent)
        // }
        // products.push(this)
        // fs.writeFile(p, JSON.stringify(products), (err) => {

        //     console.log(err)
        // })

    }

    static fetchAll(cb) {
        getProductsFromFile(cb)

    }
}
