import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// another version of this 
// const p = path.join(path.dirname(process.mainModule.filename))
// the only thing is that this expression is now obsolete and I have to find an updated
// version of writing this code 

export default class Product {
    constructor(title) {
        this.title = title

    }

    save() {
        // products.push(this)
        const p = path.join(__dirname, '../', 'data', 'products.json')

        fs.readFile(p, (err, fileContent) => {
            let products = []
            if (!err) {
                products = JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {

                console.log(err)
            })
        })
    }

    static fetchAll() {
        return products

    }
}
